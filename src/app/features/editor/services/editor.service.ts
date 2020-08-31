import { Injectable } from '@angular/core';
import {AngularFirestore} from "@angular/fire/firestore";
import {EditorValue} from "../interfaces/editor-value";
import {Observable} from "rxjs";

@Injectable()
export class EditorService {

   private editorUrl: string = 'editor/editor-field';

  constructor(
    private afs: AngularFirestore
  ) {
  }

  getEditorValue(): Observable<EditorValue> {
    return this.afs.doc<EditorValue>(`${this.editorUrl}`).valueChanges();
  }

  setEditorValue(value:string) {
    return this.afs.doc<EditorValue>(this.editorUrl).set({currentValue: value});
  }

}
