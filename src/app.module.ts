import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UsersModule } from './users/users.module';
import { ChemicalModule } from './chemical/chemical.module';
import { UserRoleModule } from './user_role/user_role.module';
import { LocationEmailModule } from './location_email/location_email.module';
import { EquipmentTypeModule } from './equipment_type/equipment_type.module';
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

@Module({
  imports: [UsersModule, ChemicalModule, UserRoleModule, LocationEmailModule, EquipmentTypeModule, ManufacturerModule, SectionModule, LocationModule, CategoryEditModule, UnitModule, LineModule, MaterialMicrobiologyModule, MaterialChemicalModule, MicrobiologyParameterModule, ChemicalParameterModule, MaterialModule, SampleRetainingModule, LabProcessModule, SampleStageModule, ObjectiveModule, BoxModule, AuthModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
