import * as vscode from 'vscode';
import { isNumber, formatWithOptions } from 'util';
import * as lint from 'tslint';


const editor = vscode.window.activeTextEditor;
//TODO: Find a way to reformat the text (before getting the content) and disable the "tab-indent" to use spaces instead

export function activate(context: vscode.ExtensionContext) {

    console.log('Successfully activated the extension "FibonaccIt"');

    let disposable = vscode.commands.registerCommand('extension.FibonaccIt', () => {

        //Change intendation to Spaces
        vscode.commands.executeCommand('editor.action.indentationToSpaces');

        let text = editor!.document.getText();
        let indentsize_threetype : any =  editor!.options.tabSize;
        // set identsize to 1 to prevent errors on interpreting this TS - will be rewritten anyway if return is an integer
        let indentsize : number = 1;
        if (isNumber(indentsize_threetype)){
            indentsize = indentsize_threetype;
        }
        else{
            console.log("Error reading indentsize - return not an integer:" + typeof(indentsize_threetype));
            deactivate();
        }
        let indentdepth : number = 0;
        let replaceText : string = "";
        let text_array : string[] = text.split("\r\n");
        let array_counter : number = 0;
        for (let line of text_array){
            array_counter += 1;

            indentdepth = (line.length - (line.trimLeft().length)) / indentsize;
            let spacenumber = 0;
            for (var i = indentdepth; i>0; i--) {
                spacenumber += FibonaccIt(i);
            }
            let spaces : string = "";
            for (let i = spacenumber; i>0; i--){
                spaces += " ";
            }
            if (array_counter === text_array.length){
                replaceText += spaces + line.trimLeft();
            }
            else{
                replaceText += spaces + line.trimLeft() + "\r\n";
            }
        }
        const fullRange = new vscode.Range(
            editor!.document.positionAt(0),
            editor!.document.positionAt(text.length)
        );
        
        editor!.edit(builder => builder.replace(fullRange, replaceText));
    });

    let disposable2 = vscode.commands.registerCommand('extension.DisableFibonaccIt', () => {
        vscode.commands.executeCommand('editor.action.formatDocument');
    });

    context.subscriptions.push(disposable);
}
// this method is called when your extension is deactivated
export function deactivate() {}


export function FibonaccIt(int_number: number){
    if (int_number > 2)
    {
        int_number = FibonaccIt(int_number - 1) + FibonaccIt(int_number - 2);
    }
    else if (int_number > 0)
    {
        int_number = 1;
    }
    else
    {
        int_number = 0;
    }
    return int_number;
}