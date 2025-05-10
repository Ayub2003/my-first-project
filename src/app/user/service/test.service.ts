import { Injectable } from '@angular/core';
import {Subject} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class TestService {

  constructor() { }

  public eventSubject = new Subject<any>();

  emitEvent(data: any) {
    setTimeout(() => {
      this.eventSubject.next(data);
    }, 0);
  }

  getEventEmitter() {
    return this.eventSubject.asObservable();
  }

}
