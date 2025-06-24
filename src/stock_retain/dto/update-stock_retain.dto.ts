import { PartialType } from '@nestjs/swagger';
import { CreateStockRetainDto } from './create-stock_retain.dto';

export class UpdateStockRetainDto extends PartialType(CreateStockRetainDto) {}
