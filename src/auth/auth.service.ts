import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService {
  constructor(private jwtService: JwtService) {}

  async login(user: any) {
    const payload = { username: user.username, sub: user.id };
    return {
      access_token: this.jwtService.sign(payload),
    };
  }
  // constructor(private readonly prisma: PrismaService,
  //             private readonly usersService: UsersService,
  //             private readonly userRoleService: UserRoleService,
  //             private readonly jwtService: JwtService
  // ) {}

  // async login(user: any/*@Body() user: CreateAuthDto*/)/*: Promise<any>*/ {
  //   const payload = { username: user.username, sub: user.id };
  //   return {
  //     access_token: this.jwtService.sign(payload),
  //   };/*
  //   try {
  //     let response_token: any;
  //     let user_data: any;
  //     if (!user.username || !user.password) {
  //       response_token = await axios.post('https://api-dev.osotspa.com/securitycontrol/api/auth/verify_token', {
  //         accessToken: user.token,
  //       });
  //       user_data = response_token.data;
  //     }
  //     else if (!user.token) {
  //       const response_login = await axios.post('https://api-dev.osotspa.com/securitycontrol/api/auth/signin', {
  //       username: user.username,
  //       password: user.password,
  //       });
  //       response_token = await axios.post('https://api-dev.osotspa.com/securitycontrol/api/auth/verify_token', {
  //         accessToken: response_login.data.accessToken,
  //       });
  //       user_data = response_login.data;
  //     }
  //     else {
  //       throw new UnauthorizedException('Invalid credentials');
  //     }
  //     // Check if the response contains the access token
  //     if (!response_token.data) {
  //       throw new UnauthorizedException('Invalid credentials');
  //     }

  //     // Find Data
  //     if (!user_data.data.employee_id) {
  //       const user_location_data = await this.prisma.user_location.findFirstOrThrow({
  //           where: {
  //             name: user_data.data.location,
  //           },
  //           select: {
  //             id: true,
  //             lab_site_id: true,
  //           }
  //       });
  //       if (!user_location_data.lab_site_id) {
  //         throw new UnauthorizedException('User location does not have a valid lab_site_id');
  //       }
  //       const lab_site_data = await this.prisma.lab_site.findFirstOrThrow({
  //         where: {
  //           id: user_location_data.lab_site_id,
  //         },
  //         select: {
  //           name: true,
  //         }
  //       });
        


  //         const employeeRoleIds = employee_role_info.map(role => role.id);
  //         const existingRoleIds = existingUserRoles.map(ur => ur.role_id);

  //         // Create roles that don't exist
  //         for (const roleId of employeeRoleIds) {
  //           if (!existingRoleIds.includes(roleId)) {
  //             await this.userRoleService.createOrUpdate({
  //               id: 0,
  //               userId: employee_data.id,
  //               role_id: roleId,
  //             });
  //           }
  //         }


  //         // Delete roles that exist but are not in employee_role_info
  //         for (const userRole of existingUserRoles) {
  //           if (!employeeRoleIds.includes(userRole.role_id)) {
  //             await this.prisma.user_role.delete({
  //               where: { user_id: userRole.user_id, role_id: userRole.role_id },
  //             });
  //           }
  //         }
  //       }
  //       const newExistingUserRoles = await this.prisma.user_role.findMany({
  //           where: { user_id: employee_data.id },
  //           select: { role_id: true, user_id: true },
  //       });
  //       return {
  //         accessToken: response_token.data.accessToken,
  //         id: employee_data.id,
  //         employee_id: employee_data.employee_id,
  //         username: employee_data.username,
  //         fullname: employee_data.fullname,
  //         tel: employee_data.tel,
  //         email: employee_data.email,
  //         company: employee_data.company,
  //         dept_code: employee_data.dept_code,
  //         dept_name: employee_data.dept_name,
  //         user_location_id: employee_data.user_location_id,
  //         user_location_name: user_data.data.location,
  //         lab_site_id: user_location_data.lab_site_id,
  //         lab_site_name: lab_site_data.name,
  //         supervisor_id: employee_data.supervisor_id,
  //         position_name: employee_data.position_name,
  //         is_req: newExistingUserRoles.some((role: any) => role.role_id === "REQ"), // Assuming "REQ" is the role_id for 'req' role
  //         is_req_head: newExistingUserRoles.some((role: any) => role.role_id === "REQ_HEAD"), // Assuming "REQ_HEAD" is the role_id for 'req_head' role
  //         is_lab_off: newExistingUserRoles.some((role: any) => role.role_id === "LAB_OFF"), // Assuming "LAB_OFF" is the role_id for 'lab_off' role
  //         is_lab_lead: newExistingUserRoles.some((role: any) => role.role_id === "LAB_LEAD"), // Assuming "LAB_LEAD" is the role_id for 'lab_lead' role
  //         is_lab_head: newExistingUserRoles.some((role: any) => role.role_id === "LAB_HEAD"), // Assuming "LAB_HEAD" is the role_id for 'lab_head' role
  //         is_lab_admin: newExistingUserRoles.some((role: any) => role.role_id === "LAB_ADMIN"), // Assuming "LAB_ADMIN" is the role_id for 'lab_admin' role
  //         is_qc: newExistingUserRoles.some((role: any) => role.role_id === "QC"), // Assuming "QC" is the role_id for 'qc' role
  //         is_it: newExistingUserRoles.some((role: any) => role.role_id === "IT"), // Assuming "IT" is the role_id for 'it' role
  //       };
  //       // {
  //       //   employee_id: user_data.data.supervisor_code,
  //       //   username: user_data.data.username,
  //       //   fullname: user_data.data.fullname,
  //       //   tel: user_data.data.telephone,
  //       //   email: user_data.data.email,
  //       //   company: response_supervisor.data.CompanyCode,
  //       //   dept_code: response_supervisor.data.DepartmentCode,
  //       //   dept_name: response_supervisor.data.DepartmentNameEN,
  //       //   user_location_id: supervisor_location_data[0].id,
  //       //   position_name: response_supervisor.data.PositionNameEN,
  //       // }
  //     }
  //     else {
  //       const response_employee = await axios.get(`https://api.osotspa.com/workday/api/workday/employee_info?employee_id=${user_data.data.employee_id}`);
  //       const response_supervisor = await axios.get(`https://api.osotspa.com/workday/api/workday/employee_info?employee_id=${response_employee.data.supervisor_code}`);
  //       const user_location_data = await this.prisma.user_location.findFirstOrThrow({
  //         where: {
  //           name: user_data.data.location,
  //         },
  //         select: {
  //           id: true,
  //           lab_site_id: true,
  //         }
  //       });
  //       if (!user_location_data.lab_site_id) {
  //         throw new UnauthorizedException('User location does not have a valid lab_site_id');
  //       }
  //       const lab_site_data = await this.prisma.lab_site.findFirstOrThrow({
  //         where: {
  //           id: user_location_data.lab_site_id,
  //         },
  //         select: {
  //           name: true,
  //         }
  //       });
  //       let supervisor_info = await this.prisma.user.findFirst({
  //         where: {
  //           username: user_data.data.supervisor_username,
  //         },
  //         select: {
  //           id: true,
  //           employee_id: true,
  //           username: true,
  //           fullname: true,
  //           tel: true,
  //           email: true,
  //           company: true,
  //           dept_code: true,
  //           dept_name: true,
  //           user_location_id: true,
  //           supervisor_id: true,
  //           position_name: true,
  //         }
  //       });
  //       const supervisor_data = await this.usersService.createOrUpdate({
  //         employee_id: response_supervisor.data.employee_id,
  //         username: user_data.data.supervisor_username,
  //         fullname: user_data.data.supervisor_name,
  //         tel: supervisor_info?.tel ?? "",
  //         email: user_data.data.supervisor_mail,
  //         company: response_supervisor.data.CompanyNameEN ?? "",
  //         dept_code: response_supervisor.data.DepartmentCode ?? "",
  //         dept_name: response_supervisor.data.DepartmentNameEN ?? "",
  //         user_location_id: supervisor_info?.user_location_id ?? "",
  //         supervisor_id: supervisor_info?.id ?? 0,
  //         position_name: supervisor_info?.position_name ?? "",
  //         id: supervisor_info?.id ?? 0
  //       });
  //       const employee_info = await this.prisma.user.findFirst({
  //         where: {
  //           username: user_data.data.username,
  //         },
  //         select: {
  //           id: true,
  //           employee_id: true,
  //           username: true,
  //           fullname: true,
  //           tel: true,
  //           email: true,
  //           company: true,
  //           dept_code: true,
  //           dept_name: true,
  //           user_location_id: true,
  //           supervisor_id: true,
  //           position_name: true,
  //         }
  //       });
  //       const employee_data = await this.usersService.createOrUpdate({
  //         employee_id: user_data.data.employee_id,
  //         username: user_data.data.username,
  //         fullname: user_data.data.fullname,
  //         tel: user_data.data.telephone,
  //         email: user_data.data.email,
  //         company: response_employee.data.CompanyNameEN ?? "",
  //         dept_code: response_employee.data.DepartmentCode ?? "",
  //         dept_name: response_employee.data.DepartmentNameEN,
  //         user_location_id: user_location_data.id,
  //         supervisor_id: supervisor_data.id,
  //         position_name: response_employee.data.PositionNameEN,
  //         id: employee_info?.id ?? 0
  //       });
  //       let employee_role = await axios.post('https://api-dev.osotspa.com/securitycontrol/api/dataaccessbyuserid', {
  //         user_id: user_data.data.id,
  //       });
  //       const filtered_roles = employee_role.data.filter((role: any) => role.name == 'TLSRole');
  //       const employee_role_info = await this.prisma.role.findMany({
  //         where: {
  //           name: {
  //             in: filtered_roles.data.map((role: any) => role.data_value),
  //           },
  //         },
  //         select: {
  //           id: true,
  //           name: true,
  //         },
  //       });
  //       if (employee_role_info.length > 0) {
  //         // Get all current roles for the user
  //         const existingUserRoles = await this.prisma.user_role.findMany({
  //           where: { user_id: employee_data.id },
  //           select: { role_id: true, user_id: true },
  //         });

  //         const employeeRoleIds = employee_role_info.map(role => role.id);
  //         const existingRoleIds = existingUserRoles.map(ur => ur.role_id);

  //         // Create roles that don't exist
  //         for (const roleId of employeeRoleIds) {
  //           if (!existingRoleIds.includes(roleId)) {
  //             await this.userRoleService.createOrUpdate({
  //               id: 0,
  //               userId: employee_data.id,
  //               role_id: roleId,
  //             });
  //           }
  //         }

  //         // Delete roles that exist but are not in employee_role_info
  //         for (const userRole of existingUserRoles) {
  //           if (!employeeRoleIds.includes(userRole.role_id)) {
  //             await this.prisma.user_role.delete({
  //               where: { user_id: userRole.user_id, role_id: userRole.role_id },
  //             });
  //           }
  //         }
  //       }
  //       const newExistingUserRoles = await this.prisma.user_role.findMany({
  //         where: { user_id: employee_data.id },
  //         select: { role_id: true, user_id: true },
  //       });
  //       return {
  //         accessToken: response_token.data.accessToken,
  //         id: employee_data.id,
  //         employee_id: employee_data.employee_id,
  //         username: employee_data.username,
  //         fullname: employee_data.fullname,
  //         tel: employee_data.tel,
  //         email: employee_data.email,
  //         company: employee_data.company,
  //         dept_code: employee_data.dept_code,
  //         dept_name: employee_data.dept_name,
  //         user_location_id: employee_data.user_location_id,
  //         user_location_name: user_data.data.location,
  //         lab_site_id: user_location_data.lab_site_id,
  //         lab_site_name: lab_site_data.name,
  //         supervisor_id: employee_data.supervisor_id,
  //         position_name: employee_data.position_name,
  //         is_req: newExistingUserRoles.some((role: any) => role.role_id === "REQ"), // Assuming "REQ" is the role_id for 'req' role
  //         is_req_head: newExistingUserRoles.some((role: any) => role.role_id === "REQ_HEAD"), // Assuming "REQ_HEAD" is the role_id for 'req_head' role
  //         is_lab_off: newExistingUserRoles.some((role: any) => role.role_id === "LAB_OFF"), // Assuming "LAB_OFF" is the role_id for 'lab_off' role
  //         is_lab_lead: newExistingUserRoles.some((role: any) => role.role_id === "LAB_LEAD"), // Assuming "LAB_LEAD" is the role_id for 'lab_lead' role
  //         is_lab_head: newExistingUserRoles.some((role: any) => role.role_id === "LAB_HEAD"), // Assuming "LAB_HEAD" is the role_id for 'lab_head' role
  //         is_lab_admin: newExistingUserRoles.some((role: any) => role.role_id === "LAB_ADMIN"), // Assuming "LAB_ADMIN" is the role_id for 'lab_admin' role
  //         is_qc: newExistingUserRoles.some((role: any) => role.role_id === "QC"), // Assuming "QC" is the role_id for 'qc' role
  //         is_it: newExistingUserRoles.some((role: any) => role.role_id === "IT"), // Assuming "IT" is the role_id for 'it' role
  //       };
  //     }

  //     // You can extract and transform data here as needed
  //     // return {
  //     //   accessToken: response_login.data.accessToken,
  //     //   user: response_login.data.user,
  //     // };
  //   } catch (error) {
  //     console.error('External authentication failed:', error.message);
  //     throw new UnauthorizedException('Invalid credentials or external auth failed');
  //   }*/
  // }
}
