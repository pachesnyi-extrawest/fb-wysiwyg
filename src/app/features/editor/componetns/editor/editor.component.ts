import {AfterViewInit, Component, ElementRef, OnDestroy, OnInit, ViewChild} from '@angular/core';
import {EditorService} from "../../services/editor.service";
import {take} from "rxjs/operators";
import {AuthService} from "../../../core/services/auth.service";
declare var MediumEditor: any;

@Component({
  selector: 'app-editor',
  templateUrl: './editor.component.html',
  styleUrls: ['./editor.component.scss']
})
export class EditorComponent implements OnInit, AfterViewInit, OnDestroy {

  private editor: any;

  @ViewChild('editable', {
    static: true
  }) editable: ElementRef;

  private buttons: string[] = [
    'bold'
    ,'italic'
    ,'underline'
    ,'anchor'
    ,'justifyLeft'
    ,'justifyCenter'
    ,'justifyRight'
    ,'justifyFull'
    ,'h1'
    ,'h2'
    ,'h3'
    ,'h4'
    ,'h5'
    ,'h6'
  ];

  constructor(
    private editorService: EditorService,
    private authService: AuthService
  ) {}


  ngOnInit(): void {
    this.editor = new MediumEditor(this.editable.nativeElement, {
      toolbar: {
        allowMultiParagraphSelection: true,
        buttons: this.buttons,
        diffLeft: 0,
        diffTop: -10,
        firstButtonClass: 'medium-editor-button-first',
        lastButtonClass: 'medium-editor-button-last',
        relativeContainer: null,
        standardizeSelectionStart: false,
        static: false,
        align: 'center',
        sticky: false,
        updateOnEmptySelection: false
      }
    });

    this.editorService.getEditorValue()
      .pipe(
        take(1)
      )
      .subscribe(
        value=> {
          this.editor.setContent(value.currentValue)
        }
      )
  }

  ngAfterViewInit():void {
    this.editor.subscribe('editableInput', this.debounce(this.handleListenEditor, 2000, false))
  }

  ngOnDestroy() {
    this.editor.unsubscribe();
  }

  handleListenEditor = async (event, editable)  => {
    this.editor.saveSelection();
    this.editor.setContent(this.handleRegex(editable.innerHTML))
    await this.setValueToDatabase(editable.innerHTML)
    this.editor.restoreSelection();
  }

  handleRegex = (value: string) => {
    const regexWrapper = /\$([0-9+%\/*.-])+\$/mg;
    const equationMatch = value.match(regexWrapper)?.[0].replace(/\$/g, '');
    return value.replace(`$${equationMatch}$`, eval(equationMatch))
  }

  setValueToDatabase(value: string) {
    return this.editorService.setEditorValue(value)
  }

  // Inside editor we don't have debounce, that's why I wrote function, instead MediumEditor.util.throttle
  debounce = (func, wait, immediate) => {
    let timeout;

    return function executedFunction() {
      let context = this;
      let args = arguments;

      let later = function() {
        timeout = null;
        if (!immediate) func.apply(context, args);
      };

      let callNow = immediate && !timeout;

      clearTimeout(timeout);

      timeout = setTimeout(later, wait);

      if (callNow) func.apply(context, args);
    };
  };

  signOut() {
    return this.authService.signOut();
  }
}
