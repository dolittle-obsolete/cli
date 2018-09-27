---
title: create
description: Learn about the different CLI commands
keywords: Tools
author: einari, woksin
---

The `create` command starts a process that creates, or sets up, the high-level structures like the application and the bounded context.

## Application
The command:
```shell
$ dolittle create application [ApplicationName]
```
simply creates an application.json at the current working directory and randomly sets the application id.


## Bounded Context

The command:
```shell
$ dolittle create boundedcontext [BoundedContextName]
```
must be used in a folder where an application.json file is present. It will then create a folder with the skeleton of a C# based dolittle bounded context with most of the things that you need to get started developing.
