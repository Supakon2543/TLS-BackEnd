import { Body, Injectable, UnauthorizedException } from '@nestjs/common';
import axios from 'axios';
import { PrismaService } from 'src/prisma/prisma.service';
import { UserRoleService } from 'src/user_role/user_role.service';
import { UsersService } from 'src/users/users.service';
import { CreateAuthApiDto } from './dto/create_auth_api.dto';
import { UserData } from 'src/user_data/user_data.service';

@Injectable()
export class AuthApiService {
  constructor(private readonly prisma: PrismaService,
              private readonly usersService: UsersService,
              private readonly userRoleService: UserRoleService,
              private readonly userData: UserData
  ) {}
  async login(@Body() user: CreateAuthApiDto): Promise<any> {
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
      
    } catch (error) {
      console.error('External authentication failed:', error.message);
      throw new UnauthorizedException(error.message /*'Invalid credentials or external auth failed'*/);
    }
  }
}