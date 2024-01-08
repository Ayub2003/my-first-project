import { Component, OnInit } from '@angular/core';
import { HttpClientModule, HttpErrorResponse } from '@angular/common/http';
import { UserCardComponent } from './user-card/user-card.component';
import { NgFor, NgIf } from '@angular/common';
import { UserAPIService } from '../service/user-api.service';
import { IUser } from '../models/users.model';
import { tap } from 'rxjs';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';
import { MatButtonModule } from '@angular/material/button';
import { AddUserFormComponent } from '../components/add-user-form/add-user-form.component';
import { UserLocaleStorageService } from '../service/user-locale-storage.service';
import { EditUserFormComponent } from '../components/edit-user-form/edit-user-form.component';

@Component({
  selector: 'app-user-list',
  standalone: true,
  imports: [
    HttpClientModule,
    UserCardComponent,
    NgFor,
    NgIf,
    MatButtonModule,
    MatButtonModule,
  ],
  templateUrl: './user-list.component.html',
  styleUrl: './user-list.component.css',
  providers: [UserAPIService, UserLocaleStorageService],
})
export class UserListComponent implements OnInit {
  public users: IUser[] | null = null;
  public error?: HttpErrorResponse | undefined;
  public loading!: boolean;

  constructor(
    private userAPIService: UserAPIService,
    private userLocaleStorageService: UserLocaleStorageService,
    public dialog: MatDialog
  ) {}

  ngOnInit(): void {
    this.loadUsers();
  }

  public loadUsers(): void {
    this.loading = true;
    if (!this.users) {
      if (this.userLocaleStorageService.getUsers() === null) {
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
        this.users?.unshift(user);
        this.userLocaleStorageService.addUser(user);
      },
    });
  }

  //еще не работает, надо исправитть
  public editUser(editedUser: IUser) {
    this.userAPIService.editUser(editedUser).subscribe({
      next: () => {
        let updatedUsers = this.users!.map((user) => {
          if (editedUser.id === user.id) return editedUser;
          else return user;
        });
        this.users = updatedUsers;
      },
    });
  }

  public openDialog() {
    const dialogRef = this.dialog.open(AddUserFormComponent, {
      data: {
        name: '',
        username: '',
        email: '',
      },
    });

    dialogRef.afterClosed().subscribe((result: any) => {
      console.log('AddData', result);
      if (result !== undefined) {
        this.addUser(result);
      }
    });
  }

  public openDialogEditUser(user: IUser) {
    console.log(user);
    const userEditDialogRef = this.dialog.open(EditUserFormComponent, {
      data: { user: user },
    });

    userEditDialogRef.afterClosed().subscribe((result: { user: IUser }) => {
      console.log('EditData', result);
      if (result !== undefined) {
        this.editUser(result.user);
      }
    });
  }
}
