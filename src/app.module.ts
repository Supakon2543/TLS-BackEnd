import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UsersModule } from './users/users.module';
import { ChemicalModule } from './chemical/chemical.module';
import { UserRoleModule } from './user_role/user_role.module';
import { LocationEmailModule } from './location_email/location_email.module';
import { EquipmentTypeModule } from './equipment_type/equipment_type.module';
import { LabSiteModule } from './lab_site/lab_site.module';
import { RequestTypeModule } from './request_type/request_type.module';
import { StateModule } from './state/state.module';
import { StatusRequestModule } from './status_request/status_request.module';
import { StatusSampleModule } from './status_sample/status_sample.module';
import { StatusRetainModule } from './status_retain/status_retain.module';
import { StatusEquipmentModule } from './status_equipment/status_equipment.module';
import { SampleTypeModule } from './sample_type/sample_type.module';
import { LabTestModule } from './lab_test/lab_test.module';
import { CategoryChemicalModule } from './category_chemical/category_chemical.module';
import { SampleConditionModule } from './sample_condition/sample_condition.module';
import { TestReportFormatModule } from './test_report_format/test_report_format.module';
import { AccreditedModule } from './accredited/accredited.module';
import { SpecTypeModule } from './spec_type/spec_type.module';
import { ActivityRequestModule } from './activity_request/activity_request.module';
import { ActivityEquipmentModule } from './activity_equipment/activity_equipment.module';
import { RoleModule } from './role/role.module';
import { UserLocationModule } from './user_location/user_location.module';
import { MaterialModule } from './material/material.module';
import { MaterialChemicalModule } from './material_chemical/material_chemical.module';
import { MaterialMicrobiologyModule } from './material_microbiology/material_microbiology.module';

@Module({
  imports: [UsersModule, ChemicalModule, UserRoleModule, LocationEmailModule, EquipmentTypeModule, LabSiteModule, RequestTypeModule, StateModule, StatusRequestModule, StatusSampleModule, StatusRetainModule, StatusEquipmentModule, SampleTypeModule, LabTestModule, CategoryChemicalModule, SampleConditionModule, TestReportFormatModule, AccreditedModule, SpecTypeModule, ActivityRequestModule, ActivityEquipmentModule, RoleModule, UserLocationModule, MaterialModule, MaterialChemicalModule, MaterialMicrobiologyModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
