# Blockchain Bootcamp - Level 3 - 2021: Essays

[![Commitizen friendly](https://img.shields.io/badge/commitizen-friendly-brightgreen.svg)](http://commitizen.github.io/cz-cli/)

## About the project

Automatic verificator of HTML and MD.

* Check for file name and format
* Validate HTML and MD files
* Automate git commit messages

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
"Name - folder name"
After every push to the repository, Github actions will check commits, file names and validity of html and md files.

## Run locally

```bash
npm install
npm test
```

## File name check

To check the name of files we use [node-dir](https://www.npmjs.com/package/node-dir).
It runs automatically before commit(locally) and after push(in github actions).
First the name of the folder is extracted.
Then the names of files are checked with regex.
file name convention:
"Name - folder name"

## HTML check

To check html we use [html-validator](https://www.npmjs.com/package/html-validator).
It runs automatically before commit(locally) and after push(in github actions).

## MD check

To check md we use [markdownlint](https://www.npmjs.com/package/markdownlint).
It runs automatically before commit(locally) and after push(in github actions).

## Commit validation

We use [commitizen](https://www.npmjs.com/package/commitizen) to impose the commit convention.
We also check the commit in github actions.

Add or stage files before committing

```sh
git add .
```

Then commit with:

```bash
npm run commit
```

You will see this menu. Follow the instructions and the commit message will be generated.
![commitizen](./commitizen.jpg)
