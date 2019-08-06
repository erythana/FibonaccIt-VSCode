// The module 'vscode' contains the VS Code extensibility API
// Import the module and reference it with the alias vscode in your code below
import * as vscode from 'vscode';
import { isNumber } from 'util';
import { link } from 'fs';

const editor = vscode.window.activeTextEditor;

// this method is called when your extension is activated
// your extension is activated the very first time the command is executed
export function activate(context: vscode.ExtensionContext) {

	// Use the console to output diagnostic information (console.log) and errors (console.error)
	// This line of code will only be executed once when your extension is activated
	console.log('Successfully activated the extension "FibonaccIt"');

	// The command has been defined in the package.json file
	// Now provide the implementation of the command with registerCommand
	// The commandId parameter must match the command field in package.json
	let disposable = vscode.commands.registerCommand('extension.FibonaccIt', () => {
		// The code you place here will be executed every time your command is execute
		let text = editor!.document.getText();
		
		let indentsize_threetype : any =  editor!.options.tabSize;
		// set identsize to 1 to prevent errors on interpreting this TS - will be rewritten anyway if return is an integer
		let indentsize : number = 1;
		if (isNumber(indentsize_threetype)){
			indentsize = indentsize_threetype;
		}
		else if (indentsize_threetype === String){
			console.log("Error reading indentsize - return not an integer" + typeof(indentsize_threetype));
			deactivate();
		}
		else{
			console.log("Error reading indentsize - return not an integer:" + typeof(indentsize_threetype));
			deactivate();
		}
		let indentdepth : number = 0;
		let replaceText : string = "";

		//Todo: Need to check how to read the input line by line
		for (let line in text.split("\n")){
			console.log(line[0]);
			line = line.replace(" ","");
			indentdepth = (line.length - line.trimLeft.length) / indentsize;
			let spacenumber = 0;
			for (var i = indentdepth; i>=0; i-- ) {
				spacenumber += FibonaccIt(i);
			}
			let spaces : string = "";
			for (let i = spacenumber; i>=0; i--){
				spaces += " ";
			}

			replaceText += spaces + line.trimLeft + "\n";
		}
		const fullRange = new vscode.Range(
			editor!.document.positionAt(0),
			editor!.document.positionAt(text.length - 1)
		);
		
		//TODO: Write Text to window
		editor!.edit(builder => builder.replace(fullRange, replaceText));
	});

	let disposable2 = vscode.commands.registerCommand('extension.DisableFibonaccIt', () => {
		// The code you place here will be executed every time your command is executed

		// Display a message box to the user
		vscode.window.showInformationMessage('Goodbye World Test!');
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