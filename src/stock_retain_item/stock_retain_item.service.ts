import { Injectable } from '@nestjs/common';
import { CreateStockRetainItemDto } from './dto/create-stock_retain_item.dto';
import { UpdateStockRetainItemDto } from './dto/update-stock_retain_item.dto';

@Injectable()
export class StockRetainItemService {
  create(createStockRetainItemDto: CreateStockRetainItemDto) {
    return 'This action adds a new stockRetainItem';
  }

  findAll() {
    return `This action returns all stockRetainItem`;
  }

  findOne(id: number) {
    return `This action returns a #${id} stockRetainItem`;
  }

  update(id: number, updateStockRetainItemDto: UpdateStockRetainItemDto) {
    return `This action updates a #${id} stockRetainItem`;
  }

  remove(id: number) {
    return `This action removes a #${id} stockRetainItem`;
  }
}
