import { createFeatureSelector, createSelector } from '@ngrx/store';
import { IUsersState, USERS_FEATURE_KEY, usersAdapter } from './users.reducer';

export const selectUsersFeatureState =
  createFeatureSelector<IUsersState>(USERS_FEATURE_KEY);

export const selectUsersState = createSelector(
  selectUsersFeatureState,
  (state) => usersAdapter.getSelectors().selectAll(state)
);

export const selectUsersStatus = createSelector(
  selectUsersFeatureState,
  (state) => state.status
);

export const selectUsersError = createSelector(
  selectUsersFeatureState,
  (state) => state.error
);
