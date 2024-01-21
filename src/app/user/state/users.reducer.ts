import { Action, createFeature, createReducer, on } from '@ngrx/store';
import { UsersPageActions } from './users.actions';
import { IUser } from '../models/users.model';
import { EntityAdapter, EntityState, createEntityAdapter } from '@ngrx/entity';
import { scan } from 'rxjs';

export const USERS_FEATURE_KEY = 'users';

export type LoadingStatus = 'init' | 'loading' | 'loaded' | 'error';

export interface IUsersState extends EntityState<IUser> {
  selectedId?: string | number; // which Users record has been selected
  status: LoadingStatus;
  error: unknown;
}

export const usersAdapter: EntityAdapter<IUser> = createEntityAdapter<IUser>();

const initialState: IUsersState = usersAdapter.getInitialState({
  status: 'init',
  error: null,
});

export const usersReducer = createReducer(
  initialState,

  on(UsersPageActions.loadUsers, (state) => ({
    ...state,
    status: 'loading' as const,
  })),
  on(UsersPageActions.loadUsersSuccess, (state, { users }) =>
    usersAdapter.setAll(users, { ...state, status: 'loaded' as const })
  ),
  on(UsersPageActions.loadUsersFailed, (state, { error }) => ({
    ...state,
    error,
    status: 'error' as const,
  })),
  on(UsersPageActions.loadUsersFromLocaleStorage, (state, { users }) =>
    usersAdapter.setAll(users, { ...state, status: 'loaded' as const })
  ),

  on(UsersPageActions.deleteUser, (state) => ({
    ...state,
    status: 'loading' as const,
  })),
  on(UsersPageActions.deleteUserSuccess, (state, { id }) =>
    usersAdapter.removeOne(id, { ...state, status: 'loaded' as const })
  ),
  on(UsersPageActions.deleteUserFailed, (state, { error }) => ({
    ...state,
    error,
    status: 'error' as const,
  })),

  on(UsersPageActions.addUser, (state) => ({
    ...state,
    status: 'loading' as const,
  })),
  on(UsersPageActions.addUserSuccess, (state, { user }) =>
    usersAdapter.addOne(user, { ...state, status: 'loaded' as const })
  ),
  on(UsersPageActions.addUserFailed, (state, { error }) => ({
    ...state,
    error,
    status: 'error' as const,
  })),

  on(UsersPageActions.updateUser, (state, { user }) => ({
    ...state,
    status: 'loading' as const,
  })),
  on(UsersPageActions.updateUserSuccess, (state, { user }) =>
    usersAdapter.updateOne(user, { ...state, status: 'loaded' as const })
  )
);
// export const usersFeature = createFeature({
//   name: USERS_FEATURE_KEY,
//   reducer,
// })
