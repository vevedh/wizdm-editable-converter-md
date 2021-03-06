import { Injectable, Optional } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { MarkdownParser } from '../markdown/parser/parser.service';
import { mdContent, mdRoot, mdParent, mdTable, mdTableRow, mdTableCell } from '../markdown/parser/parser-types';
import { wmEditable, wmDocument, wmParent, wmAlignType, wmRow, wmCell } from '../document/model/editable-types';
import { Observable } from 'rxjs';
import { map, tap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class EditableConverter {

  constructor(private http: HttpClient, private parser: MarkdownParser) { }

  loadMarkdown(path: string, context?: any): Observable<any> {

    return this.http.get(path, { responseType: 'text' })
      .pipe(
        map( md => md.interpolate(context) ), 
        map( md => this.parser.parse(md) ),
        //tap( tree => console.log(tree) ), 
        map( root => this.editable(root) ) 
      );
  }

  public editable(root: mdRoot): wmDocument { 

    return {
      type: 'document',
      content: this.xlate(root)
    };
  }

  private xlate(node: mdContent, align: wmAlignType = null) {

    return ("children" in node) ? (node as mdParent).children.reduce((out: wmEditable[], child: any) => {

      switch(child.type) {

        case 'heading':
        return out.concat({ 
          type: 'heading',
          level: child.depth,
          align: align || 'left',
          content: this.inline(child)
        });

        case 'paragraph':
        return out.concat({ 
          type: 'paragraph',
          align: align || 'justify',
          content: this.inline(child)
        });

        case 'blockquote':
        return out.concat({ 
          type: 'blockquote',
          content: this.xlate(child, align)
        });

        case 'list':
        return child.ordered ? out.concat({ 
            type: 'numbered',
            start: child.start,
            content: this.xlate(child, align || 'left')
        }) : out.concat({ 
          type: 'bulleted',
          content: this.xlate(child, align || 'left')
        });

        case 'listItem':
        return out.concat( this.xlate(child, align) );

        case 'table': 
        return out.concat({
          type: 'figure',
          content : [{
            type: 'table',
            content: this.table(child)
          }]
        });

        case 'leftAligned': 
        return out.concat( this.xlate(child, 'left') );
        
        case 'centerAligned': 
        return out.concat( this.xlate(child, 'center') );
        
        case 'rightAligned':
        return out.concat( this.xlate(child, 'right') );
      }

      return out;

    }, [] ).filter( (node: any) => !node.content || node.content.length > 0) : [];
  }

  private inline(node: mdContent, ...style: string[]) {

    return ("children" in node) ? (node as mdParent).children.reduce((out: any[], child: any) => {

      switch(child.type) {

        case 'emphasis':
        return out.concat( this.inline(child, 'italic', ...style) );

        case 'strong':
        return out.concat( this.inline(child, 'bold', ...style) );

        case 'delete':
        return out.concat( this.inline(child, 'strikethrough', ...style) );

        case 'sub':
        return out.concat( this.inline(child, 'sub', ...style) );

        case 'sup':
        return out.concat( this.inline(child, 'super', ...style) );

        case 'text':
        return out.concat({ 
          type: 'text',
          style,
          value: child.value
        });

        case 'linkReference':
        child.url = this.parser.definition(child).url;

        case 'link':
        const value = this.parser.text(child);

        return !!value ? out.concat({ 
          type: 'link',
          url: child.url,
          value
        }) : out;

        case 'inlineCode':
        return out.concat({ 
          type: 'text',
          value: child.value
        });
      }

      return out;

    }, [] ).filter( node => !node.children || node.children.length > 0) : [];
  }

  private table(table: mdTable): wmRow[] {
    
    return (!!table && !!table.children ? table.children.map( (row: mdTableRow) => {
      return {
        type: 'row',
        content: this.row(row, (table as any).align)
      };
    }) : []) as wmRow[];
  }

  private row(row: mdTableRow, align: string[]): wmCell[] {

    return (!!row && !!row.children ? row.children.map( (cell: mdTableCell, i) => {
      return {
        type: 'cell',
        align: !!align && align[i] || '',
        content: this.inline(cell)
      };
    }) : []) as wmCell[];
  }
/*
  private images(node: wmEditable): boolean {

    if("content" in node) {

      (node as wmParent).content.forEach( child => {
        
        if( this.images(child) ) {
          node.type = 'figure';
        }
      })
    }
    return node.type === 'image';
  }*/
}
