import { PartialType } from '@nestjs/swagger';
import { CreateStockChemicalItemDto } from './create-stock_chemical_item.dto';

export class UpdateStockChemicalItemDto extends PartialType(CreateStockChemicalItemDto) {}
