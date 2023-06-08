import mysql from 'mysql';
import inquirer from 'inquirer';

//securing & retrieving credentials
require('dotenv').config();
const username = process.env.DB_USERNAME;
const password = process.env.DB_PASSWORD;

// Create a connection pool
const pool = mysql.createPool({
  host: '127.0.0.1',
  port: 3306,
  user: 'DB_USERNAME',
  password: 'DB_PASSWORD',
  database: 'cmss',
});

// Function to add a department
function addDepartment() {
  inquirer
    .prompt([
      {
        name: 'name',
        type: 'input',
        message: 'Enter the department name:',
      },
    ])
    .then((answers) => {
      const { name } = answers;
      pool.query('INSERT INTO department (name) VALUES (?)', [name], (error) => {
        if (error) throw error;
        console.log('Department added successfully.');
        mainMenu();
      });
    });
}