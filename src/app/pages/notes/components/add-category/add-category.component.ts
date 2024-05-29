import {Component, Inject} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef} from "@angular/material/dialog";
import {FormControl, Validators} from "@angular/forms";
import {CategoryService} from "../../../../core/services/category.service";

@Component({
  selector: 'app-add-category',
  templateUrl: './add-category.component.html',
  styleUrl: './add-category.component.scss'
})
export class AddCategoryComponent {

  public loading: boolean = false;
  public nameControl = new FormControl('', [Validators.required]);

  constructor(@Inject(MAT_DIALOG_DATA) public data: string,
              private _dialogRef: MatDialogRef<AddCategoryComponent>,
              private _categoryService: CategoryService) {
  }

  onSave() {
    if (this.nameControl.invalid) return;
    this.loading = true;
    this._categoryService.createCategory({name: this.nameControl.value}).subscribe(rs => {
      this.loading = false;
      console.log(rs)
      if (rs) {
        this._dialogRef.close(rs)
      }
    })
  }

  onClose() {
    this._dialogRef.close(null)
  }


}
