import { Component, inject, OnInit } from '@angular/core';
import { HttpClientModule, HttpErrorResponse } from '@angular/common/http';
import { UserCardComponent } from './user-card/user-card.component';
import { AsyncPipe, NgFor, NgIf } from '@angular/common';
import { UserAPIService } from '../service/user-api.service';
import { IUser, ModalType } from '../models/users.model';
import { MatDialog } from '@angular/material/dialog';
import { MatButtonModule } from '@angular/material/button';
import { AddUserFormComponent } from '../components/add-user-form/add-user-form.component';
import { EditUserFormComponent } from '../components/edit-user-form/edit-user-form.component';
import { UserService } from '../service/user.service';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { UsersFacade } from '../state/users.facade';
import { UserFormService } from '../service/user-form.service';
import { UserModalComponent } from '../components/user-modal/user-modal.component';

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
    MatProgressBarModule,
    AsyncPipe,
  ],
  templateUrl: './user-list.component.html',
  styleUrl: './user-list.component.css',
})
export class UserListComponent implements OnInit {
  constructor(public dialog: MatDialog) {}
  public userService: UserService = inject(UserService);
  public userFacade = inject(UsersFacade);

  public users$ = this.userFacade.users$;
  public status$ = this.userFacade.status$;
  public error$ = this.userFacade.error$;

  ngOnInit(): void {
    this.userFacade.loadUsers();
  }

  public openDialogAddUser() {
    const dialogRef = this.dialog.open(AddUserFormComponent);

    dialogRef.afterClosed().subscribe((result: IUser | undefined) => {
      if (result) this.userFacade.addUser(result);
    });
  }

  public openDialogEditUser(user: IUser) {
    const dialogRef = this.dialog.open(EditUserFormComponent, {
      data: { user: { ...user } },
    });

    dialogRef.afterClosed().subscribe((result: IUser | undefined) => {
      if (result) this.userFacade.updateUser(result);
    });
  }

  public openCreateUserModal() {
    const diaologRef = this.dialog.open(UserModalComponent, {
      data: { modalType: ModalType.isCreate },
    });

    diaologRef
      .afterClosed()
      .subscribe(
        (user: IUser | undefined) => user && this.userFacade.addUser(user)
      );
  }

  public openEditUserModal(user: IUser) {
    const dialogRef = this.dialog.open(UserModalComponent, {
      data: { modalType: ModalType.isEdit, user: { ...user } },
    });
  }
}
