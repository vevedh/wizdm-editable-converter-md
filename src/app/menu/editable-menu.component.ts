import { Component, Inject, ViewChild, Input } from '@angular/core';
import { DOCUMENT } from '@angular/common';
import { MatMenuTrigger } from '@angular/material';
import { EditableSelection } from '../document/model/editable-selection';
import { wmTextStyle } from '../document/model/editable-types';

@Component({
  selector: 'wm-editable-menu',
  templateUrl: './editable-menu.component.html',
  styleUrls: ['./editable-menu.component.scss']
})
export class EditableMenu {

  @ViewChild(MatMenuTrigger, { static: true }) private trigger: MatMenuTrigger;

  readonly alignements = ['left', 'center', 'right', 'justify'];
  readonly formats = ['bold', 'italic', 'underline', 'strikethrough'];

  @Input() sel: EditableSelection;
  @Input() msgs = {};

  constructor(@Inject(DOCUMENT) private document: Document) { }

  public get align() { return this.sel.align; }
  public set align(align) { this.sel.align = align; }

  public dummyLink() { this.sel.link('./'); }

  public unlink() { this.sel.unlink(); }

  public hasStyle(style: wmTextStyle): boolean {
    return this.sel.style.some( s => s === style);
  }

  public label(msg: string): string {
    return !!msg && msg.replace(/\t.*/, '');
  }
  
  public edit(cmd: 'copy'|'cut'|'paste') {
    // This will pass the call to the editable-document handlers with the 
    // appropriate ClipboardData object to deal with 
    const ret = this.document.execCommand(cmd);

    console.log(ret);
  }

  public left = 0;
  public top = 0;

  // Opens the menu at the specified position
  public open({ x, y, currentTarget }: MouseEvent, data?: any) {
    // Pass along the context data to support lazily-rendered content
    if(!!data) { this.trigger.menuData = data; }
    // Adjust the menu anchor position
    this.left = x;
    this.top = y;
    // Opens the menu
    this.trigger.openMenu();
    // prevents default
    return false;
  }  

}