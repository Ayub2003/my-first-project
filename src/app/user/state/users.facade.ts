import { inject, Inject, Injectable } from '@angular/core';
import { select, Store } from '@ngrx/store';
import { UsersPageActions } from './users.actions';
import * as UsersSelectors from './users.selectors';
import { IUser } from '../models/users.model';

@Injectable({
  providedIn: 'root',
})
export class UsersFacade {
  private readonly store = inject(Store);

  public readonly users$ = this.store.select(UsersSelectors.selectUsersState);
  public readonly status$ = this.store.select(UsersSelectors.selectUsersStatus);
  public readonly error$ = this.store.select(UsersSelectors.selectUsersError);
  //or
  //public readonly users$ = this.store.pipe(select(selectUsersState))

  loadUsers() {
    this.store.dispatch(UsersPageActions.loadUsers());
  }

  deleteUser(id: number) {
    this.store.dispatch(UsersPageActions.deleteUser({ id }));
  }

  addUser(user: IUser) {
    this.store.dispatch(UsersPageActions.addUser({ user }));
  }

  updateUser(user: IUser) {
    this.store.dispatch(
      UsersPageActions.updateUser({ user: { id: user.id, changes: user } })
    );
  }
}
