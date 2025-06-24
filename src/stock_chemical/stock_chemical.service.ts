import { Injectable } from '@nestjs/common';
import { CreateStockChemicalDto } from './dto/create-stock_chemical.dto';
import { UpdateStockChemicalDto } from './dto/update-stock_chemical.dto';

@Injectable()
export class StockChemicalService {
  create(createStockChemicalDto: CreateStockChemicalDto) {
    return 'This action adds a new stockChemical';
  }

  findAll() {
    return `This action returns all stockChemical`;
  }

  findOne(id: number) {
    return `This action returns a #${id} stockChemical`;
  }

  update(id: number, updateStockChemicalDto: UpdateStockChemicalDto) {
    return `This action updates a #${id} stockChemical`;
  }

  remove(id: number) {
    return `This action removes a #${id} stockChemical`;
  }
}
