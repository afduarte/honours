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

* Binary tasks are easier to process => give users option to split classification into multiple binary tasks
	- [car, boat, train] becomes -> [car, not car], [boat, not boat], [train, not train]
	- results can then be combined in multiple ways to optimise results

* Noise removal model for pre-filtering before getting specific
	- for final model predicting [car,boat,train], start with a model that predicts [vehicle, not vehicle]

Prodigy - training an insults classifier: https://www.youtube.com/watch?v=5di0KlKl0fE&list=PLBmcuObd5An56EbwRCtNWW9JnUckO7Xp-

* Use [gpython](https://github.com/go-python/gpython) to provide a REPL for data conversion from the browser
	- Possible alternative is [grumpy](https://github.com/grumpyhome/grumpy) which compiles python code to Go, making it faster for bigger datasets.
	- perhaps give the 2 options?
		+ gpython as REPL during upload and grumpy to go through the whole dataset once

# 22-09 Review of existing [tools](https://www.datasetlist.com/tools/)

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

### Earlier tools: [MMAX2](http://mmax2.net/), [MAE](https://github.com/keighrim/mae-annotation)
* Pros
	- Free, open source
	- Lay down the research foundations for later work
	- Make no assumptions about the data
* Cons
	- Are mostly geared to annotation of data for problems that are not so commonly needed today (because there are now open comprehensive annotated datasets for most of these problems)
		+ Part-of-speech tagging
		+ General Named Entity Recognition (People, Places, Organisations)
	- Desktop applications that involve the annotator installing something on their computer.
	- Interfaces are terrible when compared to newer systems
	- Overly complex over-engineered tools that tried to solve every problem
	- Offer no real-time collaboration facilities

# 22-09 Massive A-TRAC Feature definition

## Motivation

There are a lot of tools but they seem to be created alongside models or frameworks, which means there is no interoperability/standard. (e.g: YOLO BBox Annotation Tool, created for YOLO and then extended, Prodigy created for spaCy, then extended)

This project aims to create a tool that is both extendable all the way and makes no assumptions about the input data/output formats.

Due to time constraints, the project will not be a one-size-fits-all tool, but rather will document how to extend it to fit new systems as they appear and/or systems that have not been considered during implementation.

The design of this tool will also focus on the UI/UX aspect, trying to provide an interface that is usable at its core and focuses on minimising friction for the annotators (even if that means more configuration for the admin).

The system will also focus on gathering data for research on the process of annotating data, so patterns can emerge to both design better tools but also confirm or deny assumptions that are made by annotation tool designers.

M.A-TRAC will be a multi-tenant, multi-user application and will provide useful tools that make use of the collected meta-data from annotators, and not just the annotation data generated within the system.

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

Automatically and dynamically calculate and update annotation metrics such as compatibility index across users.

Keep track of annotation metrics such as annotator speed, dataset progress.

Add properties to users to group on (example specialists vs non-specialists, age groups, nationality... etc)

There is also a possibility for annotators to communicate with the admins by submitting a not with every annotation

The more complex annotation metric system should allow researchers to collect data about annotation so research on the process of annotation can be done.

### Live-testing feature

Allow admins to test their project configuration as it is being created by putting an excerpt of the input data through the configuration as it will at runtime.

{Implementation detail}: Open live preview on a different tab, use local storage to share state across tabs.

### Fleshed out user system

Allow 2 types of users: Annotator, Admin.

Admin can create, edit, assign users to a project

Annotator can only annotate on projects they've been assigned to.

### Fully extensible through flexible API

Ability to create new data import types, new data export types, new storage plugins

{Implementation detail}: Use Go's plugin system

Ability to create new renderable components to customise UI {Implementation detail}: Allow Vue.js single file component file uploads

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

{Implementation detail}: Run multiple workers for each storage type

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

# 23-09 Meeting

Deadline Week 9:

## Intro

Fleshed out description of project, aims, motivation...

## Literature review

Academic and technical literature review of project.

Technical should focus on existing tools and compare to the tool being built, highlighting how the new tool solves shortcomings of existing tools.

Academic should focus on existing literature on the academic side of the project, namely Active Learning and how the tool intends to solve existing problems.

## Project plan

Should detail breakdown of work for the implementation stage of the project. Gannt chart

Annotation research on efficiency.
Active learning

Skype: dimitra.gkatzia 07/10 9AM

# 23-09 Lit review notes

* Natural Language Annotation for Machine Learning (Pustejovsky and Stubbs, 2012)
	- Useful information about corpus creation
	- Nice [set of slides](https://www.cs.brandeis.edu/~cs140b/CS140b_slides/NLAML_CS140b-2015.pdf) with key takeaways (not detailed enough but a good start)
* Handbook of Linguistic Annotation (Ide and Pustejovsky, 2017)
	- More recent take by Pustejovsky
* Collaborative Annotation for Reliable Natural Language Processing (Karën Fort, 2016)
	- Available at [O'Reilly's Safari](https://learning.oreilly.com/library/view/collaborative-annotation-for/9781848219045/cover.xhtml)
* International Standard for a Linguistic Annotation Framework (Ide and Romary)
	- Available [here](https://arxiv.org/pdf/0707.3269.pdf)
	- Uses RDF as a means of standardisation of annotation data

# 30-09 Lit review concept matrix

(Concept matrix extracted to [notion.so](https://www.notion.so/afduarte/Honours-concept-matrix-4168cfce47a9444991bcd504864c2fee))

## Notes

Gamification based on (Bartle, 1996), an annotation system should have all their "players" classified as Achievers, meaning the gamification aspects should emphasize ACTING on the WORLD.
In this context ACTING is annotating and the world is the annotation task. Therefore the following reccomendations are taken on board:

Ways to emphasise WORLD over PLAYERS: 
* have only basic communication facilities
	- Notes system on annotation is 1 way, only admins can ever see notes
* have few ways that players can do things to other players
	- There are no interactions between annotators
* make building facilities easy and intuitive
	- The user interface aspect. Reduce friction from the annotation process

Ways to emphasise ACTING over INTERACTING: 
provide a game manual
* include auto-map facilities (in some MUDS there was a mini-map of the game area)
	- In this context can mean showing the annotator all the achievements that are available to earn
* include auto-log facilities (recording of every action)
	- system does this by default, but the takeaway here is a history so the user knows what they've done.
	- time tracking (with idle prevention). This gives the admins an idea of how much time someone spent on annotating
	- {Implementation detail: idle-js in combination with server-side tracking of onActive/onIdle events}
* raise the rewards for achievement
	- Include badges earned for specific achievements
	- Badge system that shows admins the annotator's badges (makes it more likely that the admin will recruit the same annotator for another project, meaning the financial reward increases for the annotator)

# 7-10 Skype meeting

Submitted IPO
Been focusing on lit review
Have concept matrix
Been gathering papers, have not read all of them yet
  - PAL and papers referenced there


# 7-10 Research

## Active Learning

### From Pustojevsky & Stubbs

Active learning is a kind of supervised learning where the learner can query the user to
obtain information about the labeling of a sample that it is trying to identify. That is,
the learning algorithm itself is able to choose the data from which it is learning, posing
a query to a human annotator about an unlabeled instance

Strategies:

* Uncertainty sampling
	- Using this strategy, the learner selects the object for which he is least sure of the correct categorization to present to the user.
* Query-by-committee
	- Here, the “committee” is a set of models using different hypotheses about the data that get to “vote” on what is queried next by determining what parts of the corpus they disagree on the most.
* Expected model change
	- This strategy selects the query that would most affect the current algorithm if the label for the query was known; that is, the query that will add the most information to the model (as best as can be determined beforehand).
* Expected error reduction
	- This is similar to the preceding strategy, but this method selects the query that it deems will lead to the greatest reduction in the amount of error being generated by the learner. However, expected error reduction is usually very expensive (computationally) to calculate.
* Variance reduction
	- Rather than trying to reduce the amount of error, this method tries to reduce the amount of noise in the model.
* Density-weighted methods
	- These strategies use the idea of choosing the data that is most representative (feature-wise) of the rest of the pool, using the assumption that learning more about the features that most of the data shares will more quickly allow all the data to be classified.
