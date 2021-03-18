import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DocumentComponent } from './editable-document.component';
import { EditableComponent } from './editable/editable.component';
import { ListComponent } from './list/list.component';
import { BlockComponent } from './block/block.component';
import { TableComponent } from './table/table.component';
import { FigureComponent } from './figure/figure.component';

@NgModule({
  imports: [
    CommonModule
  ],
  declarations: [
    DocumentComponent, 
    EditableComponent,
    ListComponent, 
    BlockComponent,
    TableComponent,
    FigureComponent
  ],
  exports: [
    DocumentComponent
  ]
})
export class EditableModule {}