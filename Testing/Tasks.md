Massive ATAC UI/UX testing
==========================

Antero Duarte - 04/04/2020

## Introduction

This document serves as a guide for testing M-ATAC, a platform for data annotation.

## Pre-requisite:

Access: [http://dev.verinote.net:8080/data-news.csv](http://dev.verinote.net:8080/data-news.csv) to download the CSV file used in this task.

## Task 1

### Task explanation

Software4Us is working on a service that associates a news article with topics based on its title. They are working for an existing client who owns a news website and already has news split into the following categories: Arts, Business, Politics, Science, Sports, Technology, World.

### Instructions

1. Open M-ATAC on [http://dev.verinote.net:8080/](http://dev.verinote.net:8080/)
2. Log in with the pin: 666666
3. Create a new project with the following details: 
	- Name: News Classification
	- Tags: `Arts`, `Business`, `Politics`, `Science`, `Sports`, `Technology`, `World`
4. Upload the file provided as a new dataset with the following details:
	- Name: News Headlines
	- Annotation Target: second column (news headlines)
5. Generate 5 new user pins
6. Write down one of the newly generated user pins to use for task 2.
7. Add the 5 users to the project
8. Select the type: `Text Classification: Multiple Class` for the project
9. Finish the project setup.
10. Logout

## Task 2

### Task explanation

We are going to log in as a regular user and annotate data items for 3 minutes in the News Classification project.

The annotation task is presented as follows:

You will get the news headlines, for which you have to select one or multiple categories from the list.

Select as many categories as you think apply to the headline and submit.

### Instructions

1. Open M-ATAC on [http://dev.verinote.net:8080/](http://dev.verinote.net:8080/)
2. Log in with the pin you wrote down from the previous task.
3. Find and open the project: News Classification
4. Annotate for 1 minute.
5. Annotate for 1 minute using your mouse only.
6. Annotate for 1 minute using the keyboard only.