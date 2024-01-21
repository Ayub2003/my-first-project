import {
  createAction,
  createActionGroup,
  emptyProps,
  props,
} from '@ngrx/store';
import { IUser } from '../models/users.model';
import { Update } from '@ngrx/entity';

//
//export const deleteUser = createAction('[Users Page] Delete User', props<{id:number}>())
export const UsersPageActions = createActionGroup({
  source: 'Users',
  events: {
    loadUsers: emptyProps(),
    loadUsersSuccess: props<{ users: IUser[] }>(),
    loadUsersFailed: props<{ error: unknown }>(),
    loadUsersFromLocaleStorage: props<{ users: IUser[] }>(),

    deleteUser: props<{ id: number }>(),
    deleteUserSuccess: props<{ id: number }>(),
    deleteUserFailed: props<{ error: unknown }>(),

    addUser: props<{ user: IUser }>(),
    addUserSuccess: props<{ user: IUser }>(),
    addUserFailed: props<{ error: unknown }>(),

    updateUser: props<{ user: Update<IUser> }>(),
    updateUserSuccess: props<{ user: Update<IUser> }>(),
    updateUserFailed: props<{ error: unknown }>(),
  },
});
