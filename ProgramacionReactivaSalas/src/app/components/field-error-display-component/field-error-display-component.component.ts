import { Component, OnInit, Input  } from '@angular/core';

@Component({
  selector: 'app-field-error-display-component',
  templateUrl: './field-error-display-component.component.html',
  styleUrls: ['./field-error-display-component.component.css']
})
export class FieldErrorDisplayComponentComponent  {

  @Input() errorMsg: string = "";
  @Input() displayError: boolean = false;

}
