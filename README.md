# Overview

Hello, this is a project of diet application created by student of AGH Cracov. This project was made with REST API Spring Boot and Angular frontend, focusing on communication between server and client and big amount of interactions that user can make, what it is not focusing on mostly is design (pure HTML and CSS) that was mostly made with AI as I am not a person who has a feeling of design and colors, but a person who is great in making things work as it should, like designing logic of entire application, data bases, relations, algorithms and object oriented programming. 

## BackEnd
Project has two parts, first one is BackEnd "B4WebAppBackEnd". It was made in Java, generated using REST API Java SpringBoot framework in Maven, and set up to store all the data needed by application to work, and also set up to communicate with requests from frontend by creating REST controllers all over the classes (tables) which are getting (or sending) some raw data, that is then (or earlier) prepared by services and saved (or ealier got from) directly to database. 

So it shares some basic 3-stage architecture for this kind of API. What database contains is users, products and recipes, and also sort of junction tables which hold the rellations (many to many) between those tables. Addicionally it also has classes that help application to work safely and provide some extra features ( The security, registration and email verification packages ). The security part is not finished yet as i do not have enough experience and knowledge about it yet but it will definitely change in the future. The diagram of database is down below, so everybody can look how it looks without scrolling the files:

<p align="center">
  <img width="600" height="500" alt="Database diagram" src="https://github.com/user-attachments/assets/f59cc216-d4af-4625-86a9-4c15f75c8d45" />
</p>

## FrontEnd
Second part is FrontEnd "B4WEbAppFrontEnd" which was made using framework Angular, so it is not just raw HTML and CSS but a live working and reacting web applications wrote in TypeScript that has constant communication to database provided by services on it's side and signal class variables. All the things seen on FrontEnd depends on componenets and routes between them so the app never really reloads but switch on components that user accually see, as it is a common feature and reason of using Angular in these kind of projects. Interactions with user are supported by clean and minimalistic design of app, a lot of buttons that directly lead user to some actions and also there are informations poping up as a notification, such as success of signing in.

## Pros and Cons
What i would not change / change in the profect so far? Let's start with strong side:
- Minimalistic and clean design
- Many features for user ( some will be added yet )
- Well made, clear database structure
- Well designed communication between client and server
- Potential to adding many new features and continue upgrading the application

What i would change:
- Security part overall, which is now made only for testing
- More clean services in backend, if it would be possible
- Token verificated requests (part of security)
- Home page which does not contain any usefull informations yet as the app is not live and running on internet yet
- Additional Exercises and Training section (planned but not yet added, it is added in other project in mobile app, that is up on github, so it will be similliar to that one)

# Bartłomiej Bubicz
