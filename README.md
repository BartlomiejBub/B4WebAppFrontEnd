# Overview

Hello, this is a project of diet application created by student of AGH University of Kraków. This project was made with Spring Boot REST API and Angular frontend, focusing on communication between server and client and big amount of interactions that user can make, what it is not focusing on mostly is design (pure HTML and CSS) that was mostly made with AI as I am not a person who has a feeling of design and colors, but a person who is great in making things work as it should, like designing logic of entire application, data bases, relations, algorithms and object oriented programming. 

## Tech stack
- **Backend:** Java 25, Spring Boot 4, Maven, Spring Data JPA (Hibernate), Spring Security, Spring Mail (JavaMailSender)
- **Database:** PostgreSQL
- **Frontend:** Angular 21, TypeScript, HTML, CSS

## Repositories
- **Backend:** [B4WebAppBackEnd](https://github.com/BartlomiejBub/B4WebAppBackEnd)
- **Frontend:** [B4WebAppFrontEnd](https://github.com/BartlomiejBub/B4WebAppFrontEnd)

## Backend
Project has two parts, first one is Backend "B4WebAppBackEnd". It was made in Java, generated with Spring Initializr using the Spring Boot framework and built with Maven, and set up to store all the data needed by application to work, and also set up to communicate with requests from frontend by giving each entity (table) its own REST controller, which is getting (or sending) some raw data, that is then (or earlier) prepared by services and saved (or earlier got from) directly to database. 

So it shares some basic three-layer architecture (controller → service → repository) for this kind of API. What database contains is users, products and recipes, and also sort of junction tables which hold the relations (many to many) between those tables. Additionally it also has packages that help application to work safely and provide some extra features ( The security, registration and email verification packages ). The security part is not finished yet as I do not have enough experience and knowledge about it yet but it will definitely change in the future. The diagram of database is down below, so everybody can look how it looks without scrolling the files:

<p align="center">
  <img width="600" alt="Database diagram" src="https://github.com/user-attachments/assets/f59cc216-d4af-4625-86a9-4c15f75c8d45" />
</p>

## Frontend
Second part is Frontend "B4WebAppFrontEnd" which was made using framework Angular, so it is not just raw HTML and CSS but a live working and reacting web application written in TypeScript that has constant communication with the backend REST API provided by HTTP services (using Angular's `HttpClient`) on its side and Angular signals. All the things seen on Frontend depends on components and routes between them, as it is a single-page application (SPA), so the app never really reloads but the Angular Router swaps components that user actually see, as it is a common feature and reason of using Angular in these kind of projects. Interactions with user are supported by clean and minimalistic design of app, a lot of buttons that directly lead user to some actions and also there are information popping up as a notification, such as success of signing in.

## How to run it
**Requirements:** JDK 25, Node.js with npm, PostgreSQL, and a local SMTP test server on port 1025 (for example [MailDev](https://github.com/maildev/maildev)) to receive verification emails.

1. Create a PostgreSQL database called `BazaDanychAplikacji` and set your database username and password in `src/main/resources/application.properties`.
2. Start the backend (tables are created automatically on first run):
   ```bash
   ./mvnw spring-boot:run
   ```
   The API runs on `http://localhost:8080`.
3. Start the frontend:
   ```bash
   npm install
   ng serve
   ```
   Then open `http://localhost:4200` in your browser.

## Pros and Cons
What I would not change / change in the project so far? Let's start with strong side:
- Minimalistic and clean design
- Many features for user ( some will be added yet )
- Well made, clear database structure
- Well designed communication between client and server
- Potential to adding many new features and continue upgrading the application

What I would change:
- Security part overall, which is now made only for testing
- More clean services in backend, if it would be possible
- Token-based authentication (e.g. JWT)
- Home page which does not contain any useful information yet as the app is not live and running on internet yet
- Additional Exercises and Training section (planned but not yet added, it is added in other project in mobile app, that is up on github, so it will be similar to that one)

# Bartłomiej Bubicz