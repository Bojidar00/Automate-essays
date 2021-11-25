# Automatic verificator of HTML and MD 

## Commit Naming Rules

```text
feat: Add beta sequence
^--^  ^---------------^
|     |
|     +-> Summary in present tense.
|
+-------> Type: chore, docs, feat, fix, refactor, style, or test.
```
## How to use

Create a folder inside /essays and give it a name.
After that every file in this folder will have to follow the convention:
"name - folder name"
After every push to the repository, Github actions will check commits, file names and validity of html and md files.

## Run localy

```bash
npm install
node main.js
```
