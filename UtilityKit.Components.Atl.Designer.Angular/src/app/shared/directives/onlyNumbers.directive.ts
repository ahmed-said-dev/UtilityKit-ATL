import { Directive, ElementRef, HostListener, Input } from '@angular/core';

@Directive({
  selector: '[appNumber]',
})
export class OnlyNumberDirective {
  regexStr = '/^-?[0-9]d*(.d+)?$/';

  constructor(private el: ElementRef) {}

  //checks for keypress event in input field, only allows chars that matches the regex
  @HostListener('keypress', ['$event'])
  onKeyPress(event: any) {
    if (event.key == '-' && event.target.value == '') {
      return true;
    }
    return new RegExp('^-?[0-9]d*(.d+)?$').test(event.key);
  }

  //takes care in case of paste event
  @HostListener('paste', ['$event'])
  blockPaste(event: ClipboardEvent) {
    // this.validateFields(event);
    event.preventDefault();
  }

  validateFields(event: ClipboardEvent) {
    event.preventDefault();
    const pasteData = event.clipboardData
      ?.getData('text/plain')
      .replace(/^-?[0-9]d*(.d+)?$/, '');
    document.execCommand('insertHTML', false, pasteData);
  }
}
