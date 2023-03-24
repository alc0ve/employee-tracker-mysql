# Employee Tracker

## Description
This is an interface, or content management system (CMS) that allows non-developers to view and interact with information stored in databases. It is a command-line application from scratch to manage a company's employee database powered by Node.js, Inquirer, and MySQL. 

## Table of Contents

➤ [Installation](#installation)

➤ [Usage](#usage)

➤ [Technologies](#technologies)

➤ [Demo](#demo)

➤ [Screenshots](#screenshots)

➤ [License](#license)

➤ [Credits](#credits)

➤ [How to Contribute](#contribute)

## Installation

I. To run application:

    1. Clone repository down onto user local machine.

    2. Open project and verify project folder location through the terminal.

    3. Run 'npm install' in the command line interface to install necessary npm packages to utilize the application.

II. Make any edits on the backend before initializing:

    1. Log in to MySQL by using the command: mysql -u 'your username' -p
        *Note: When prompted to in the terminal, enter your password for mySQL

    2. Once user is in mySQL in terminal, use command: SHOW DATABASES;
        *Note: This will show all of your mySQL databases

    3. User will want to create an 'employees_db' database if user does not have that database in their mySQL using the command: CREATE employees_db; then USE employees.db; to use database for application

    4. While in mySQL, the user can edit the seeds.sql file to personalize the app instead of deleting the existing data whilst in the application

    5. Make sure user is using command: SOURCE db/schema.sql and SOURCE db/seeds.sql to ensure user is in correct folder (db) to grab the files, and update changes prior to running the application

## Usage

To utilize this application, follow the installation steps above. Once completed, open the terminal to start the application with command: node server
When the user is finished, select Quit option to end the running of the application.

## Technologies
Technologies used feature node.js, JavaScript, mySQL

npm packages used in this project:

- [inquirer](https://www.npmjs.com/package/inquirer)
- [mysql2](https://www.npmjs.com/package/mysql2)
- [console.table](https://www.npmjs.com/package/console.table)
- [colors: for aesthetics in terminal](https://www.npmjs.com/package/colors)
- [figlet: for the fancy employee manager logo in the beginning](https://www.npmjs.com/package/figlet)

## Demo

Video URL: 

## Screenshots

View all examples:
![View-all-emp-dept-roles-screenshot](https://user-images.githubusercontent.com/117237641/227391943-0c8e47ec-e0de-4589-8f7c-60b46e23794a.png)


## License

Currently, there is no license for this project.

## Credits 🏆

I'd like to thank my classmates (BJ Thompson and Blair Millet specifically), for teaching me cool things to do with inquirer, colors, and figlet. Also to save time with prompt questions and answers!

## Contribute

To contribute, please contact me!