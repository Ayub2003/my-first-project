import { Injectable } from '@angular/core';
import { IUser } from '../models/users.model';

@Injectable({
  providedIn: 'root',
})
export class UserLocaleStorageService {
  constructor() {}

  getUsers(): IUser[] | null {
    const users = localStorage.getItem('users');
    if (typeof users === 'string') {
      const parse: IUser[] = JSON.parse(users);
      return parse;
    }
    return null;
  }

  setUsers(users: IUser[]): void {
    if (typeof localStorage.getItem('users') !== 'string') {
      const stringifiedUsers: string = JSON.stringify(users);
      localStorage.setItem('users', stringifiedUsers);
    }
  }

  removeUser(id: number): void {
    const users = localStorage.getItem('users');
    if (typeof users === 'string') {
      let parsedUsers: IUser[] = JSON.parse(users);
      parsedUsers = parsedUsers.filter((user) => user.id !== id);
      localStorage.setItem('users', JSON.stringify(parsedUsers));
    }
  }

  addUser(user: IUser): void {
    const users = localStorage.getItem('users');
    if (typeof users === 'string') {
      let parsedUsers: IUser[] = JSON.parse(users);
      parsedUsers.unshift(user);
      localStorage.setItem('users', JSON.stringify(parsedUsers));
    }
  }

  clear(): void {
    localStorage.clear();
  }
}
