import { Component, OnInit, ViewChild, ElementRef, Input } from '@angular/core';
import * as ace from 'ace-builds';
import 'ace-builds/src-noconflict/mode-groovy';
import 'ace-builds/src-noconflict/theme-eclipse';
import 'ace-builds/src-noconflict/ext-language_tools';
import 'ace-builds/src-noconflict/ext-beautify';

const THEME = 'ace/theme/eclipse';
const LANG = 'ace/mode/groovy';

@Component({
    selector: 'app-dashboard',
    templateUrl: './lsl-editor.component.html'
})

export class LslEditorComponent implements OnInit {

    // private fileText;


    // fileUpload(event) {
    //     var reader = new FileReader();
    //     reader.readAsText(event.srcElement.files[0]);
    //     var me = this;
    //     reader.onload = function () {
    //         me.fileText = reader.result;
    //     }
    // }
    //gehört auch noch zum file explorer

    private editorBeautify;


    @ViewChild('codeEditor', { static: true }) codeEditorElmRef: ElementRef;
    private codeEditor: ace.Ace.Editor;

    @Input() content: string;

    constructor() { }

    ngOnInit() {
        ace.require('ace/ext/language_tools');
        const element = this.codeEditorElmRef.nativeElement;
        const editorOptions: Partial<ace.Ace.EditorOptions> = {
            highlightActiveLine: true,
            minLines: 40,
            maxLines: 55
        };

        this.codeEditor = ace.edit(element, editorOptions);
        this.codeEditor.setTheme(THEME);
        this.codeEditor.getSession().setMode(LANG);
        this.codeEditor.setShowFoldWidgets(true); // for the scope fold feature
        this.editorBeautify = ace.require('ace/ext/beautify');
    }

    private createCodeEditor(element: Element, options: any): ace.Ace.Editor {
        const editor = ace.edit(element, options);
        editor.setTheme(THEME);
        editor.getSession().setMode(LANG);
        editor.setShowFoldWidgets(true);
        return editor;
    }

    private getEditorOptions(): Partial<ace.Ace.EditorOptions> & { enableBasicAutocompletion?: boolean; } {
        const basicEditorOptions: Partial<ace.Ace.EditorOptions> = {
            highlightActiveLine: true,
            minLines: 14,
            maxLines: Infinity,
        };

        const extraEditorOptions = {
            enableBasicAutocompletion: true
        };
        const margedOptions = Object.assign(basicEditorOptions, extraEditorOptions);
        return margedOptions;
    }

    public getContent() {
        if (this.codeEditor) {
            const code = this.codeEditor.getValue();
            return code;
        }
    }

    public setContent(content: string): void {
        if (this.codeEditor) {
            this.codeEditor.setValue(content);
        }
    }

    public OnContentChange(callback: (content: string, delta: ace.Ace.Delta) => void): void {
        this.codeEditor.on('change', (delta) => {
            const content = this.codeEditor.getValue();
            callback(content, delta);
        });
    }

    public beautifyContent(): void {
        if (this.codeEditor && this.editorBeautify) {
            const session = this.codeEditor.getSession();
            this.editorBeautify.beautify(session);
        }
    }

}