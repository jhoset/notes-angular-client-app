import {Injectable} from '@angular/core';
import {BehaviorSubject} from "rxjs";
import {UserDto} from "../models/user.dto";

@Injectable({
  providedIn: 'root'
})
export class CurrentUserService {

  public user$: BehaviorSubject<UserDto | null> = new BehaviorSubject<UserDto | null>(null)

  constructor() {
    this.user$.next({id: 1, firstName: 'Admin', lastName: 'Admin', email: 'admin@gmail.com'});
  }
}
