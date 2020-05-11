import * as auth from './reducers/index';
import { createAction, props, Action } from '@ngrx/store';



export interface AppState {
  authState: auth.State;
}