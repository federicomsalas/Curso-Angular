import { Directive, ElementRef, Input, OnInit } from '@angular/core';

@Directive({
  selector: '[appTitulos]'
})
export class TitulosDirective implements OnInit{


  constructor(
    private elemento: ElementRef
  ) { }

  ngOnInit(): void {
    this.elemento.nativeElement.style.fontSize = "20px";
  }

}
