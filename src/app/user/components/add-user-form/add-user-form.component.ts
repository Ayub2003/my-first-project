import { CommonModule } from '@angular/common';
import { Component, Inject, Input, OnInit } from '@angular/core';
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

@Component({
  selector: 'app-add-user-form',
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
  templateUrl: './add-user-form.component.html',
  styleUrl: './add-user-form.component.css',
})
export class AddUserFormComponent implements OnInit {
  public form!: FormGroup;
  constructor(
    public dialogRef: MatDialogRef<AddUserFormComponent>,
    private formBuilder: FormBuilder
  ) {}

  ngOnInit() {
    this.form = this.formBuilder.group({
      id: [new Date().getTime()],
      name: ['', Validators.required],
      username: ['', Validators.required],
      email: ['', [Validators.required]],
    });
  }

  onSubmit() {
    if (this.form.valid) this.dialogRef.close(this.form.value);
  }
}
