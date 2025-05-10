import { Injectable } from '@angular/core';
import {LoggerService} from "./logger.service";
import {UserService} from "./user.service";

@Injectable({
  providedIn: 'root',
  useFactory: (
    loggerService: LoggerService,
    userService: UserService
  ) => new GreatingsService(loggerService, userService.info().name),
  deps: [LoggerService, UserService]
})
export class GreatingsService {

  constructor(private loggerService: LoggerService, private name: string) {
    this.loggerService.info(name + 'use greatings')
  }

  public getMessage(){
    return this.name + 'спасибо что еще смотришь'
  }
}
