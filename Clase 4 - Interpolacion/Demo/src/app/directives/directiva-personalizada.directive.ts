import { Directive, ElementRef, Renderer2 } from '@angular/core';

@Directive({
  selector: '[appDirectivaPersonalizada]'
})
export class DirectivaPersonalizadaDirective {

  constructor(
    private renderer: Renderer2,
    private elementoRef: ElementRef
  ) { 
    renderer.setStyle(elementoRef.nativeElement, 'background-color', '#d1d1d1');
  }

}
