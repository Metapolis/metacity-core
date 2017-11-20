# Metacity Core #

Metacity core is a RESTful API to get data from stack data powered by Metapolis. 

### Features ###

Metacity Core provides a data access service linked to Metapolis’ Big Data platform. The latter is accesible through a Rest API whose documentation is here.


#### Security ####

Next release

#### Traceability ####

In order to monitor application metrics, Metacity Core provides exhaustive activity logs in the following format :
``` {date - ISO8601} {log-level} {class} {message} ```

Logs can be exported thanks to ```Winston``` library in a file or in an http stream.

### Architecture ###

Metacity Core provides a framework to develop object oriented Rest API resources with ease, from implementation to tests.

Metacity Core settled a NodeJS architecture that adheres to the OOP and SOLID principles. The architecture also benefits from previous experiences on other OOP languages.

To enforce this architecture, we used concepts like *dependancy injection* or *layer separation*, warranting project’s sustainability and modularity.

We used command/query development pattern in our services to trace data retrieval and data alteration in separate flows.
The application has been build upon 3 frameworks :

* Inversify for dependancy injection
* Express for Rest resources
* TypeORM for persistence layer

These frameworks fulfill our development standards regarding OOP principles.

### Test ###

Since we wanted to work on a 100% based OOP project, we decided to use Mocha-Typescript library for unit testing.

Each layer of the application is tested separately from each other, enforcing a similar layer separation to implementation.

We aim to maintain a 100% code coverage on the project, every contribution should be submitted with the same aim.

### Installation ###

*Reuirements* :

    NodeJS : ```8.1.2```

    npm : ```5.0.3```

*Installation command* :

    ```shell
    npm install 
    ```

*Build command* : 

    ```shell
    npm run build
    ```

*Run command* :

    ```shell
    npm start
    ```

#### 

### Contribution ###

* Repo owner or admin
* Other community or team contact

# Contributing to Metacity Core

We would love for you to contribute to Metacity Core and help make it even better than it is today! 
As a contributor, here are the guidelines we would like you to follow:

 - [Question or Problem?](#question)
 - [Issues and Bugs](#issue)
 - [Feature Requests](#feature)
 - [Submission Guidelines](#submit)

## Got a Question or Problem?

There are one way how you can ask your question:

* You can create issue on [github](lien github)

## Found a security vulnerability?

If you find a security vulnerability or something that should be discussed personally, 
please contact within mathieu.bayou[at]metapolis.fr.

## Found a Bug?

If you find a bug in the source code, you can help us by [submitting an issue](#submit-issue) to our 
[GitHub Repository](lien github). 
Even better, you can [submit a Pull Request](#submit-pr) with a fix.

## Missing a Feature?

You can *request* a new feature by [submitting an issue](#submit-issue) to our GitHub
Repository. If you would like to *implement* a new feature, please submit an issue with
a proposal for your work first, to be sure that we can use it.
Please consider what kind of change it is:

* For a **Major Feature**, first open an issue and outline your proposal so that it can be
discussed. This will also allow us to better coordinate our efforts, prevent duplication of work,
and help you to craft the change so that it is successfully accepted into the project.
* **Small Features** can be crafted and directly [submitted as a Pull Request](#submit-pr).

## Submission Guidelines

### Submitting an Issue

Before you submit an issue, please search the issue tracker, 
maybe an issue for your problem already exists and the discussion might inform you of workarounds readily available.

We want to fix all the issues as soon as possible, but before fixing a bug we need to reproduce and confirm it.
 In order to reproduce bugs we ask you to provide a minimal code snippet that shows a reproduction of the problem. 

You can file new issues by filling out our [new issue form](lien github).

### Submitting a Pull Request (PR)
Before you submit your Pull Request (PR) consider the following guidelines:

* Search [GitHub](lien github) for an open or closed PR
  that relates to your submission. You don't want to duplicate effort.
* Make your changes in a new git branch:

     ```shell
     git checkout -b my-fix-branch master
     ```

* Create your patch, **including appropriate test cases**. Without tests your PR will not be accepted.
* Follow our coding rules.
* Run the full Metacity Core test suite, and ensure that all tests pass.
* Commit your changes using a descriptive commit message

     ```shell
     git commit -a
     ```

* Push your branch to GitHub:

    ```shell
    git push origin my-fix-branch
    ```

* In GitHub, send a pull request to `metacity-core:master`.
* If we suggest changes then:
  * Make the required updates.
  * Re-run the Metacity Core test suites to ensure tests are still passing.
  * Rebase your branch and force push to your GitHub repository (this will update your Pull Request):

    ```shell
    git rebase master -i
    git push -f
    ```

That's it! Thank you for your contribution!

#### After your pull request is merged

After your pull request is merged, you can safely delete your branch and pull the changes
from the main (upstream) repository:

* Delete the remote branch on GitHub either through the GitHub web UI or your local shell as follows:

    ```shell
    git push origin --delete my-fix-branch
    ```

* Check out the master branch:

    ```shell
    git checkout master -f
    ```

* Delete the local branch:

    ```shell
    git branch -D my-fix-branch
    ```

* Update your master with the latest upstream version:

    ```shell
    git pull --ff upstream master
    ```