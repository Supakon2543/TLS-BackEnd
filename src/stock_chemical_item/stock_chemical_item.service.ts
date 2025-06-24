import { Injectable } from '@nestjs/common';
import { CreateStockChemicalItemDto } from './dto/create-stock_chemical_item.dto';
import { UpdateStockChemicalItemDto } from './dto/update-stock_chemical_item.dto';

@Injectable()
export class StockChemicalItemService {
  create(createStockChemicalItemDto: CreateStockChemicalItemDto) {
    return 'This action adds a new stockChemicalItem';
  }

  findAll() {
    return `This action returns all stockChemicalItem`;
  }

  findOne(id: number) {
    return `This action returns a #${id} stockChemicalItem`;
  }

  update(id: number, updateStockChemicalItemDto: UpdateStockChemicalItemDto) {
    return `This action updates a #${id} stockChemicalItem`;
  }

  remove(id: number) {
    return `This action removes a #${id} stockChemicalItem`;
  }
}
