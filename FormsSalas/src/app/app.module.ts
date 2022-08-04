import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { FormComponent } from './components/form/form.component';
import { FieldErrorDisplayComponentComponent } from './components/field-error-display-component/field-error-display-component.component';

@NgModule({
  declarations: [
    AppComponent,
    FormComponent,
    FieldErrorDisplayComponentComponent    
  ],
  imports: [
    BrowserModule,
    ReactiveFormsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
