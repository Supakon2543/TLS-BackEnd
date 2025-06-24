import { PartialType } from '@nestjs/swagger';
import { CreateStockRetainItemDto } from './create-stock_retain_item.dto';

export class UpdateStockRetainItemDto extends PartialType(CreateStockRetainItemDto) {}
