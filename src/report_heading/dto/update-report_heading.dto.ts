import { PartialType } from '@nestjs/swagger';
import { CreateReportHeadingDto } from './create-report_heading.dto';

export class UpdateReportHeadingDto extends PartialType(CreateReportHeadingDto) {}
