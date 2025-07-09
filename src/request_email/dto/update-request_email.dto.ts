import { PartialType } from '@nestjs/swagger';
import { CreateRequestEmailDto } from './create-request_email.dto';

export class UpdateRequestEmailDto extends PartialType(CreateRequestEmailDto) {}
