import { PartialType } from '@nestjs/swagger';
import { CreateDowloadS3Dto } from './create-dowload_s3.dto';

export class UpdateDowloadS3Dto extends PartialType(CreateDowloadS3Dto) {}
