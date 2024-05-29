import {Component} from '@angular/core';
import {CurrentUserService} from "../../core/services/current-user.service";

@Component({
  selector: 'app-notes',
  templateUrl: './notes.component.html',
  styleUrl: './notes.component.scss'
})
export class NotesComponent {

  constructor(private _currentUser: CurrentUserService) {
    const user = localStorage.getItem('eUser');
    if (user) {
      this._currentUser.user$.next(JSON.parse(user));
    } else {
      this._currentUser.user$.next({id: 0, firstName: 'Unknown', lastName: 'Unknown', email: 'unknown@gmail.com'});
    }
  }
}
