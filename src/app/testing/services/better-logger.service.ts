import { Injectable } from '@angular/core';
import {LoggerService} from "./logger.service";

@Injectable()
export class BetterLoggerService extends LoggerService{
  constructor() {
    super()
    this.info('BetterLogger created')
  }
  override info(message: string){
      super.info(message.toUpperCase())
    }
}
