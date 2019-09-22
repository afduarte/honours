Filtering Data will be filtered by levels of swear words:

Profanities
Profanities strict
Profanities very strict

Blacklists will be split further into likelyhood of fitting into classification categories:

Sexist
Racist
Homophobic
General

Crowdsourcing form

Try to not use google forms.

# 24-06 Re: Annotation Tool

Notes field in annotation

Session guidelines field
Confidence on annotation

Feedback (Is context useful)

4 Annotators

Active learning exploration/exploitation bias Epsilon greedy sampling

Query by committee/Uncertainty sample, bagging

50/50 chance of getting

# 01-07 Frontend Notes

[JS to read in n lines in a file](https://stackoverflow.com/questions/39479090/read-n-lines-of-a-big-text-file)

# 11-09 Lit review starts

Ines Montani on Prodigy FAQ (https://www.youtube.com/watch?v=tMAU3gLbKII)

Binary tasks are easier to process => give users option to split classification into multiple binary tasks
  [car, boat, train] becomes -> [car, not car], [boat, not boat], [train, not train]
  results can then be combined in multiple ways to optimise results

Noise removal model for pre-filtering before getting specific
  for final model predicting [car,boat,train], start with a model that predicts [vehicle, not vehicle]

Prodigy - training an insults classifier: https://www.youtube.com/watch?v=5di0KlKl0fE&list=PLBmcuObd5An56EbwRCtNWW9JnUckO7Xp-

Use [gpython](https://github.com/go-python/gpython) to provide a REPL for data conversion from the browser
 Possible alternative is [grumpy](https://github.com/grumpyhome/grumpy) which compiles python code to Go, making it faster for bigger datasets.
 perhaps give the 2 options?
 	gpython as REPL during upload and grumpy to go through the whole dataset once

# 22-09 Review of existing tools

### [Prodigy](https://prodi.gy/)

* Pros
	- No lock in (even though it is heavily geared towards use with spaCy)
	- Web based application
	- Provides built-in "recipes"
	- Upload data in multiple formats
	- Active learning component
	- Different annotation interfaces
		+ Plain text
		+ Named entities
		+ Part of speech tags
		+ Syntactic dependencies
		+ Labeled text or images
		+ Image bounding boxes
		+ Visual diff
		+ HTML
		+ Embeds
	- Multi tenant (multiple projects with one deployment)
	- Session history
	- Popular, meaning there is a big user base for recipe sharing 
* Cons
	- Not free, not open source
	- All projects that are not a built in "recipe" involve writing code
	- Heavily geared towards spaCy
	- Single user (no concept of annotator users)
	- No annotation metrics available


### [Docanno](https://github.com/chakki-works/doccano)

* Pros
	- Free, open source
	- Web-based application (self-hosted only)
	- User system (no permissions, all users are the same)
	- Simple UI for project creation and annotation
* Cons
	- Not extendable through code
	- No dataset transformation as part of process
	- No annotation metrics available

### [LOST](https://lost.training/)

* Pros
	- Free, open source
	- Web-based application
	- Extendable through code
	- Pipeline definition system
	- Hierarchical label definition
	- Simple UI for project creation and annotation
* Cons
	- No annotation metrics available

# 22-09 Massive A-TRAC Feature definition

## Main features

### Free and open source

Massive A-TRAC will always be free to use and the source code will be open.

### Simple user interface

Annotation is boring, user interface has to be simple, usable and have minimal friction to keep users engaged
(Include gamification elements? Badges for number of annotations, healthy competition through comparison with other users... etc)

### Multiple data in/out possibilities

Admins have to be able to import datasets in multiples formats and output annotation data as multiple formats.
Include industry standards and popular output formats that can be imported straight into popular model training frameworks

### Annotation metrics

Automatically and dynamically calculate and update annotation metrics such as compatibility index across users
Keep track of annotation metrics such as annotator speed, dataset progress.
Add properties to users to group on (example specialists vs non-specialists, age groups, nationality... etc)
There is also a possibility for annotators to communicate with the admins by submitting a not with every annotation

The more complex annotation metric system should allow researchers to collect data about annotation so research on the process of annotation can be done.

### Live-testing feature

Allow admins to test their project configuration as it is being created by putting an excerpt of the input data through the configuration as it will at runtime.
[Implementation detail]: Open live preview on a different tab, use local storage to share state across tabs.

### Fleshed out user system

Allow 2 types of users: Annotator, Admin.
Admin can create, edit, assign users to a project
Annotator can only annotate on projects they've been assigned to.

### Fully extensible through flexible API

Ability to create new data import types, new data export types, new storage plugins [Implementation detail]: Use Go's plugin system
Ability to create new renderable components to customise UI [Implementation detail]: Allow Vue.js single file component file uploads

### Smart suggestion system

During project creation, user will be presented with suggestions that while opinionated, are based on research and try to optimise the workflow.
Examples:

* Split classification task into multiple binary classifications
	- [car, boat, train] becomes -> [car, not car], [boat, not boat], [train, not train]
	- reduces cognitive load for the annotator, potentially increasing annotation speed
* Noise removal model for pre-filtering
	- for final model predicting [car,boat,train], start with a model that predicts [vehicle, not vehicle]
	- simplifies the task and allows users to reduce the size of a dataset by filtering noise. Allows for less specialised users
* Noise removal using blacklist
	- [car, boat, train] dataset is fed through list of car, boat and train models
	- [abusive, not-abusive] dataset is fed through list of profanity words
	- reduces the size of the initial dataset by making assumptions about the contents of the data
* Offer users a rough estimation of time per annotation based on the complexity of the job
	- Not sure if possible, have to find research about annotation and annotation times
	- If not possible, delay to a stage where sufficient usage data has been gathered to estimate times

## What it will not be

### All types of media

It will not be developed for all types of media, for example, video annotation will not be supported out of the box.
Users should be able to implement it through a combination of backend and frontend plugins, using the extension API.

# 22-09 Overall System Architecture overview

Whole project will be orchestrated using docker-compose, as every part is configured to run as a docker container.
Should always be started by a single command and configuration is all done through frontend.
Should follow the [Twelve-Factor App](https://12factor.net/) principles as closely as possible.

## Backend

Written in [Go](https://golang.org/) and exposed as a RESTful API (microservice) to the frontend. Uses Go's plugin system for Extending API and modern web-service practices. (Separation of concerns, SOLID principles,)

Will be composed of the following parts:

### Input/Processing

File upload and processing strategy. Initially will support csv, json.
Will offer JavaScript/Python REPL to process file before storage.
Will offer integration with smart suggestion system to optimise job.

### Storage

Will provide user with a choice of plugabble storage backend. Initially will support:

* SQLite (turns file upload into rows in a SQLite database)
	- Faster processing and easier to calculate metrics.
	- Better for bigger jobs, slightly more complex to configure
* Flat file storage (stores the byte seek positions for different entries)
	- Slower processing (has to iterate through file to retrieve examples to annotate), less configuration required
	- Simpler and acceptable for smaller jobs. Decreases complexity in the system by not storing the whole dataset in a database

* [Implementation detail]: Run multiple workers for each storage type

### Output

Exporting functionality of annotated dataset. Initially will support csv, json.

## Frontend

Written as a Single Page Web Application (SPA), using [Vue.js](https://vuejs.org/)
Employing modern web-application design techniques (State management with [VUEX](https://vuex.vuejs.org/), [Vue-router](https://router.vuejs.org/) for navigation)
Advanced users can create custom components loaded dynamically into the frontend to render the annotation interface. This can be used for use cases as simple as branding or to create complex annotation interfaces depending on the use case.

### Home (Lobby)

Where users can see projects they're included in and can navigate to other parts of the application.

### Workbench/Analytics (Mezzanine)

Where Admins can create and configure new projects, create new users, assign users to projects, access analytics about current running projects

### Annotation (Ground floor)

Where Annotators can annotate data related to the projects they're inserted in.