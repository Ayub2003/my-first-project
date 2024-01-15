import {Injectable} from '@angular/core';
import {IUser} from '../models/users.model';

@Injectable({
  providedIn: 'root',
})
export class UserLocaleStorageService {
  constructor() {}

  getUsers(): IUser[] | undefined {
    const users = localStorage.getItem('users');
    if (typeof users === 'string') return JSON.parse(users)
    else return undefined;
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
      parsedUsers= [user,...parsedUsers];
      localStorage.setItem('users', JSON.stringify(parsedUsers));
    }
  }

  editUser(updatedData: Partial<IUser>): void{
    const users = localStorage.getItem('users');
    if (typeof users === 'string') {
      const updatedUsers:IUser[] = JSON.parse(users).map((user:IUser)=>{
        if(user.id === updatedData.id) return {...user, ...updatedData}
        else return user
      })
      localStorage.setItem('users', JSON.stringify(updatedUsers))
    }
  }

  clear(): void {
    localStorage.clear();
  }
}
