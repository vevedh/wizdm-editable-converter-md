import { Component, HostBinding, Input, Output, EventEmitter } from '@angular/core';
import { EditableSelection } from '../document/model/editable-selection';
import { wmTextStyle } from '../document/model/editable-types';
import { $animations } from './editable-toolbar.animations';

@Component({
  selector: 'wm-editable-toolbar',
  templateUrl: './editable-toolbar.component.html',
  styleUrls: ['./editable-toolbar.component.scss'],
  animations: $animations
})
export class EditableToolbar {

  @HostBinding('@slide') slide = true;

  constructor() { }

  readonly styles = ['bold', 'italic', 'underline', 'strikethrough'];
  readonly alignements = ['left', 'center', 'right', 'justify'];

  @Input() sel: EditableSelection;
  @Input() msgs: { [key: string]: string };
  @Input() tooltipDelay = 1000;

  public hasStyle(style: wmTextStyle): boolean {
    return this.sel.style.some( s => s === style );
  }

  public label(msg: string): string {
    return !!msg && msg.replace(/\t.*/, '');
  }

  doNothing() {}
}
