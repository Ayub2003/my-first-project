import { CommonModule, NgFor } from '@angular/common';
import { Component, EventEmitter, Input, Output } from '@angular/core';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { IUser } from '../../models/users.model';
import { EditUserFormComponent } from '../../components/edit-user-form/edit-user-form.component';
import { MatDialog } from '@angular/material/dialog';
import { MatButton, MatButtonModule } from '@angular/material/button';

@Component({
  selector: 'app-user-card',
  standalone: true,
  imports: [MatSlideToggleModule, CommonModule, MatButtonModule],
  templateUrl: './user-card.component.html',
  styleUrl: './user-card.component.css',
})
export class UserCardComponent {
  @Input({ required: true }) user!: IUser;
  @Output() delete = new EventEmitter<void>();
  @Output() edit = new EventEmitter<IUser>();
  public details: boolean = false;

  constructor(private dialog: MatDialog) {}

  onDelete(): void {
    this.delete.emit();
  }

  onEdit(): void {
    this.edit.emit(this.user);
  }

  public toggleDetails() {
    this.details = !this.details;
  }
}
