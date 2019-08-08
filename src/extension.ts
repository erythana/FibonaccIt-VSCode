import * as vscode from 'vscode';
import { isNumber, formatWithOptions } from 'util';

export function activate(context: vscode.ExtensionContext) {

    console.log('Successfully activated the extension "FibonaccIt"');
    let disposable = vscode.commands.registerCommand('extension.FibonaccIt', async () => {
        const editor = vscode.window.activeTextEditor;

        vscode.window.showInformationMessage('Running FibonaccIt-Formatter');

        //Change intendation to Spaces, preformat the text so we dont terminate spaces (indention-size would get smaller and smaller)
        await vscode.commands.executeCommand('editor.action.formatDocument');
        await vscode.commands.executeCommand('editor.action.indentationToSpaces');

        let text = editor!.document.getText();
        let indentsize_threetype: any = editor!.options.tabSize;
        // set identsize to 1 to prevent errors on interpreting this TS - will be rewritten anyway if return is an integer
        let indentsize: number = 1;
        if (isNumber(indentsize_threetype)) {
            indentsize = indentsize_threetype;
        }
        else {
            //should not happen anyway but better safe than sorry
            vscode.window.showInformationMessage('Error reading indentsize - return not an integer: ' + typeof (indentsize_threetype));
            deactivate();
        }

        let indentdepth: number = 0;
        let replaceText: string = "";
        let text_array: string[] = text.split("\n");
        let array_counter: number = 0;
        for (let line of text_array) {
            array_counter += 1;
            indentdepth = (line.length - (line.trimLeft().length)) / indentsize;
            let spacenumber = 0;
            if (indentdepth >= 2) {
                //Cheating a bit for better layout --> because the Fibonacci-Sequence for FN1 and FN2 would be the same value (1) we skip one (therefor increment by one)
                spacenumber = FibonaccIt(indentdepth + 1);
            }
            else {
                spacenumber = FibonaccIt(indentdepth);
            }

            //create the space-string for each line acording to the fibonacci-return
            let spaces: string = "";
            for (let i = spacenumber; i > 0; i--) {
                spaces += " ";
            }

            //append each line to the replace-text, including the spaces on front of the line - last line will get no linebreak
            if (array_counter === text_array.length) {
                replaceText += spaces + line.trimLeft();
            }
            else {
                replaceText += spaces + line.trimLeft() + "\n";
            }
        }
        //select everything in the document
        const fullRange = new vscode.Range(
            editor!.document.positionAt(0),
            editor!.document.positionAt(text.length)
        );
        //replace the selection by the replaced Text
        editor!.edit(builder => builder.replace(fullRange, replaceText));
    });

    //Reformat only works when an formatter for the language is installed in VSCode. Not my job
    let disposable2 = vscode.commands.registerCommand('extension.DisableFibonaccIt', async () => {
        vscode.window.showInformationMessage('Running FibonaccIt-Reformatter');
        await vscode.commands.executeCommand('editor.action.formatDocument');
    });
    context.subscriptions.push(disposable);
}
export function deactivate() { }

//Recursive function to return fibonacci-number
export function FibonaccIt(int_number: number) {
    if (int_number > 2) {
        int_number = FibonaccIt(int_number - 1) + FibonaccIt(int_number - 2);
    }
    else if (int_number > 0) {
        int_number = 1;
    }
    else {
        int_number = 0;
    }
    return int_number;
}