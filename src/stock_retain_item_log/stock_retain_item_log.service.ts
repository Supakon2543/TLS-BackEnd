import { Injectable } from '@nestjs/common';
import { CreateStockRetainItemLogDto } from './dto/create-stock_retain_item_log.dto';
import { UpdateStockRetainItemLogDto } from './dto/update-stock_retain_item_log.dto';

@Injectable()
export class StockRetainItemLogService {
  create(createStockRetainItemLogDto: CreateStockRetainItemLogDto) {
    return 'This action adds a new stockRetainItemLog';
  }

  findAll() {
    return `This action returns all stockRetainItemLog`;
  }

  findOne(id: number) {
    return `This action returns a #${id} stockRetainItemLog`;
  }

  update(id: number, updateStockRetainItemLogDto: UpdateStockRetainItemLogDto) {
    return `This action updates a #${id} stockRetainItemLog`;
  }

  remove(id: number) {
    return `This action removes a #${id} stockRetainItemLog`;
  }
}
