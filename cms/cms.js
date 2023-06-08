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

// Function to view departments
function viewDepartments() {
  pool.query('SELECT * FROM department', (error, results) => {
    if (error) throw error;
    console.table(results);
    mainMenu();
  });
}

// Function to view roles
function viewRoles() {
  pool.query('SELECT * FROM role', (error, results) => {
    if (error) throw error;
    console.table(results);
    mainMenu();
  });
}

// Function to view employees
function viewEmployees() {
  pool.query('SELECT * FROM employee', (error, results) => {
    if (error) throw error;
    console.table(results);
    mainMenu();
  });
}

// Function to update employee roles
function updateEmployee() {
  inquirer
    .prompt([
      {
        name: 'employee_id',
        type: 'input',
        message: 'Enter the employee ID:',
      },
      {
        name: 'new_role_id',
        type: 'input',
        message: 'Enter the new role ID:',
      },
    ])
    .then((answers) => {
      const { employee_id, new_role_id } = answers;
      pool.query(
        'UPDATE employee SET role_id = ? WHERE id = ?',
        [new_role_id, employee_id],
        (error) => {
          if (error) throw error;
          console.log('Employee role updated successfully.');
          mainMenu();
        }
      );
    });
}