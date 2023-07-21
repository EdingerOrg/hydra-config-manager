// The module 'vscode' contains the VS Code extensibility API
// Import the module and reference it with the alias vscode in your code below
const vscode = require('vscode');

const path = require('path');
const fs = require("fs");
const jsYamlParser = require("js-yaml");

// This method is called when your extension is activated
// Your extension is activated the very first time the command is executed

/**
 * @param {string} yamlFilePath
 */
function getFileSearchPaths(yamlFilePath)
{

	const searchPath = [path.dirname(yamlFilePath)];

	const yamlFile = jsYamlParser.load(fs.readFileSync(yamlFilePath, "utf8"));
	console.log(yamlFile);

	if (yamlFile !== undefined)
	{
		if (yamlFile.hasOwnProperty("hydra"))
		{
			if (yamlFile.hasOwnProperty("hydra"))
			{
				for (let pathEntry of yamlFile["hydra"]["searchpath"])
				{
					searchPath.push(pathEntry);
				}
			}
		}
	}
	
	return searchPath;
}

/**
 * @param {vscode.ExtensionContext} context
 */

function activate(context) {
	let disposable = vscode.commands.registerCommand('hydra-config-manager.goToConfigFile', () => {
		// Check if the active text editor is a YAML file

		const fileName = vscode.window.activeTextEditor.document.fileName

		if (path.extname(fileName) == ".yaml" || path.extname(fileName) == ".yml")
		{
			console.log("yaml works");
		} else if (path.extname(fileName) == ".json") {
			vscode.window.showInformationMessage("TODO json support");
		}
		else {
			return;
		}

		const searchPath = getFileSearchPaths(fileName);

		console.log(searchPath);

		// const position = textEditor.selection.active;
		// const wordRange = textEditor.document.getWordRangeAtPosition(position);
		// if (!wordRange) {
		// 	return;
		// }

		// const word = textEditor.document.getText(wordRange);

		// const currentDir = path.dirname(textEditor.document.uri.fsPath);


		// // Get the line content at the current cursor position
		// const line = textEditor.document.lineAt(position.line).text;

		// try {

		// 	const regex = /-\s*(.*?):\s*(.*)/;
		// 	const match = line.match(regex);

		// 	let dir;
		// 	let file;

		// 	if (match && match.length === 3) {
		// 		dir = match[1].trim();
		// 		file = match[2].trim();
		// 	}

		// 	const filePath = path.join(currentDir, dir, file + '.yaml');

		// 	// Open the referenced file "a.yaml" if it exists
		// 	const fileUri = vscode.Uri.file(filePath);
		// 	const fileExists = await vscode.workspace.fs.stat(fileUri).then(
		// 	() => true,
		// 	() => false
		// 	);

		// 	if (fileExists) {
		// 		const doc = await vscode.workspace.openTextDocument(fileUri);
		// 		const positionInAYaml = doc.positionAt(0);
		// 		vscode.window.showTextDocument(doc, { selection: new vscode.Range(positionInAYaml, positionInAYaml) });
		// 	} else {
		// 		vscode.window.showErrorMessage('The referenced file does not exist.');
		// 	}

		// } catch (error) {
		// 	console.error(error);
		// }
	});

	context.subscriptions.push(disposable);
}

function deactivate() { }

module.exports = {
	activate,
	deactivate
}
