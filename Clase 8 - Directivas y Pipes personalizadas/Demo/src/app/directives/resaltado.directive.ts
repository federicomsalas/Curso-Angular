import { Directive, ElementRef, Input, OnInit } from '@angular/core';

@Directive({
  selector: '[appResaltado]'
})
export class ResaltadoDirective implements OnInit{

  @Input('appResaltado') colorRestaltado!: string;

  constructor(
    private elemento: ElementRef) 
    {
      console.log(elemento);
     
    }
    
    ngOnInit(): void {
      this.elemento.nativeElement.style.backgroundColor = this.colorRestaltado;
    }

}
