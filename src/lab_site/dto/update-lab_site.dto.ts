import { PartialType } from '@nestjs/mapped-types';
import { CreateLabSiteDto } from './create-lab_site.dto';

export class UpdateLabSiteDto extends PartialType(CreateLabSiteDto) {}
