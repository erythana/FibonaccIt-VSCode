import * as vscode from 'vscode';

export function activate(context: vscode.ExtensionContext) {

    console.log('Successfully activated the extension "FibonaccIt"');

    let disposable = vscode.commands.registerCommand('fibonaccit.FibonaccIt', async () => {
        const editor = vscode.window.activeTextEditor;

        vscode.window.showInformationMessage('Running FibonaccIt-Formatter');

        //Change intendation to Spaces, preformat the text so we dont terminate spaces (indention-size would get smaller and smaller)
        await vscode.commands.executeCommand('editor.action.formatDocument');
        await vscode.commands.executeCommand('editor.action.indentationToSpaces');

        
        if (!editor) {
            vscode.window.showErrorMessage('No active editor found');
			deactivate();
            return;
        }
		        
        let spaceIdentationCount: unknown = editor.options.tabSize;
        if (typeof spaceIdentationCount !== 'number' || spaceIdentationCount === 0) {
            vscode.window.showErrorMessage(`Invalid tab size: ${spaceIdentationCount}. Expecting a number.`);
            deactivate();
			return;
        }

		let eol = editor!.document.eol === vscode.EndOfLine.LF ? '\n' : '\r\n';
        let text: string = editor!.document.getText();
        let editorText: string[] = text.split(eol);
        let replaceLines: string[] = [];
        let indentDepth: number = 0;

        for (let i = 0; i < editorText.length; i++){
            let line = editorText[i];

            indentDepth = (line.length - (line.trimStart().length)) / spaceIdentationCount;
            let spaceCount = Number(fibonaccIt(indentDepth + 1)); // idc if someone uses so many identations that a cast to number overflows^^

            let spaces = " ".repeat(spaceCount);
			replaceLines.push(spaces + line.trimStart());
        }

        //select everything in the document
        const fullRange = new vscode.Range(
            editor!.document.positionAt(0),
            editor!.document.positionAt(text.length)
        );
        editor.edit(builder => builder.replace(fullRange, replaceLines.join(eol)));
    });

    //Reformat only works when an formatter for the language is installed in VSCode. Not my job
    let disposable2 = vscode.commands.registerCommand('fibonaccit.DisableFibonaccIt', async () => {
        vscode.window.showInformationMessage('Rerformatting document');
        await vscode.commands.executeCommand('editor.action.formatDocument');
    });
    context.subscriptions.push(disposable, disposable2);
}

export function deactivate(){}

function fibonaccIt(sequence: number): bigint {

    let fibonnaciNumber = 0n;

    if (sequence <= 1)
        fibonnaciNumber = 0n;
    else {
        let previousFib = 0n;
        let currentFib = 1n;

        for (let i = 2; i <= sequence; i++) {
    
            let tmp = previousFib;
            previousFib = currentFib;

            currentFib = previousFib + tmp;
        }
        fibonnaciNumber = currentFib;
    }

    return fibonnaciNumber;
}