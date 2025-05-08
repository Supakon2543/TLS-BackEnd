import { Injectable } from '@nestjs/common';
import { CreateStorageUnitDto } from './dto/create-storage-unit.dto';
import { UpdateStorageUnitDto } from './dto/update-storage-unit.dto';

@Injectable()
export class StorageUnitService {
  create(createStorageUnitDto: CreateStorageUnitDto) {
    return 'This action adds a new storageUnit';
  }

  findAll() {
    return `This action returns all storageUnit`;
  }

  findOne(id: number) {
    return `This action returns a #${id} storageUnit`;
  }

  update(id: number, updateStorageUnitDto: UpdateStorageUnitDto) {
    return `This action updates a #${id} storageUnit`;
  }

  remove(id: number) {
    return `This action removes a #${id} storageUnit`;
  }
}
