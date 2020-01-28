---
title: CLI Commands
description: Learn about the different CLI commands
keywords: Tools, CLI, commands
author: einari, woksin
aliases:
    - /tools/cli/commands/
    - /tools/cli/commands/check/
    - /tooling/cli/commands/check/
---

An overview of the dolittle cli commands.

Unlike most command line tools, @dolittle/cli is mostly decoupled from the commands and functionalities it can provide. It instead relies on the [Dolittle tooling platform](https://www.github.com/dolittle-tools/common) and plugins to provide the functionalities / commands. 

This mean that in of itself @dolittle/cli does not know about any commands that aren't strictly related to the CLI tool itself (like 'dolittle check').

### Check

To check the version of the dolittle cli tool simply run

```shell
$ dolittle check
```

If there's a greater version of the cli you will be prompted about whether you want to download it or not.
