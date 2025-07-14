import { Injectable, UnauthorizedException } from "@nestjs/common";
import axios from "axios";
import { PrismaService } from "../prisma/prisma.service";
import { UserRoleService } from "../user_role/user_role.service";
import { UsersService } from "../users/users.service";

@Injectable()
export class UserData {
    constructor(
        private readonly prisma: PrismaService,
        private readonly usersService: UsersService,
        private readonly userRoleService: UserRoleService
    ) {}

    async generateUserData(user_data: any, header_token: any, header_token_workday: any) {
        const prisma = this.prisma;
        console.log("generateUserData called with user_data:", user_data);
        try {
            return await prisma.$transaction(async (tx) => {
                // Helper: fetch location and lab site info
                const getLocationAndLabSite = async (user_id: string, locationName?: string) => {
                    console.log("getLocationAndLabSite called with user_id:", user_id, "locationName:", locationName);
                    let plant_location, filtered_plant, filtered_location;
                    // if (!locationName
                        plant_location = await axios.post(
                            `${process.env.SECURITYCONTROLBASEURL}/api/dataaccessbyuserid`,
                            { user_id },
                            { headers: { Authorization: `Bearer ${header_token.data.access_token}` } }
                        );
                        if (Array.isArray(plant_location.data.data)) {
                            filtered_plant = plant_location.data.data.filter((role: any) => role.name == 'plant');
                            filtered_location = plant_location.data.data.filter((role: any) => role.name == 'Location');
                        } else {
                            filtered_plant = [];
                            filtered_location = [];
                        }
                    // } 
                    // else {
                    //     filtered_location = [{ data_value: locationName }];
                    // }
                    const user_location_data = await tx.user_location.findFirstOrThrow({
                        where: { name: filtered_location[0]?.data_value },
                        select: { id: true, name: true, lab_site_id: true }
                    });
                    if (!user_location_data.lab_site_id) {
                        throw new UnauthorizedException('User location does not have a valid lab_site_id');
                    }
                    const lab_site_data = await tx.lab_site.findFirstOrThrow({
                        where: { id: user_location_data.lab_site_id },
                        select: { name: true }
                    });
                    let user_location_data_id = user_location_data.id;
                    let user_location_data_name = user_location_data.name;
                    let user_location_data_lab_site_id = user_location_data.lab_site_id;
                    let lab_site_data_name = lab_site_data.name;
                    if (filtered_location.length !== 1) {
                        user_location_data_id = "";
                        user_location_data_name = "";
                        user_location_data_lab_site_id = "";
                        lab_site_data_name = "";
                    }
                    return {
                        user_location_data,
                        user_location_data_id,
                        user_location_data_name,
                        user_location_data_lab_site_id,
                        lab_site_data_name
                    };
                };

                // Helper: create or update supervisor
                const upsertSupervisor = async (supervisorPayload: any): Promise<any> => {
                    if (!supervisorPayload) return null;
                    return await this.usersService.createOrUpdate(supervisorPayload);
                };

                // Helper: create or update employee
                const upsertEmployee = async (employeePayload: any) => {
                    return await this.usersService.createOrUpdate(employeePayload);
                };

                // Helper: sync user roles
                const syncUserRoles = async (user_id: any, role_ids: any[]) => {
                    const existingUserRoles = await tx.user_role.findMany({
                        where: { user_id },
                        select: { role_id: true, user_id: true }
                    });
                    const existingRoleIds = existingUserRoles.map(ur => ur.role_id);
                    // Add missing roles
                    for (const roleId of role_ids) {
                        if (!existingRoleIds.includes(roleId)) {
                            await this.userRoleService.createOrUpdate({
                                id: 0,
                                user_id,
                                role_id: roleId
                            });
                        }
                    }
                    // Remove extra roles
                    for (const userRole of existingUserRoles) {
                        if (!role_ids.includes(userRole.role_id)) {
                            const userRoleRecord = await tx.user_role.findFirst({
                                where: { user_id: userRole.user_id, role_id: userRole.role_id },
                                select: { id: true }
                            });
                            if (userRoleRecord) {
                                await tx.user_role.delete({ where: { id: userRoleRecord.id } });
                            }
                        }
                    }
                    return await tx.user_role.findMany({
                        where: { user_id },
                        select: { role_id: true, user_id: true }
                    });
                };

                // Helper: fetch roles from API and DB
                
                const getEmployeeRoles = async (user_id: string) => {
                    const employee_role = await axios.post( //
                        `${process.env.SECURITYCONTROLBASEURL}/api/dataaccessbyuserid`,
                        { user_id },
                        { headers: { Authorization: `Bearer ${header_token.data.access_token}` } }
                    );
                    const filtered_roles = employee_role.data.data.filter((role: any) => role.name == 'TLSRole');
                    const employee_role_info = await tx.role.findMany({
                        where: { id: { in: filtered_roles.map((role: any) => role.data_value) } },
                        select: { id: true, name: true }
                    });
                    return employee_role_info.map(role => role.id);
                };

                // Helper: build user payload for upsert
                const buildUserPayload = (
                    type: 'employee' | 'supervisor',
                    user_data: any,
                    api_response: any,
                    fallback_info: any,
                    extra: any = {}
                ) => {
                    if (type === 'supervisor') {
                        return {
                            employee_id: api_response?.EmployeeID ?? user_data.supervisor_id ?? "",
                            username: user_data.supervisor_username ?? api_response?.Email ?? "",
                            fullname: user_data.supervisor_name ?? (api_response?.FirstNameEN && api_response?.LastNameEN ? api_response.FirstNameEN + ' ' + api_response.LastNameEN : "") ?? "",
                            tel: api_response?.MobileNo ?? fallback_info?.tel ?? "",
                            email: user_data.supervisor_mail ?? api_response?.Email ?? "",
                            company: api_response?.CompanyNameEN ?? fallback_info?.company ?? "",
                            dept_code: api_response?.DepartmentCode ?? fallback_info?.dept_code ?? "",
                            dept_name: api_response?.DepartmentNameEN ?? fallback_info?.dept_name ?? "",
                            user_location_id: fallback_info?.user_location_id ?? "",
                            supervisor_id: fallback_info?.supervisor_id ?? 0,
                            position_name: api_response?.PositionNameEN ?? fallback_info?.position_name ?? "",
                            id: fallback_info?.id ?? 0,
                            ...extra
                        };
                    } else {
                        return {
                            employee_id: user_data.employee_id,
                            username: user_data.username,
                            fullname: user_data.fullname,
                            tel: user_data.telephone,
                            email: user_data.email,
                            company: api_response?.CompanyNameEN ?? user_data.company ?? "",
                            dept_code: api_response?.DepartmentCode ?? user_data.dept_code ?? "",
                            dept_name: api_response?.DepartmentNameEN ?? user_data.department,
                            user_location_id: extra.user_location_id,
                            supervisor_id: extra.supervisor_id,
                            position_name: api_response?.PositionNameEN ?? user_data.position_name,
                            id: extra.employeeID
                        };
                    }
                };
                
                // --- Branch 1: No employee_id ---
                if (!user_data.employee_id) {
                    
                    // Location & lab site
                    const {
                        user_location_data,
                        user_location_data_id,
                        user_location_data_name,
                        user_location_data_lab_site_id,
                        lab_site_data_name
                    } = await getLocationAndLabSite(user_data.id, user_data.location);

                    // Supervisor
                    let supervisor_data: any = null;
                    let supervisor_info: {
                        id: number;
                        employee_id: string | null;
                        username: string;
                        fullname: string;
                        tel: string | null;
                        email: string;
                        company: string | null;
                        dept_code: string | null;
                        dept_name: string | null;
                        user_location_id: string | null;
                        supervisor_id: number | null;
                        position_name: string | null;
                    } | null = null;
                    
                    if (user_data.supervisor_username && user_data.supervisor_name && user_data.supervisor_mail) {
                        supervisor_info = await tx.user.findFirst({
                            where: { username: user_data.supervisor_username },
                            select: { id: true, employee_id: true, username: true, fullname: true, tel: true, email: true,
                                company: true, dept_code: true, dept_name: true, user_location_id: true,
                                supervisor_id: true, position_name: true }
                        });
                        supervisor_data = await upsertSupervisor(
                            buildUserPayload('supervisor', user_data, null, supervisor_info)
                        );
                    }
                    
                    const employee_info = await tx.user.findFirst({
                        where: { username: user_data.username },
                        select: { id: true, employee_id: true, username: true, fullname: true, tel: true, email: true,
                            company: true, dept_code: true, dept_name: true, user_location_id: true,
                            supervisor_id: true, position_name: true }
                    });
                    
                    const employeeID = employee_info?.id ?? 0;
                    const supervisorID = supervisor_data?.id ?? 0;
                    const employee_data = await upsertEmployee(
                        buildUserPayload('employee', user_data, null, employee_info, {
                            user_location_id: user_location_data_id,
                            supervisor_id: supervisorID,
                            employeeID
                        })
                    );

                    // Roles
                    const employeeRoleIds = await getEmployeeRoles(user_data.id);
                    const newExistingUserRoles = await syncUserRoles(employee_data.id, employeeRoleIds);

                    // Return
                    return this.buildUserReturn(user_data, employee_data, user_location_data_name, user_location_data_lab_site_id, lab_site_data_name, newExistingUserRoles);
                }
                // --- Branch 2: With employee_id ---
                else {
                    
                    // Fetch employee & supervisor info from external API
                    const response_employee = await axios.get(
                        `https://api.osotspa.com/workday/api/workday/employee_info?employee_id=${user_data.employee_id}`,
                        { headers: { Authorization: `Bearer ${header_token_workday.data.access_token}` } }
                    );
                    const response_supervisor = await axios.get(
                        `https://api.osotspa.com/workday/api/workday/employee_info?employee_id=${user_data.supervisor_id}`,
                        { headers: { Authorization: `Bearer ${header_token_workday.data.access_token}` } }
                    );

                    // Location & lab site
                    const {
                        user_location_data,
                        user_location_data_id,
                        user_location_data_name,
                        user_location_data_lab_site_id,
                        lab_site_data_name
                    } = await getLocationAndLabSite(user_data.id, user_data.location);

                    // Supervisor
                    let supervisor_data: any = null;
                    let supervisor_info: any = { id: 0, employee_id: "", username: "", fullname: "", tel: "", email: "", company: "", dept_code: "", dept_name: "", user_location_id: "", supervisor_id: 0, position_name: "" };
                    if (user_data.supervisor_id) {
                        const foundSupervisor = await tx.user.findFirst({
                            where: { employee_id: user_data.supervisor_id },
                            select: {
                                id: true, employee_id: true, username: true, fullname: true, tel: true, email: true,
                                company: true, dept_code: true, dept_name: true, user_location_id: true,
                                supervisor_id: true, position_name: true
                            }
                        });
                        if (foundSupervisor) {
                            supervisor_info = foundSupervisor;
                        }
                        supervisor_data = await upsertSupervisor(
                            buildUserPayload('supervisor', user_data, response_supervisor.data.data[0], supervisor_info)
                        );
                    }
                    const employee_info = await tx.user.findFirst({
                        where: { username: user_data.username },
                        select: {
                            id: true, employee_id: true, username: true, fullname: true, tel: true, email: true,
                            company: true, dept_code: true, dept_name: true, user_location_id: true,
                            supervisor_id: true, position_name: true
                        }
                    });
                    const employeeID = employee_info?.id ?? 0;
                    const supervisorID = supervisor_data?.id ?? 0;
                    const employee_data = await upsertEmployee(
                        buildUserPayload('employee', user_data, response_employee.data.data[0], employee_info, {
                            user_location_id: user_location_data.id,
                            supervisor_id: supervisorID,
                            employeeID
                        })
                    );

                    // Roles
                    const employeeRoleIds = await getEmployeeRoles(user_data.id);
                    const newExistingUserRoles = await syncUserRoles(employee_data.id, employeeRoleIds);

                    // Return
                    return this.buildUserReturn(user_data, employee_data, user_location_data_name, user_location_data_lab_site_id, lab_site_data_name, newExistingUserRoles);
                }
            });
        } catch (error) {
            console.error('External authentication failed:', error.message);
            throw new UnauthorizedException(error.message);
        }
    }

    // Helper: build return object
    private buildUserReturn(user_data: any, employee_data: any, user_location_data_name: string, user_location_data_lab_site_id: string, lab_site_data_name: string, userRoles: any[]) {
        return {
            accessToken: user_data.accessToken,
            id: employee_data.id,
            employee_id: employee_data.employee_id,
            username: employee_data.username,
            fullname: employee_data.fullname,
            tel: employee_data.tel,
            email: employee_data.email,
            company: employee_data.company,
            dept_code: employee_data.dept_code,
            dept_name: employee_data.dept_name,
            user_location_id: employee_data.user_location_id,
            user_location_name: user_location_data_name,
            lab_site_id: user_location_data_lab_site_id,
            lab_site_name: lab_site_data_name,
            supervisor_id: employee_data.supervisor_id,
            position_name: employee_data.position_name,
            is_req: userRoles.some((role: any) => role.role_id === "REQ"),
            is_req_head: userRoles.some((role: any) => role.role_id === "REQ_HEAD"),
            is_lab_off: userRoles.some((role: any) => role.role_id === "LAB_OFF"),
            is_lab_lead: userRoles.some((role: any) => role.role_id === "LAB_LEAD"),
            is_lab_head: userRoles.some((role: any) => role.role_id === "LAB_HEAD"),
            is_lab_admin: userRoles.some((role: any) => role.role_id === "LAB_ADMIN"),
            is_qc: userRoles.some((role: any) => role.role_id === "QC"),
            is_it: userRoles.some((role: any) => role.role_id === "IT"),
        };
    }
}