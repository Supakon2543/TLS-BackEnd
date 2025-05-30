import { Body, Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { CreateAuthDto } from './dto/create_auth.dto';
import axios from 'axios';
import { PrismaService } from 'src/prisma/prisma.service';
import { CreateUserDto } from 'src/users/dto/create-user.dto';

@Injectable()
export class AuthService {
  constructor(private readonly prisma: PrismaService) {}

  async login(@Body() user: CreateAuthDto): Promise<{ accessToken: string, user: any }> {
    try {
      let response_token: any;
      let user_data: any;
      if (!user.username || !user.password) {
        response_token = await axios.post('https://api-dev.osotspa.com/securitycontrol/api/auth/verify_token', {
          accessToken: user.token,
        });
        user_data = response_token.data;
      }
      else if (!user.token) {
        const response_login = await axios.post('https://api-dev.osotspa.com/securitycontrol/api/auth/signin', {
        username: user.username,
        password: user.password,
        });
        response_token = await axios.post('https://api-dev.osotspa.com/securitycontrol/api/auth/verify_token', {
          accessToken: response_login.data.accessToken,
        });
        user_data = response_login.data;
      }
      else {
        throw new UnauthorizedException('Invalid credentials');
      }
      // Check if the response contains the access token
      if (!response_token.data) {
        throw new UnauthorizedException('Invalid credentials');
      }

      // Find Data
      if (!user_data.data.employee_id) {
        const response_employee = await axios.post(`https://api-dev.osotspa.com/securitycontrol/api/userdetail_by_email`, {
          email: user_data.email,
        });
        const response_supervisor = await axios.get(`https://api-dev.osotspa.com/workday/api/workday/employee_info?employee_id=${user_data.data.supervisor_code}`);
        const user_location_data = await this.prisma.user_location.findMany({
            where: {
              name: user_data.data.location,
            },
            select: {
              id: true,
            }
          })
        const supervisor_location_data = await this.prisma.user_location.findMany({
            where: {
              name: response_supervisor.data.LocationCode,
            },
            select: {
              id: true,
            }
          })
        
        let user_info = await this.prisma.user.findMany({
          where: {
            username: user_data.data.supervisor_username,
          },
          select: {
            id: true,
            employee_id: true,
            username: true,
            fullname: true,
            tel: true,
            email: true,
            company: true,
            dept_code: true,
            dept_name: true,
            user_location_id: true,
            position_name: true,
          }
        });
        // {
        //   employee_id: user_data.data.supervisor_code,
        //   username: user_data.data.username,
        //   fullname: user_data.data.fullname,
        //   tel: user_data.data.telephone,
        //   email: user_data.data.email,
        //   company: response_supervisor.data.CompanyCode,
        //   dept_code: response_supervisor.data.DepartmentCode,
        //   dept_name: response_supervisor.data.DepartmentNameEN,
        //   user_location_id: supervisor_location_data[0].id,
        //   position_name: response_supervisor.data.PositionNameEN,
        // }
      }
      else {
        const response_employee = await axios.get(`https://api.osotspa.com/workday/api/workday/employee_info?employee_id=${user_data.data.employee_id}`);
        const response_supervisor = await axios.get(`https://api.osotspa.com/workday/api/workday/employee_info?employee_id=${response_employee.data.supervisor_code}`);
        
      }
      return {
        accessToken: response_token.data.accessToken,
        user: user_data.data,
      };

      // You can extract and transform data here as needed
      // return {
      //   accessToken: response_login.data.accessToken,
      //   user: response_login.data.user,
      // };
    } catch (error) {
      console.error('External authentication failed:', error.message);
      throw new UnauthorizedException('Invalid credentials or external auth failed');
    }
  }
}