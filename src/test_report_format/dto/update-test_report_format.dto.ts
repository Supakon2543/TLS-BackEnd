import { PartialType } from '@nestjs/mapped-types';
import { CreateTestReportFormatDto } from './create-test_report_format.dto';

export class UpdateTestReportFormatDto extends PartialType(CreateTestReportFormatDto) {}
