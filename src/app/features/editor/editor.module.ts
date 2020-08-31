import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { EditorComponent } from './componetns/editor/editor.component';
import {EditorRoutingModule} from "./editor-routing.module";
import {EditorService} from "./services/editor.service";

@NgModule({
  declarations: [EditorComponent],
  imports: [
    CommonModule,
    EditorRoutingModule
  ],
  providers: [EditorService]
})
export class EditorModule { }
