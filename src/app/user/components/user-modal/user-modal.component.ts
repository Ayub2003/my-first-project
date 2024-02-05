import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-user-modal',
  standalone: true,
  imports: [],
  templateUrl: './user-modal.component.html',
  styleUrl: './user-modal.component.css',
})
export class UserModalComponent implements OnInit {
  ngOnInit(): void {}
}

// enum ModalType {
//   isCreate = 'isCreate',
//   isEdit = 'isEdit',
// }

// interface IData {
//   midalType: ModalType;
// }

// const obj: IData = { midalType: ModalType.isEdit };
// if (obj.midalType === ModalType.isEdit) {
//   //...some
// }
