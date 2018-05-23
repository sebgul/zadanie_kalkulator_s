# Contract Calculator

Contract Calculator is an app prepared for recruitment process in Sonalake.

## About

Contract Calculator performs net pay calculation for contractor.
User has to specify the country and daily salary. Currency is selected based on chosen country. The result is the net pay in Polish złotys.
For each country user can create metadata containing information about income tax rate, fixed costs of work and number of working days in month.
Data about countries and calculations is persisted.

## Manual

Code for the application is available on GitHub:<br>
https://github.com/sebgul/zadanie_kalkulator_s<br>
Application requires Java Development Kit 8 installation in the OS and a web browser. Environment variable *JAVA_HOME* must be present in the OS. Maven installation is not required (project contains Maven wrapper - **mvnw**).
To run the app we execute the command (on root project level):<br>
`mvnw.cmd spring-boot:run`<br>
for Windows or<br>
`./mvnw spring-boot:run`<br>
for *nix systems.<br>
The app will be available at *localhost:8080* which we can open in a web browser.

## Technical details

Contract Calculator was developed in Spring Boot and Angular.
The main project (Spring Boot) contains subproject **contract-calculator-ui** for user interface (Angular).<br>
Both projects were developed separately but they are part of one repository. The backend consists of an API which is queried by the frontend part.

### The data

Contract Calculator uses public APIs for acquiring the data. For country and currency data it uses
https://restcountries.eu/ API. To obtain exchange rates for currencies it uses the National Bank of Poland API
http://api.nbp.pl/#kursyWalut<br>

### Running two projects

Projects can be run separately. To run contract-calculator-ui we use node.js server **server.js** (in **contract-calculator-ui**) which will be available at *localhost:4200* (node.js installation is required, as well as dependencies from *package.json*):<br>
`node server.js`<br>
 We run the backend part using **mvnw** (in root project):<br>
 `mvnw.cmd spring-boot:run`<br>
 for Windows or<br>
 `./mvnw spring-boot:run`<br>
 for *nix systems.<br>

### Running as one instance

Project is also configured to run as one instance, in this case Tomcat serves the static content which is the build of Angular app.
The current build can be prepared and uploaded into the root project using the script **ng-prod.sh** in **contract-calculator-ui** project.
To run the app we issue the command:<br>
 `mvnw.cmd spring-boot:run`<br>
 on Windows or<br>
 `./mvnw spring-boot:run`<br>
 for *nix systems.<br>
 
### Issues

Occasionally the National Bank of Poland API response contains *Access-Control-Allow-Origin* response header. Page reload is necessary to connect to the API.
