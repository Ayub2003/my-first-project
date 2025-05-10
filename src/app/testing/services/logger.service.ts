import { Injectable } from '@angular/core';

@Injectable()
export class LoggerService {

  info(messaage: string){
    console.log(messaage)
  }
}
