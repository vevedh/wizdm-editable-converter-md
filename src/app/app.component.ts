import { Component, OnInit, HostBinding, ViewChild, ElementRef } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { MatIconRegistry } from '@angular/material';
import { DocumentComponent } from './document/editable-document.component';
import { wmDocument } from './document/model/editable-types';
import { EditableConverter } from './converter/converter.service';
import { filter, catchError, tap } from 'rxjs/operators';
import { Observable, Subject } from 'rxjs';
import { $animations } from './app.animations';

@Component({
  selector: 'body',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
  animations: $animations
})
export class AppComponent implements OnInit { 

  @ViewChild(DocumentComponent, { static: true }) document: DocumentComponent;
  readonly document$: Observable<wmDocument>;

  constructor(private http: HttpClient, private converter: EditableConverter, private icon: MatIconRegistry) {

    //this.document$ = this.loadDocument('assets/content.json');

    const context = {

      name: "TEST",
      pitch: "The ultimate boilerplate to launch your single page application the quickest",
      description: "Wizdm provides all the key features of a modern single page application ready to use, so, for you to focus on launching your idea the quickest!"

    };

    this.document$ = this.converter.loadMarkdown('assets/source.md', context);

  }

  public editMode = false;
  public data: any;

  readonly tools = {
    edit: {
      copy: "Copy\t(Ctrl+C)",
      cut: "Cut\t(Ctrl+X)",
      paste: "Paste\t(Ctrl+V)",
      undo: "Undo\t(Ctrl+Z)",
      redo: "Redo\t(Ctrl+Y)"
    },
    size: {
      title: "Text size",
      0: "Normal\t(Ctrl+0)",
      1: "Heading 1\t(Ctrl+1)",
      2: "Heading 2\t(Ctrl+2)",
      3: "Heading 3\t(Ctrl+3)"
    },
    insert: {
      numbered: "Numbered list",
      bulleted: "Bulleted list",
      quote: "Quote",
      link: "Insert link...",
      unlink: "Remove link",
      table: "Insert table",
      image: "Insert image"
    },
    align: {
      title: "Alignement",
      left: "Left",
      center: "Center",
      right: "Right",
      justify: "Justify"
    },
    indent: {
      more: "Indent\t(Ctrl+[)",
      less: "Outdent\t(Ctrl+])"
    },
    format: {
      title: "Format",
      bold: "Bold\t(Ctrl+B)",
      italic: "Italic\t(Ctrl+I)",
      underline: "Underline\t(Ctrl+U)",
      strikethrough: "Strikethrough",
      clear: "Clear formatting"
    },
    table: {
      rowAbove: "Insert row above",
      rowBelow: "Insert row below",
      columnLeft: "Insert column left",
      columnRight: "Insert column right",
      deleteRow: "Delete row",
      deleteColumn: "Delete column",
      delete: "Delete table"
    }
  };

  ngOnInit() {

    // Registers font awesome among the available sets of icons for mat-icon component
    this.icon.registerFontClassAlias('fontawesome', 'fa');
  }

  private loadDocument(path: string): Observable<wmDocument> {
    
    return this.http.get(path, { responseType: 'json' } ) as Observable<wmDocument>; 
  }

  public toggleMode() { this.editMode = !this.editMode; }

  public onChange(data) {
    //console.log(data)
  }

  public onNavigate(url: string) {
    console.log(url)
  }

  public onLongPress(ev: KeyboardEvent) {
    console.log('Long press:', ev);
  }
}
