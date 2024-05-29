import {NgModule} from '@angular/core';
import {RouterModule, Routes} from "@angular/router";
import {NotesListViewComponent} from "./views/notes-list-view/notes-list-view.component";
import {NotesComponent} from "./notes.component";

const routes: Routes = [
  {
    path: '',
    component: NotesComponent,
    children: [
      {
        path: '',
        redirectTo: 'list',
        pathMatch: 'full'
      },
      {
        path: 'list',
        component: NotesListViewComponent
      }
    ]
  },
  {
    path: '**',
    redirectTo: ''
  }
];

@NgModule({
  declarations: [],
  imports: [
    RouterModule.forChild(routes)
  ],
  exports: [RouterModule]
})
export class NotesRoutingModule {
}
