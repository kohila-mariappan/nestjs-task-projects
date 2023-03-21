import { Injectable } from '@nestjs/common';

@Injectable()
export class PowerService {
  powerSupply(watt: number) {
    console.log('power supply worth of', watt);
  }
}
