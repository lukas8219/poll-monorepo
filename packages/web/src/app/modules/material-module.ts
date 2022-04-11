import { NgModule } from '@angular/core';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { FormsModule } from '@angular/forms';

@NgModule({
  imports: [MatFormFieldModule, FormsModule, MatInputModule],
  exports: [MatFormFieldModule, FormsModule, MatInputModule],
})
export class MaterialModule {}
