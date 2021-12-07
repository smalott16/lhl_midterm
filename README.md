## SCRATCH THAT (AUTOCATEGORIZING TODO LIST)
Scratch That is a multi-page to do list application using HTML, SCSS, JQuery on the front end and using Node and Express on the back-end.

## FINAL PRODUCT
Here are some examples of what "Scratch That" looks like. A user can add items to a to do list and the application will autocategorize their input into either eat, watch, read, or buy. A user is able to recategorize if done incorrectly. They can delete or complete items as well as priorize them.

<img alt="login page" width="400" src="https://github.com/smalott16/lhl_midterm/blob/master/docs/login.png?raw=true"> <img/>

<img alt="list home page" width="400" src="https://github.com/smalott16/lhl_midterm/blob/master/docs/list-home-page.png?raw=true"> <img/>

<img alt="category page" width="400" src="https://github.com/smalott16/lhl_midterm/blob/master/docs/category-page.png?raw=true"> <img/>


## Getting Started
1. Clone your copy of the repo to your dev machine
2. Create the `.env` by using `.env.example` as a reference: `cp .env.example .env`
3. Update the .env file with your correct local information 
  - username: `labber` 
  - password: `labber` 
  - database: `midterm`
4. Install dependencies: `npm i`
5. Fix to binaries for sass: `npm rebuild node-sass`
6. Reset database: `npm run db:reset`
  - Check the db folder to see what gets created and seeded in the SDB
8. Run the server: `npm run local`
  - Note: nodemon is used, so you should not have to restart your server
9. Visit `http://localhost:8080/`


## Dependencies
- Node 10.x or above
- NPM 5.x or above
- PG 6.x

- Axios
- Chalk
- Cookie-parser
- Dotenv
- Ejs
- Express
- Fast-xml-parser
- PG-native
- Request
- Request-promise-native
- Sass
- Wikijs
