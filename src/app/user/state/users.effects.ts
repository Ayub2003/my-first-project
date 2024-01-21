import { Actions, createEffect, ofType } from '@ngrx/effects';
import { inject } from '@angular/core';
import { UserAPIService } from '../service/user-api.service';
import { UsersPageActions } from './users.actions';
import { BehaviorSubject, catchError, map, of, switchMap } from 'rxjs';
import { IUser } from '../models/users.model';
import { UserLocaleStorageService } from '../service/user-locale-storage.service';

export const loadUsersEffect = createEffect(
  () => {
    const actions$ = inject(Actions);
    const userAPIService = inject(UserAPIService);
    const userLocaleStorageService = inject(UserLocaleStorageService);

    return actions$.pipe(
      ofType(UsersPageActions.loadUsers),
      switchMap(() => {
        return userLocaleStorageService.getUsers()
          ? of(
              UsersPageActions.loadUsersFromLocaleStorage({
                users: userLocaleStorageService.getUsers()!,
              })
            )
          : userAPIService.getUsers().pipe(
              map((users: IUser[]) => {
                userLocaleStorageService.setUsers(users);
                return UsersPageActions.loadUsersSuccess({
                  users: users,
                });
              }),
              catchError((error) => {
                console.error('Error', error);
                return of(UsersPageActions.loadUsersFailed({ error }));
              })
            );
      })
    );
  },
  { functional: true }
);

export const deleteUserEffect = createEffect(
  () => {
    const actions$ = inject(Actions);
    const userAPIService = inject(UserAPIService);
    const userLocaleStorageService = inject(UserLocaleStorageService);

    return actions$.pipe(
      ofType(UsersPageActions.deleteUser),
      switchMap(({ id }) =>
        userAPIService.deleteUser(id).pipe(
          map(() => {
            userLocaleStorageService.removeUser(id);
            return UsersPageActions.deleteUserSuccess({ id });
          }),
          catchError((error) =>
            of(UsersPageActions.deleteUserFailed({ error }))
          )
        )
      )
    );
  },
  { functional: true }
);

export const addUserEffect = createEffect(
  () => {
    const actions$ = inject(Actions);
    const userAPIService = inject(UserAPIService);
    const userLocaleStorageService = inject(UserLocaleStorageService);

    return actions$.pipe(
      ofType(UsersPageActions.addUser),
      switchMap(({ user }) =>
        userAPIService.addUser(user).pipe(
          map(() => {
            userLocaleStorageService.addUser(user);
            return UsersPageActions.addUserSuccess({ user });
          }),
          catchError((error) => of(UsersPageActions.addUserFailed({ error })))
        )
      )
    );
  },
  { functional: true }
);

export const updateUserEffect = createEffect(
  () => {
    const actions$ = inject(Actions);
    const userAPIService = inject(UserAPIService);
    const userLocaleStorageService = inject(UserLocaleStorageService);

    return actions$.pipe(
      ofType(UsersPageActions.updateUser),
      switchMap(({ user }) =>
        userAPIService.editUser(user.changes).pipe(
          map(() => {
            userLocaleStorageService.editUser(user.changes);
            return UsersPageActions.updateUserSuccess({ user });
          }),
          catchError((error) =>
            of(UsersPageActions.updateUserFailed({ error }))
          )
        )
      )
    );
  },
  { functional: true }
);
