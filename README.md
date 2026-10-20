# B4Fit – diet & macro tracker (Spring Boot + Angular)

A full-stack web application for tracking eaten meals, calories and macros, with own products, recipes and daily goals.

<p align="center">
  <img width="800" alt="Screenshot 1 – add caption" src="https://github.com/user-attachments/assets/f22b72ee-8f5a-4274-a56e-150fcff40e66" />
</p>

# Overview

Hello, this is a full-stack diet application project created by a student of AGH University of Kraków. This project was made with Spring Boot REST API and Angular frontend, focusing on communication between server and client and a large number of interactions that the user can make. The UI (pure HTML and CSS) was built with AI assistance; my focus was backend architecture, database design, relations, algorithms, object-oriented programming and the logic of the entire application.

## What the app offers to the user
- Adding eaten products or recipes to the diary, so the calculator can add the macros up live
- Adding own products to the database
- Creating own recipes with a description that are also added to the database
- Setting own daily goals for macros, provided by the calculator or by hand

## Technical highlights
- Three-layer backend architecture (controller → service → repository) with a REST API for every entity
- Registration with email verification, and a scheduled job (`@Scheduled`) that deletes expired verification tokens
- Macros calculated from portion sizes and product weights
- Daily goals calculator based on the Mifflin-St Jeor formula
- Single-page application with Angular signals, route guards and toast notifications
- Two languages (Polish / English)
- Unit tests (Vitest), including tests of the calorie calculator algorithm

## Tech stack
- **Backend:** Java 25, Spring Boot 4, Maven, Spring Data JPA (Hibernate), Spring Security, Spring Mail (JavaMailSender)
- **Database:** PostgreSQL
- **Frontend:** Angular 21, TypeScript, HTML, CSS
- **Tests:** Vitest (frontend), JUnit 5 (backend)

## Repositories
- **Backend:** [B4WebAppBackEnd](https://github.com/BartlomiejBub/B4WebAppBackEnd)
- **Frontend:** [B4WebAppFrontEnd](https://github.com/BartlomiejBub/B4WebAppFrontEnd)
- **Mobile app (Android, Kotlin):** [B4FitMobile](https://github.com/BartlomiejBub/B4FitMobile)

## Backend
The project has two parts. The first one is the Backend "B4WebAppBackEnd". It was made in Java, generated with Spring Initializr using the Spring Boot framework and built with Maven, and set up to store all the data needed by the application to work, and also set up to communicate with requests from the frontend by giving each entity (table) its own REST controller, which is getting (or sending) some raw data, that is then (or earlier) prepared by services and saved (or earlier retrieved from) directly to the database.

So it follows a basic three-layer architecture (controller → service → repository) for this kind of API. The database contains users, products and recipes, and also junction tables which hold the relations (many to many) between those tables. Additionally it also has packages that help the application work safely and provide some extra features (the security, registration and email verification packages). The security part is currently basic, and token-based authentication (JWT) is planned.

The database diagram is below, so everybody can see how it looks without browsing the files:

<p align="center">
  <img width="600" alt="Database diagram" src="https://github.com/user-attachments/assets/f59cc216-d4af-4625-86a9-4c15f75c8d45" />
</p>

## Frontend
The second part is the Frontend "B4WebAppFrontEnd" which was made using the Angular framework, so it is not just raw HTML and CSS but a live working and reacting web application written in TypeScript that has constant communication with the backend REST API provided by HTTP services (using Angular's `HttpClient`) on its side and Angular signals. All the things seen on the Frontend depend on components and routes between them, as it is a single-page application (SPA), so the app never really reloads but the Angular Router swaps the components the user actually sees, as it is a common feature and reason for using Angular in this kind of project. Interactions with the user are supported by a clean and minimalistic design of the app, a lot of buttons that directly lead the user to some actions and also there is information popping up as a notification, such as success of signing in.

## How to run it (soon available through Docker!)
**Requirements:** JDK 25, Node.js with npm, PostgreSQL, and a local SMTP test server on port 1025 (for example [MailDev](https://github.com/maildev/maildev)) to receive verification emails.

1. Create a PostgreSQL database called `BazaDanychAplikacji`.
2. In the backend folder, copy `.env.example` to `.env` and set your database password in it. Passwords are never stored in the repository; `application.properties` reads them from `.env` or from environment variables.
3. Start the backend (tables are created automatically on first run):
   ```bash
   ./mvnw spring-boot:run
   ```
   The API runs on `http://localhost:8080`.
4. Start the frontend:
   ```bash
   npm install
   ng serve
   ```
   Then open `http://localhost:4200` in your browser.

## Strengths
- Minimalistic and clean design
- Many features for the user (more will be added)
- Clear database structure with junction tables for many-to-many relations
- Communication between client and server through a REST API for every entity
- Potential for adding many new features and continuing to upgrade the application

## Roadmap
- Token-based authentication (JWT) and a stronger security setup overall
- Cleaner services in the backend, where possible
- Running the whole project with Docker
- Home page with useful information, once the app is live on the internet
- Exercises and Training section, similar to the one in my [mobile app](https://github.com/BartlomiejBub/B4FitMobile)
- Adding photos to own recipes and products

## Screenshots

<table>
  <tr>
    <td><img width="400" alt="Screenshot 2 – add caption" src="https://github.com/user-attachments/assets/785e304d-34b6-42ea-b757-3b94612b5058" /></td>
    <td><img width="400" alt="Screenshot 3 – add caption" src="https://github.com/user-attachments/assets/8e4e094d-b050-453e-b366-abb126b4cf12" /></td>
  </tr>
  <tr>
    <td><img width="400" alt="Screenshot 4 – add caption" src="https://github.com/user-attachments/assets/ae748f5a-8b45-436f-8195-213dcde3ad44" /></td>
    <td><img width="400" alt="Screenshot 5 – add caption" src="https://github.com/user-attachments/assets/8c434e52-8c89-49df-b158-f62835722492" /></td>
  </tr>
  <tr>
    <td><img width="400" alt="Screenshot 6 – add caption" src="https://github.com/user-attachments/assets/ee87274f-6a78-49ca-8a75-5b0aad0f43b9" /></td>
    <td><img width="400" alt="Screenshot 7 – add caption" src="https://github.com/user-attachments/assets/9d94dc29-964b-4473-a0db-1ff12542d6fb" /></td>
  </tr>
  <tr>
    <td colspan="2" align="center"><img width="600" alt="Screenshot 8 – add caption" src="https://github.com/user-attachments/assets/760ecdea-6976-427e-a1f5-3d4588525444" /></td>
  </tr>
</table>

## Author
**Bartłomiej Bubicz** – student at AGH University of Kraków

- GitHub: [BartlomiejBub](https://github.com/BartlomiejBub)
<!-- - LinkedIn: add your profile link here -->
<!-- - Email: add your email here -->
