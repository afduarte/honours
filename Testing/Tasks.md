Matrac UI/UX testing
====================

Antero Duarte - 15/03/2020

## Introduction

This document serves as a guide for testing M-ATRAC, a platform for data annotation.

## Pre-requisite:

Access: [http://dev.verinote.net:8080/data.csv](http://dev.verinote.net:8080/data.csv) to download the CSV file used in this task.

## Task 1

### Task explanation

We are going to upload a dataset of Massive Attack songs and create an annotation project for 3 different Annotators.
The purpose of the annotation task is to label each song with the members of the band that wrote it.

### Instructions

1. Open M-ATRAC on [http://dev.verinote.net:8080/](http://dev.verinote.net:8080/)
2. Log in with the pin: 666666
3. Create a new project with the following details: 
	- Name: Massive Attack
	- Tags: `3D`, `Daddy G`, `Mushroom`
4. Upload the file provided as a new dataset with the following details:
	- Name: Songs list
	- Annotation Target: first column (song names)
	- Context Field: second column (album names and year)
5. Generate 3 new user pins
6. Write down one of the newly generated user pins to use for task 2.
7. Add the 3 users to the project
8. Select the type: `Text Classification: Multiple Class` for the project
9. Finish the project setup.
10. Logout

## Task 2

### Task explanation

We are going to log in as a regular user and annotate 15 data items in the Massive Attack Songs project.

The annotation task is presented as follows:

You will get names of songs for which you have to select which of the 3 original member of the band were involved in creating.

Your options are: 3D, Daddy G and Mushroom.

For context you will get the Name of the Album the song is featured in and the year the album was released in.

Hint: If you want to be accurate with the tagging, Mushroom left the band in 1999, prior to that, all songs were composed by all 3 members of the band.

### Instructions

1. Open M-ATRAC on [http://dev.verinote.net:8080/](http://dev.verinote.net:8080/)
2. Log in with the pin you wrote down from the previous task.
3. Find and open the project: Massive Attack Songs
4. Annotate 5 instances.
5. Annotate 5 instances using your mouse only.
6. Annotate 5 instances using the keyboard only.