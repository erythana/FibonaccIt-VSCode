# fibonaccit README

This is the Readme for the FibonaccIt-VSCode extension.

# FibonaccIt

FibonaccIt is an Visual Studio Code Extension to apply an Fibonacci-Styled formatting to your code.
  - Applies Code to active Window
  - Reformats to (Visual Studio Code) Default-Settings, based on your language
  
![Sample layout after applying the code](TODO:Include Image)

# How to run the tool
When installing the Extension, there will be a new command on the right side of the files you opened in the editor.
From here you can either format your code or reformat it to Visual Studio Code Default.

  
# Changed Settings
When running the FibonaccIt Command:

TODO:Change Settings according to extension

| Setting | Value |
| ------ | ------ |
|  Options-->Text-Editor-->Basic-->Advanced-->"Pretty listing (reformatting) of code" | "Unchecked" |
|  Options-->Text-Edtior-->All Langauges-->Tabstops | "Insert Spaces"  |
  

When running the Reformatter Command:

| Setting | Value |
| ------ | ------ |
|  Options-->Text-Editor-->Basic-->Advanced-->"Pretty listing (reformatting) of code" | "Checked" |
|  Options-->Text-Edtior-->All Langauges-->Tabstops | "Keep Tabstops"  |


# ToDo
Implement handling of languages which require Indention, like Python

# Bugs/Features
  - If you use this tool on code which requires Indention, like Python, the code will get unusable (but pretty looking, though) - looking into handling this sort of things  
    The Reformatter won't work here! But you can revert (Ctrl+Z) these changes...