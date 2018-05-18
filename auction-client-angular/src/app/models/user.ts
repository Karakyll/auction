import {Role} from './role';

/**
 * Model represent user entity
 */
export class User {
  constructor(public userName: string,
              public set_password: string,
              public enabled: boolean,
              public roles: Role[]) {
  }
}
