import { Body, Injectable, UnauthorizedException } from '@nestjs/common';
import axios from 'axios';
import { PrismaService } from 'src/prisma/prisma.service';
import { UserRoleService } from 'src/user_role/user_role.service';
import { UsersService } from 'src/users/users.service';
import { CreateAuthApiDto } from './dto/create_auth_api.dto';
import e, { response } from 'express';
import { generate } from 'rxjs';
import { UserData } from 'src/user_data/user_data.service';

@Injectable()
export class AuthApiService {
  constructor(private readonly prisma: PrismaService,
              private readonly usersService: UsersService,
              private readonly userRoleService: UserRoleService,
              private readonly userData: UserData
  ) {}
  async login(@Body() user: CreateAuthApiDto): Promise<any> {
    const prisma = this.prisma;
    try {
      const header_token = await axios.post('https://api-dev.osotspa.com/securitycontrol/oauth2/token', {
        client_id: process.env.OAUTH2_CLIENT_ID ?? "2ATwV3iAbpmdkzuazH4XPZaffMsQc94H",
        client_secret: process.env.OAUTH2_CLIENT_SECRET ?? "f8D1UqM9OGVcziQ1SfIoz6UTXL5qaDtp",
        grant_type: process.env.OAUTH2_GRANT_TYPE ?? "client_credentials"
      });
      console.log('Header Token:', header_token.data.access_token);
      const header_token_workday = await axios.post('https://api.osotspa.com/workday/oauth2/token', {
        client_id: process.env.OAUTH2_CLIENT_ID_WORKDAY ?? "hvvsgnpPyZFOcyMdcsBlMbzPsEqQkIPg",
        client_secret: process.env.OAUTH2_CLIENT_SECRET_WORKDAY ?? "1iz9yRFqK4DB7SCmjX1oDbfS1NHNMZac",
        grant_type: process.env.OAUTH2_GRANT_TYPE_WORKDAY ?? "client_credentials"
      });
      console.log('Header Token Workday:', header_token_workday.data.access_token);
      // await prisma.$transaction(async (tx) => {
        // Replace all `this.prisma` with `tx` inside this block
        // Example:
        // const user_location_data = await tx.user_location.findFirstOrThrow({ ... });
        // const employee_info = await tx.user.findFirst({ ... });
        // await tx.user_role.delete({ ... });
        // ...all other DB operations...

        // The rest of your login logic goes here, using `tx` for all Prisma calls
        
        let response_token: any;
        let user_data: any;
        let check_role: any;
        if (!user.password) {
          const response_login = await axios.post('https://api-dev.osotspa.com/securitycontrol/api/auth/signin_az', {
            username: user.username,
          }, {
            headers: {
              Authorization: `Bearer ${header_token.data.access_token}`,
            },
          });
          response_token = await axios.post('https://api-dev.osotspa.com/securitycontrol/api/auth/verify_token', {
            accessToken: response_login.data.accessToken,
          }, {
            headers: {
              Authorization: `Bearer ${header_token.data.access_token}`,
            },
          });
          response_token.data.accessToken = response_login.data.accessToken;
          user_data = response_token.data;
          console.log('User Data:', user_data);
          if (user_data) {
            let moduleId = process.env.MODULE_ID_BOF ?? 108; // Default to BOF module ID
            if (user.module === 'bof') {
              moduleId = process.env.MODULE_ID_BOF ?? 108;
            }
            else if (user.module === 'web') {
              moduleId = process.env.MODULE_ID_WEB ?? 107;
            }
            try {
              console.log('Module ID:', moduleId);
              console.log('User ID:', user_data.id);
              check_role = await axios.post('https://api-dev.osotspa.com/securitycontrol/api/roles_modulesearch', {
                userid: user_data.id,
                module_id: moduleId,
              }, {
                headers: {
                  Authorization: `Bearer ${header_token.data.access_token}`,
                },
              });
              console.log('Check Role:', check_role.data);
            }
            catch (error) {
              console.error('Error checking role:', error.message);
              throw new UnauthorizedException('Invalid credentials or module not found');
            }
          }
          else {
            throw new UnauthorizedException('Invalid credentials');
          }
        }
        else if (!user.token) {
          console.log('username:', user.username);
          console.log('password:', user.password);
          const response_login = await axios.post('https://api-dev.osotspa.com/securitycontrol/api/auth/signin', {
            username: user.username,
            password: user.password,
          }, {
            headers: {
              Authorization: `Bearer ${header_token.data.access_token}`,
            },
          });
          console.log('Response Login:', response_login.data);
          response_token = await axios.post('https://api-dev.osotspa.com/securitycontrol/api/auth/verify_token', {
            accessToken: response_login.data.accessToken,
          }, {
            headers: {
              Authorization: `Bearer ${header_token.data.access_token}`,
            },
          });
          console.log('Response Token:', response_token.data);
          user_data = response_login.data;
          console.log('User Data:', user_data);
          if (user_data) {
            let moduleId = process.env.MODULE_ID_BOF ?? 108; // Default to BOF module ID
            if (user.module === 'bof') {
              moduleId = process.env.MODULE_ID_BOF ?? 108;
            }
            else if (user.module === 'web') {
              moduleId = process.env.MODULE_ID_WEB ?? 107;
            }
            try {
              console.log('Module ID:', moduleId);
              console.log('User ID:', user_data.id);
              check_role = await axios.post('https://api-dev.osotspa.com/securitycontrol/api/roles_modulesearch', {
                userid: user_data.id,
                module_id: moduleId,
              }, {
                headers: {
                  Authorization: `Bearer ${header_token.data.access_token}`,
                },
              });
              console.log('Check Role:', check_role.data);
            }
            catch (error) {
              console.error('Error checking role:', error.message);
              throw new UnauthorizedException('Invalid credentials or module not found');
            }
          }
          else {
            throw new UnauthorizedException('Invalid credentials');
          }
        }
        else {
          throw new UnauthorizedException('Invalid credentials');
        }
        // });

        // Find Data
        return await this.userData.generateUserData(user_data, header_token, header_token_workday);

        // if (!user_data.employee_id) {
        //   let plant_location: any;
        //   let filtered_plant: any;
        //   let filtered_location: any;
        //   if (!user_data.location) {
        //     plant_location = await axios.post('https://api-dev.osotspa.com/securitycontrol/api/dataaccessbyuserid', {
        //       user_id: user_data.id,
        //     }, {
        //       headers: {
        //         Authorization: `Bearer ${header_token.data.access_token}`,
        //       },
        //     });
        //     console.log('Plant Location:', plant_location.data.data);
        //     if (Array.isArray(plant_location.data.data)) {
        //       filtered_plant = plant_location.data.data.filter((role: any) => role.name == 'plant');
        //       filtered_location = plant_location.data.data.filter((role: any) => role.name == 'Location');
        //     } else {
        //       console.warn('plant_location.data is not an array:', plant_location.data.data);
        //     }
        //     console.log('Filtered Plant:', filtered_plant[0].data_value);
        //     console.log('Filtered Location:', filtered_location[0].data_value);
        //   }
        //   console.log('Filtered Location Length:', filtered_location.length);
        //   const user_location_data = await tx.user_location.findFirstOrThrow({
        //       where: {
        //         name: filtered_location[0].data_value //user_data.location,
        //       },
        //       select: {
        //         id: true,
        //         name: true,
        //         lab_site_id: true,
        //       }
        //   });
        //   console.log('User Location Data:', user_location_data.id);
        //   if (!user_location_data.lab_site_id) {
        //     throw new UnauthorizedException('User location does not have a valid lab_site_id');
        //   }
        //   const lab_site_data = await tx.lab_site.findFirstOrThrow({
        //     where: {
        //       id: user_location_data.lab_site_id,
        //     },
        //     select: {
        //       name: true,
        //     }
        //   });
        //   let user_location_data_id = user_location_data.id;
        //   let user_location_data_name = user_location_data.name;
        //   let user_location_data_lab_site_id = user_location_data.lab_site_id;
        //   if (filtered_location.length !== 1) {
        //     user_location_data_id = ""
        //     user_location_data_name = "";
        //     user_location_data_lab_site_id = "";
        //   }
        //   let lab_site_data_name = lab_site_data.name;
        //   if (filtered_location.length !== 1) {
        //     lab_site_data_name = "";
        //   }
        //   console.log('Changed User Location Data:', user_location_data);
        //   console.log('Lab Site Data:', lab_site_data);
        //   let supervisor_info: any
        //   let supervisor_data: any;
        //   if (user_data.supervisor_username && user_data.supervisor_name && user_data.supervisor_mail) {
        //     supervisor_info = await tx.user.findFirst({
        //       where: {
        //         username: user_data.supervisor_username,
        //       },
        //       select: {
        //         id: true,
        //         employee_id: true,
        //         username: true,
        //         fullname: true,
        //         tel: true,
        //         email: true,
        //         company: true,
        //         dept_code: true,
        //         dept_name: true,
        //         user_location_id: true,
        //         supervisor_id: true,
        //         position_name: true,
        //       }
        //     });
        //     supervisor_data = await this.usersService.createOrUpdate({
        //       employee_id: user_data.supervisor_code ?? "",
        //       username: user_data.supervisor_username,
        //       fullname: user_data.supervisor_name,
        //       tel: supervisor_info?.tel ?? "",
        //       email: user_data.supervisor_mail,
        //       company: supervisor_info?.company ?? "",
        //       dept_code: supervisor_info?.dept_code ?? "",
        //       dept_name: supervisor_info?.dept_name ?? "",
        //       user_location_id: supervisor_info?.user_location_id ?? "",
        //       supervisor_id: supervisor_info?.supervisor_id ?? 0,
        //       position_name: supervisor_info?.position_name ?? "",
        //       id: supervisor_info?.id ?? 0
        //     });
        // }
        //   const employee_info: any = await tx.user.findFirst({
        //     where: {
        //       username: user_data.username,
        //     },
        //     select: {
        //       id: true,
        //       employee_id: true,
        //       username: true,
        //       fullname: true,
        //       tel: true,
        //       email: true,
        //       company: true,
        //       dept_code: true,
        //       dept_name: true,
        //       user_location_id: true,
        //       supervisor_id: true,
        //       position_name: true,
        //     }
        //   });
        //   let employeeID: any = 0;
        //   let supervisorID: any = 0;
        //   if (supervisor_data) {
        //     supervisorID = supervisor_data.id;
        //   }
        //   console.log('Supervisor Data:', supervisor_data);
        //   if (employee_info) {
        //     employeeID = employee_info.id;
        //   }
        //   console.log('Employee Info:', employee_info);
        //   console.log('Employee ID:', employeeID);
        //   const employee_data = await this.usersService.createOrUpdate({
        //     employee_id: user_data.employee_id,
        //     username: user_data.username,
        //     fullname: user_data.fullname,
        //     tel: user_data.telephone,
        //     email: user_data.email,
        //     company: user_data.company ?? "",
        //     dept_code: user_data.dept_code ?? "",
        //     dept_name: user_data.department,
        //     user_location_id: user_location_data_id, //user_location_data.id,
        //     supervisor_id: supervisorID ?? 0, //supervisor_data.id ?? 0,
        //     position_name: user_data.position_name,
        //     id: employeeID ?? 0 //employee_info?.id ?? 0
        //   });
        //   console.log('Employee Data:', employee_data);
        //   let employee_role = await axios.post('https://api-dev.osotspa.com/securitycontrol/api/dataaccessbyuserid', {
        //     user_id: user_data.id,
        //   }, {
        //     headers: {
        //       Authorization: `Bearer ${header_token.data.access_token}`,
        //     },
        //   });
        //   const filtered_roles = employee_role.data.data.filter((role: any) => role.name == 'TLSRole');
        //   const employee_role_info = await tx.role.findMany({
        //     where: {
        //       id: {
        //         in: filtered_roles.map((role: any) => role.data_value),
        //       },
        //     },
        //     select: {
        //       id: true,
        //       name: true,
        //     },
        //   });
        //   if (employee_role_info.length > 0) {
        //     // Get all current roles for the user
        //     const existingUserRoles = await tx.user_role.findMany({
        //       where: { user_id: employee_data.id },
        //       select: { role_id: true, user_id: true },
        //     });

        //     const employeeRoleIds = employee_role_info.map(role => role.id);
        //     const existingRoleIds = existingUserRoles.map(ur => ur.role_id);

        //     // Create roles that don't exist
        //     for (const roleId of employeeRoleIds) {
        //       if (!existingRoleIds.includes(roleId)) {
        //         await this.userRoleService.createOrUpdate({
        //           id: 0,
        //           user_id: employee_data.id,
        //           role_id: roleId,
        //         });
        //       }
        //     }
        //     // Delete roles that exist but are not in employee_role_info
        //     for (const userRole of existingUserRoles) {
        //       if (!employeeRoleIds.includes(userRole.role_id)) {
        //         // Find the unique user_role record to get its id
        //         const userRoleRecord = await tx.user_role.findFirst({
        //           where: { user_id: userRole.user_id, role_id: userRole.role_id },
        //           select: { id: true },
        //         });
        //         if (userRoleRecord) {
        //           await tx.user_role.delete({
        //             where: { id: userRoleRecord.id },
        //           });
        //         }
        //       }
        //     }
        //   }
        //   const newExistingUserRoles = await tx.user_role.findMany({
        //       where: { user_id: employee_data.id },
        //       select: { role_id: true, user_id: true },
        //   });
        //   return {
        //     accessToken: user_data.accessToken,
        //     id: employee_data.id,
        //     employee_id: employee_data.employee_id,
        //     username: employee_data.username,
        //     fullname: employee_data.fullname,
        //     tel: employee_data.tel,
        //     email: employee_data.email,
        //     company: employee_data.company,
        //     dept_code: employee_data.dept_code,
        //     dept_name: employee_data.dept_name,
        //     user_location_id: employee_data.user_location_id,
        //     user_location_name: user_location_data_name, //user_location_data.name, //user_data.location,
        //     lab_site_id: user_location_data_lab_site_id, //user_location_data.lab_site_id,
        //     lab_site_name: lab_site_data_name, //lab_site_data.name,
        //     supervisor_id: employee_data.supervisor_id,
        //     position_name: employee_data.position_name,
        //     is_req: newExistingUserRoles.some((role: any) => role.role_id === "REQ"), // Assuming "REQ" is the role_id for 'req' role
        //     is_req_head: newExistingUserRoles.some((role: any) => role.role_id === "REQ_HEAD"), // Assuming "REQ_HEAD" is the role_id for 'req_head' role
        //     is_lab_off: newExistingUserRoles.some((role: any) => role.role_id === "LAB_OFF"), // Assuming "LAB_OFF" is the role_id for 'lab_off' role
        //     is_lab_lead: newExistingUserRoles.some((role: any) => role.role_id === "LAB_LEAD"), // Assuming "LAB_LEAD" is the role_id for 'lab_lead' role
        //     is_lab_head: newExistingUserRoles.some((role: any) => role.role_id === "LAB_HEAD"), // Assuming "LAB_HEAD" is the role_id for 'lab_head' role
        //     is_lab_admin: newExistingUserRoles.some((role: any) => role.role_id === "LAB_ADMIN"), // Assuming "LAB_ADMIN" is the role_id for 'lab_admin' role
        //     is_qc: newExistingUserRoles.some((role: any) => role.role_id === "QC"), // Assuming "QC" is the role_id for 'qc' role
        //     is_it: newExistingUserRoles.some((role: any) => role.role_id === "IT"), // Assuming "IT" is the role_id for 'it' role
        //   };
        //   // {
        //   //   employee_id: user_data.supervisor_code,
        //   //   username: user_data.username,
        //   //   fullname: user_data.fullname,
        //   //   tel: user_data.telephone,
        //   //   email: user_data.email,
        //   //   company: response_supervisor.data.CompanyCode,
        //   //   dept_code: response_supervisor.data.DepartmentCode,
        //   //   dept_name: response_supervisor.data.DepartmentNameEN,
        //   //   user_location_id: supervisor_location_data[0].id,
        //   //   position_name: response_supervisor.data.PositionNameEN,
        //   // }
        // }
        // else {
        //   const response_employee = await axios.get(`https://api.osotspa.com/workday/api/workday/employee_info?employee_id=${user_data.employee_id}`, {
        //     headers: {
        //       Authorization: `Bearer ${header_token_workday.data.access_token}`,
        //     },
        //   });
        //   console.log('Response Employee:', response_employee.data.data);
        //   const response_supervisor = await axios.get(`https://api.osotspa.com/workday/api/workday/employee_info?employee_id=${user_data.supervisor_id}`, {
        //     headers: {
        //       Authorization: `Bearer ${header_token_workday.data.access_token}`,
        //     },
        //   });
        //   console.log('Response Supervisor:', response_supervisor.data.data);
        //   let plant_location: any;
        //   let filtered_plant: any;
        //   let filtered_location: any;
        //   if (!user_data.location) {
        //     plant_location = await axios.post('https://api-dev.osotspa.com/securitycontrol/api/dataaccessbyuserid', {
        //       user_id: user_data.id,
        //     }, {
        //       headers: {
        //         Authorization: `Bearer ${header_token.data.access_token}`,
        //       },
        //     });
        //     console.log('Plant Location:', plant_location.data.data);
        //     if (Array.isArray(plant_location.data.data)) {
        //       filtered_plant = plant_location.data.data.filter((role: any) => role.name == 'plant');
        //       filtered_location = plant_location.data.data.filter((role: any) => role.name == 'Location');
        //     } else {
        //       console.warn('plant_location.data is not an array:', plant_location.data.data);
        //     }
        //     console.log('Filtered Plant:', filtered_plant[0].data_value);
        //     console.log('Filtered Location:', filtered_location[0].data_value);
        //   }
        //   console.log('Filtered Location Length:', filtered_location.length);
        //   const user_location_data = await tx.user_location.findFirstOrThrow({
        //     where: {
        //       name: filtered_location[0].data_value //user_data.location,
        //     },
        //     select: {
        //       id: true,
        //       name: true,
        //       lab_site_id: true,
        //     }
        //   });
        //   if (!user_location_data.lab_site_id) {
        //     throw new UnauthorizedException('User location does not have a valid lab_site_id');
        //   }
        //   const lab_site_data = await tx.lab_site.findFirstOrThrow({
        //     where: {
        //       id: user_location_data.lab_site_id,
        //     },
        //     select: {
        //       name: true,
        //     }
        //   });
        //   let user_location_data_id = user_location_data.id;
        //   let user_location_data_name = user_location_data.name;
        //   let user_location_data_lab_site_id = user_location_data.lab_site_id;
        //   if (filtered_location.length !== 1) {
        //     user_location_data_id = ""
        //     user_location_data_name = "";
        //     user_location_data_lab_site_id = "";
        //   }
        //   let lab_site_data_name = lab_site_data.name;
        //   if (filtered_location.length !== 1) {
        //     lab_site_data_name = "";
        //   }
        //   console.log('Changed User Location Data:', user_location_data);
        //   console.log('Lab Site Data:', lab_site_data);
        //   let supervisor_info: any;
        //   let supervisor_data: any;
        //   if (user_data.supervisor_id) {
        //     supervisor_info = await tx.user.findFirst({
        //       where: {
        //         employee_id: user_data.supervisor_id,
        //       },
        //       select: {
        //         id: true,
        //         employee_id: true,
        //         username: true,
        //         fullname: true,
        //         tel: true,
        //         email: true,
        //         company: true,
        //         dept_code: true,
        //         dept_name: true,
        //         user_location_id: true,
        //         supervisor_id: true,
        //         position_name: true,
        //       }
        //     });
        //     if (!supervisor_info) {
        //       supervisor_info = { id: 0, employee_id: "", username: "", fullname: "", tel: "", email: "", company: "", dept_code: "", dept_name: "", user_location_id: "", supervisor_id: 0, position_name: "" };
        //     }
        //     console.log('Supervisor Info:', supervisor_info);
        //     console.log('Supervisor Name:', response_supervisor.data.data[0].FirstNameEN)
        //     let supervisor_fullname = response_supervisor.data.data[0].FirstNameEN + ' ' + response_supervisor.data.data[0].LastNameEN;
        //     supervisor_data = await this.usersService.createOrUpdate({
        //       employee_id: response_supervisor.data.data[0].EmployeeID ?? user_data.supervisor_id ?? "",
        //       username: user_data.supervisor_username ?? response_supervisor.data.data[0].Email ?? "",
        //       fullname: user_data.supervisor_name ?? supervisor_fullname ?? "",
        //       tel: response_supervisor.data.data[0].MobileNo ?? supervisor_info?.tel ?? "",
        //       email: user_data.supervisor_mail ?? response_supervisor.data.data[0].Email ?? "",
        //       company: response_supervisor.data.data[0].CompanyNameEN ?? "",
        //       dept_code: response_supervisor.data.data[0].DepartmentCode ?? "",
        //       dept_name: response_supervisor.data.data[0].DepartmentNameEN ?? "",
        //       user_location_id: supervisor_info?.user_location_id ?? "",
        //       supervisor_id: supervisor_info?.supervisor_id ?? 0,
        //       position_name: response_supervisor.data.data[0].PositionNameEN ?? supervisor_info?.position_name ?? "",
        //       id: supervisor_info?.id ?? 0
        //     });
        //     console.log('Supervisor Data:', supervisor_data);
        //   }
          
        //   const employee_info = await tx.user.findFirst({
        //     where: {
        //       username: user_data.username,
        //     },
        //     select: {
        //       id: true,
        //       employee_id: true,
        //       username: true,
        //       fullname: true,
        //       tel: true,
        //       email: true,
        //       company: true,
        //       dept_code: true,
        //       dept_name: true,
        //       user_location_id: true,
        //       supervisor_id: true,
        //       position_name: true,
        //     }
        //   });
        //   let employeeID: any = 0;
        //   let supervisorID: any = 0;
        //   if (supervisor_data) {
        //     supervisorID = supervisor_data.id;
        //   }
        //   console.log('Supervisor Data:', supervisor_data);
        //   if (employee_info) {
        //     employeeID = employee_info.id;
        //   }
        //   console.log('Employee Info:', employee_info);
        //   console.log('Employee ID:', employeeID);
        //   const employee_data = await this.usersService.createOrUpdate({
        //     employee_id: user_data.employee_id,
        //     username: user_data.username,
        //     fullname: user_data.fullname,
        //     tel: user_data.telephone,
        //     email: user_data.email,
        //     company: response_employee.data.data[0].CompanyNameEN ?? "",
        //     dept_code: response_employee.data.data[0].DepartmentCode ?? "",
        //     dept_name: response_employee.data.data[0].DepartmentNameEN ?? "",
        //     user_location_id: user_location_data.id,
        //     supervisor_id: supervisorID ?? 0, //supervisor_data.id ?? 0,
        //     position_name: response_employee.data.data[0].PositionNameEN ?? "",
        //     id: employeeID ?? 0 //employee_info?.id ?? 0
        //   });
        //   let employee_role = await axios.post('https://api-dev.osotspa.com/securitycontrol/api/dataaccessbyuserid', {
        //     user_id: user_data.id,
        //   }, {
        //     headers: {
        //       Authorization: `Bearer ${header_token.data.access_token}`,
        //     },
        //   });
        //   const filtered_roles = employee_role.data.data.filter((role: any) => role.name == 'TLSRole');
        //   const employee_role_info = await tx.role.findMany({
        //     where: {
        //       id: {
        //         in: filtered_roles.map((role: any) => role.data_value),
        //       },
        //     },
        //     select: {
        //       id: true,
        //       name: true,
        //     },
        //   });
        //   if (employee_role_info.length > 0) {
        //     // Get all current roles for the user
        //     const existingUserRoles = await tx.user_role.findMany({
        //       where: { user_id: employee_data.id },
        //       select: { role_id: true, user_id: true },
        //     });

        //     const employeeRoleIds = employee_role_info.map(role => role.id);
        //     const existingRoleIds = existingUserRoles.map(ur => ur.role_id);

        //     // Create roles that don't exist
        //     for (const roleId of employeeRoleIds) {
        //       if (!existingRoleIds.includes(roleId)) {
        //         await this.userRoleService.createOrUpdate({
        //           id: 0,
        //           user_id: employee_data.id,
        //           role_id: roleId,
        //         });
        //       }
        //     }

        //     // Delete roles that exist but are not in employee_role_info
        //     for (const userRole of existingUserRoles) {
        //       if (!employeeRoleIds.includes(userRole.role_id)) {
        //         // Find the unique user_role record to get its id
        //         const userRoleRecord = await tx.user_role.findFirst({
        //           where: { user_id: userRole.user_id, role_id: userRole.role_id },
        //           select: { id: true },
        //         });
        //         if (userRoleRecord) {
        //           await tx.user_role.delete({
        //             where: { id: userRoleRecord.id },
        //           });
        //         }
        //       }
        //     }
        //   }
        //   const newExistingUserRoles = await tx.user_role.findMany({
        //     where: { user_id: employee_data.id },
        //     select: { role_id: true, user_id: true },
        //   });
        //   return {
        //     accessToken: user_data.accessToken,
        //     id: employee_data.id,
        //     employee_id: employee_data.employee_id,
        //     username: employee_data.username,
        //     fullname: employee_data.fullname,
        //     tel: employee_data.tel,
        //     email: employee_data.email,
        //     company: employee_data.company,
        //     dept_code: employee_data.dept_code,
        //     dept_name: employee_data.dept_name,
        //     user_location_id: employee_data.user_location_id,
        //     user_location_name: user_location_data_name,
        //     lab_site_id: user_location_data_lab_site_id,
        //     lab_site_name: lab_site_data_name,
        //     supervisor_id: employee_data.supervisor_id,
        //     position_name: employee_data.position_name,
        //     is_req: newExistingUserRoles.some((role: any) => role.role_id === "REQ"), // Assuming "REQ" is the role_id for 'req' role
        //     is_req_head: newExistingUserRoles.some((role: any) => role.role_id === "REQ_HEAD"), // Assuming "REQ_HEAD" is the role_id for 'req_head' role
        //     is_lab_off: newExistingUserRoles.some((role: any) => role.role_id === "LAB_OFF"), // Assuming "LAB_OFF" is the role_id for 'lab_off' role
        //     is_lab_lead: newExistingUserRoles.some((role: any) => role.role_id === "LAB_LEAD"), // Assuming "LAB_LEAD" is the role_id for 'lab_lead' role
        //     is_lab_head: newExistingUserRoles.some((role: any) => role.role_id === "LAB_HEAD"), // Assuming "LAB_HEAD" is the role_id for 'lab_head' role
        //     is_lab_admin: newExistingUserRoles.some((role: any) => role.role_id === "LAB_ADMIN"), // Assuming "LAB_ADMIN" is the role_id for 'lab_admin' role
        //     is_qc: newExistingUserRoles.some((role: any) => role.role_id === "QC"), // Assuming "QC" is the role_id for 'qc' role
        //     is_it: newExistingUserRoles.some((role: any) => role.role_id === "IT"), // Assuming "IT" is the role_id for 'it' role
        //   };
        // }
        // You can extract and transform data here as needed
        // return {
        //   accessToken: response_login.data.accessToken,
        //   user: response_login.data.user,
        // };
      
    } catch (error) {
      console.error('External authentication failed:', error.message);
      throw new UnauthorizedException(error.message /*'Invalid credentials or external auth failed'*/);
    }
  }
}