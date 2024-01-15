import { Injectable } from '@angular/core';
import { IUser } from '../models/users.model';
import { UserAPIService } from './user-api.service';
import { UserLocaleStorageService } from './user-locale-storage.service';
import { HttpErrorResponse } from '@angular/common/http';
import { tap } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  public users: IUser[] | undefined;
  public error?: HttpErrorResponse | undefined;
  public loading!: boolean;

  constructor(
    private userAPIService: UserAPIService,
    private userLocaleStorageService: UserLocaleStorageService
  ) {}

  public loadUsers(): void {
    this.loading = true;
    if (!this.users) {
      if (!this.userLocaleStorageService.getUsers()) {
        this.userAPIService
          .getUsers()
          .pipe(tap(() => (this.loading = false)))
          .subscribe({
            next: (data: IUser[]) => {
              this.users = data;
              this.userLocaleStorageService.setUsers(data);
            },
            error: (error: HttpErrorResponse) => (this.error = error),
          });
      } else {
        this.users = this.userLocaleStorageService.getUsers();
        this.loading = false;
      }
    }
  }

  public deleteUser(id: number): void {
    this.userAPIService.deleteUser(id).subscribe({
      next: () => {
        this.users = this.users!.filter((el: IUser) => el.id !== id);
        this.userLocaleStorageService.removeUser(id);
      },
      error: (error) => {
        console.error(error);
      },
    });
  }

  public addUser(user: IUser): void {
    this.userAPIService.addUser(user).subscribe({
      next: (data: { id: number }) => {
        user = { ...user, id: data.id };
        if (this.users) this.users = [user, ...this.users];
        this.userLocaleStorageService.addUser(user);
      },
    });
  }

  public editUser(editedUser: IUser): void {
    console.log('[editUser] editedUser', editedUser);
    this.userAPIService.editUser(editedUser).subscribe({
      next: () => {
        if(this.users){
          console.log('[editUser] this.user is not undefined')
          this.users = this.users.map((user: IUser) => {
            if (editedUser.id === user.id) return { ...user, ...editedUser };
            else return user;
          });
          this.userLocaleStorageService.editUser(editedUser)
      } else console.log('[editUser] this.users is undefined', this.users)}
    });
  }
}
