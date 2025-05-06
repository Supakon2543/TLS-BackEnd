import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UsersModule } from './users/users.module';
import { ChemicalModule } from './chemical/chemical.module';
import { UserRoleModule } from './user_role/user_role.module';
import { LocationEmailModule } from './location_email/location_email.module';
import { IsUniqueConstraint } from './is-unique.validator';
import { EquipmentTypeModule } from './equipment_type/equipment_type.module';

@Module({
  imports: [UsersModule, ChemicalModule, UserRoleModule, LocationEmailModule, EquipmentTypeModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
