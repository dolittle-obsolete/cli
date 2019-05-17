---
title: Developing
description: Learn how to work on the CLI tool
keywords: Tools
author: einari, woksin
---

In order to be able to [extend](../extending) the CLI tool with new capabilities, its vital to know how to get it all running.

## Building

```shell
$ git clone https://github.com/dolittle-platform/cli.git
$ cd cli/Source
$ npm install
$ npm link
```

## Adding a sub command

Add a file for the command in the right place. This file will be a node "binary".
On top of the new JavaScript file add the following:

```shell
#!/usr/bin/env node
```

Then you need to change the files attributes so that it is an executable:

```shell
$ chmod +x <file>
```

To hook this up, the [args](https://www.npmjs.com/package/args) node package is looking by convention from the commands being setup.


So for instance the following command:

```javascript
let args = require("args");

args
  .command("create", "Create a Dolittle artifact");
```

will map to a node "binary" called `dolittle-create`.
This is configured in the `packages.json` file:

```json
{
    "bin": {
        "dolittle-create": "dolittle-create.js"
    }
}
```
{{% notice info %}}
By convention, the [args](https://www.npmjs.com/package/args) package used that handles all the commands and sub-commands is looking
for everything to be in the same place as the root tool itself. That means you can't have sub-commands in sub folders. The JS files even
has to follow the convention expected and be named as the expected binary; e.g. `dolittle-create.js`.
{{% /notice %}}

When you've got all this setup, you simply build the it with `npm run-script build` and then run `npm link` to get it linked.
This will create a symbolic link for the tool that is very handy when developing.

Then you run `npm install` to update the cli tool locally and then you're ready to go!