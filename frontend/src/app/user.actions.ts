import { createAction, props, Action } from '@ngrx/store';

export const loadUsers = createAction(
  '[User] Load Users'
);

export const loadUsersSuccess = createAction(
  '[User] Load Users Success',
  props<{ data: any }>()
);

export const loadUsersFailure = createAction(
  '[User] Load Users Failure',
  props<{ error: any }>()
);

export class Login implements Action{
  
  readonly type = '[Auth] Login'
  constructor(payload:{username:string,password:string}){console.log('in user action ');}
}
