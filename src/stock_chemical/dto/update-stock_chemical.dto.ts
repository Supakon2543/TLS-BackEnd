import { PartialType } from '@nestjs/swagger';
import { CreateStockChemicalDto } from './create-stock_chemical.dto';

export class UpdateStockChemicalDto extends PartialType(CreateStockChemicalDto) {}
