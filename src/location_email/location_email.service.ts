import { Injectable } from '@nestjs/common';
import { CreateLocationEmailDto } from './dto/create-location_email.dto';
import { UpdateLocationEmailDto } from './dto/update-location_email.dto';

@Injectable()
export class LocationEmailService {
  create(createLocationEmailDto: CreateLocationEmailDto) {
    return 'This action adds a new locationEmail';
  }

  findAll() {
    return `This action returns all locationEmail`;
  }

  findOne(id: number) {
    return `This action returns a #${id} locationEmail`;
  }

  update(id: number, updateLocationEmailDto: UpdateLocationEmailDto) {
    return `This action updates a #${id} locationEmail`;
  }

  remove(id: number) {
    return `This action removes a #${id} locationEmail`;
  }
}
