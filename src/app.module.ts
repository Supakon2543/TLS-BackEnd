import { MiddlewareConsumer, Module, NestModule } from '@nestjs/common';
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
import { ManufacturerModule } from './manufacturer/manufacturer.module';
import { SectionModule } from './section/section.module';
import { LocationModule } from './location/location.module';
import { CategoryEditModule } from './category_edit/category_edit.module';
import { UnitModule } from './unit/unit.module';
import { LineModule } from './line/line.module';
import { MaterialMicrobiologyModule } from './material_microbiology/material_microbiology.module';
import { MaterialChemicalModule } from './material_chemical/material_chemical.module';
import { MicrobiologyParameterModule } from './microbiology_parameter/microbiology_parameter.module';
import { ChemicalParameterModule } from './chemical_parameter/chemical_parameter.module';
import { MaterialModule } from './material/material.module';
import { SampleRetainingModule } from './sample_retaining/sample_retaining.module';
import { LabProcessModule } from './lab_process/lab_process.module';
import { SampleStageModule } from './sample_stage/sample_stage.module';
import { ObjectiveModule } from './objective/objective.module';
import { BoxModule } from './box/box.module';
import { AuthModule } from './auth/auth.module';
import { AuthMiddleware } from './middleware/auth.middleware';
import { SampleDescriptionModule } from './sample_description/sample_description.module';
import { ReportHeadingModule } from './report_heading/report_heading.module';
import { RequestModule } from './request/request.module';
import { ChemicalSampleDescriptionModule } from './chemical_sample_description/chemical_sample_description.module';
import { MicrobiologySampleDescriptionModule } from './microbiology_sample_description/microbiology_sample_description.module';
import { CustomerContactInfoModule } from './customer_contact_info/customer_contact_info.module';
import { SignatureModule } from './signature/signature.module';

@Module({
  imports: [
    UsersModule,
    ChemicalModule,
    UserRoleModule,
    LocationEmailModule,
    EquipmentTypeModule,
    LabSiteModule,
    RequestTypeModule,
    StateModule,
    StatusRequestModule,
    StatusSampleModule,
    StatusRetainModule,
    StatusEquipmentModule,
    SampleTypeModule,
    LabTestModule,
    CategoryChemicalModule,
    SampleConditionModule,
    TestReportFormatModule,
    AccreditedModule,
    SpecTypeModule,
    ActivityRequestModule,
    ActivityEquipmentModule,
    RoleModule,
    UserLocationModule,
    ManufacturerModule,
    SectionModule,
    LocationModule,
    CategoryEditModule,
    UnitModule,
    LineModule,
    MaterialMicrobiologyModule,
    MaterialChemicalModule,
    MicrobiologyParameterModule,
    ChemicalParameterModule,
    MaterialModule,
    SampleRetainingModule,
    LabProcessModule,
    SampleStageModule,
    ObjectiveModule,
    BoxModule,
    AuthModule,
    SampleDescriptionModule,
    ReportHeadingModule,
    RequestModule,
    ChemicalSampleDescriptionModule,
    MicrobiologySampleDescriptionModule,
    CustomerContactInfoModule,
    SignatureModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule /*implements NestModule*/{
  // configure(consumer: MiddlewareConsumer) {
  //   consumer
  //     .apply(AuthMiddleware)
  //     .forRoutes(); // Or { path: '/api/some', method: RequestMethod.GET }
  // }
}
