import { Directive, HostListener, Renderer2, ElementRef } from '@angular/core';

@Directive({
	selector: '[appDropdown]'
})
export class DropdownDirective {

	constructor(private elRef: ElementRef, private renderer: Renderer2) { }

	@HostListener('click') toggleClass() {
		for (let i = 0; i < this.elRef.nativeElement.childNodes.length; i++) {
			if (this.elRef.nativeElement.childNodes[i].classList.contains('dropdown-menu')) {
				this.elRef.nativeElement.childNodes[i].classList.toggle('show');
				break;
			}
		}
	}
}