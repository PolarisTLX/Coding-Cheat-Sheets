import { Directive, HostListener, ElementRef, Input } from '@angular/core';

@Directive({
  selector: '[appInputFormat]'
})
export class InputFormatDirective {

  // @Input('format') format;
  @Input('appInputFormat') format;

  constructor(private el: ElementRef) { }

  // focus means when user clicks onto something, like an input box to start typing
  @HostListener('focus') onFocus() {
    console.log("On focus");
  }

  // blur means when user clicks off of something
  @HostListener('blur') onBlur() {
    console.log("On blur");
    // grab the value which is what user typed into the input box
    let value: string = this.el.nativeElement.value;

    if (this.format == 'lowercase'){
      this.el.nativeElement.value = value.toLowerCase();
    } else {
      this.el.nativeElement.value = value.toUpperCase();
    }
  }

}
