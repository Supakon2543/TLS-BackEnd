import { Module } from '@nestjs/common';
import { StorageUnitService } from './storage-unit.service';
import { StorageUnitController } from './storage-unit.controller';

@Module({
  controllers: [StorageUnitController],
  providers: [StorageUnitService],
})
export class StorageUnitModule {}
