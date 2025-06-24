import { PartialType } from '@nestjs/swagger';
import { CreateStockRetainItemLogDto } from './create-stock_retain_item_log.dto';

export class UpdateStockRetainItemLogDto extends PartialType(CreateStockRetainItemLogDto) {}
