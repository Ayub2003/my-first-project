import { CommonModule } from '@angular/common';
import { Component, Inject, Input, inject } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import {
  MAT_DIALOG_DATA,
  MatDialogTitle,
  MatDialogContent,
  MatDialogClose,
  MatDialogRef,
  MatDialogActions,
} from '@angular/material/dialog';
import { MatButtonModule } from '@angular/material/button';
import { FormsModule } from '@angular/forms';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { IUser } from '../../models/users.model';
import { UserService } from '../../service/user.service';

@Component({
  selector: 'app-edit-user-form',
  standalone: true,
  imports: [
    MatDialogTitle,
    MatDialogContent,
    MatDialogClose,
    CommonModule,
    ReactiveFormsModule,
    MatInputModule,
    MatFormFieldModule,
    FormsModule,
    MatButtonModule,
    MatDialogActions,
  ],
  templateUrl: './edit-user-form.component.html',
  styleUrl: './edit-user-form.component.css',
  providers: [UserService],
})
export class EditUserFormComponent {
  public form!: FormGroup;

  constructor(
    private formBuilder: FormBuilder,
    @Inject(MAT_DIALOG_DATA) public data: any,
    public dialogRef: MatDialogRef<EditUserFormComponent>,
    public userService: UserService
  ) {}

  ngOnInit() {
    this.form = this.formBuilder.group({
      name: ['', Validators.required],
      username: ['', Validators.required],
      email: ['', [Validators.required]],
    });
  }

  onSubmit() {
    if (this.form.valid) {
      const updatedUser = { ...this.data.user, ...this.form.value };
      this.dialogRef.close(updatedUser);
    }

    this.dialogRef.afterClosed().subscribe((result: IUser) => {
      console.log('EditData', result);
      if (result !== undefined) this.userService.editUser(result);

      console.log(result);
    });
  }

  onNoClick(): void {
    this.dialogRef.close();
  }
}
