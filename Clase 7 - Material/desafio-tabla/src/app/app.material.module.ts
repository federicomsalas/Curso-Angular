import { NgModule } from "@angular/core";

import { MatTableModule } from  '@angular/material/table';
import { MatIconModule } from  '@angular/material/icon';
import { MatDialogModule } from  '@angular/material/dialog';
import { MatFormFieldModule } from  '@angular/material/form-field';
import { MatInputModule } from  '@angular/material/input';
import { MatSlideToggleModule } from  '@angular/material/slide-toggle';


@NgModule({
    exports: [
        MatTableModule,
        MatIconModule,
        MatDialogModule,
        MatFormFieldModule,
        MatInputModule,
        MatSlideToggleModule
    ]
})

export class AppMaterialModule{}