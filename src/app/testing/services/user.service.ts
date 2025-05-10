import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  info(): {name: string}{
    return {name: 'Ayub'}
  }
}
