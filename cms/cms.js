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

// Function to add a role
function addRole() {
  inquirer
    .prompt([
      {
        name: 'title',
        type: 'input',
        message: 'Enter the role title:',
      },
      {
        name: 'salary',
        type: 'input',
        message: 'Enter the role salary:',
      },
      {
        name: 'department_id',
        type: 'input',
        message: 'Enter the department ID:',
      },
    ])
    .then((answers) => {
      const { title, salary, department_id } = answers;
      pool.query(
        'INSERT INTO role (title, salary, department_id) VALUES (?, ?, ?)',
        [title, salary, department_id],
        (error) => {
          if (error) throw error;
          console.log('Role added successfully.');
          mainMenu();
        }
      );
    });
}

// Function to add an employee
function addEmployee() {
  inquirer
    .prompt([
      {
        name: 'first_name',
        type: 'input',
        message: 'Enter the employee first name:',
      },
      {
        name: 'last_name',
        type: 'input',
        message: 'Enter the employee last name:',
      },
      {
        name: 'role_id',
        type: 'input',
        message: 'Enter the role ID:',
      },
      {
        name: 'manager_id',
        type: 'input',
        message: 'Enter the manager ID (optional):',
      },
    ])
    .then((answers) => {
      const { first_name, last_name, role_id, manager_id } = answers;
      pool.query(
        'INSERT INTO employee (first_name, last_name, role_id, manager_id) VALUES (?, ?, ?, ?)',
        [first_name, last_name, role_id, manager_id],
        (error) => {
          if (error) throw error;
          console.log('Employee added successfully.');
          mainMenu();
        }
      );
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


// Function to update employee roles
function updateEmployeeRoles() {
  inquirer
    .prompt([
      {
        name: 'employee_id',
        type: 'input',
        message: 'Enter the employee ID:',
      },
      {
        name: 'role_id',
        type: 'input',
        message: 'Enter the new role ID:',
      },
    ])
    .then((answers) => {
      const { employee_id, role_id } = answers;
      pool.query(
        'UPDATE employee SET role_id = ? WHERE id = ?',
        [role_id, employee_id],
        (error) => {
          if (error) throw error;
          console.log('Employee role updated successfully.');
          mainMenu();
        }
      );
    });
}

// Main menu function
function mainMenu() {
  inquirer
    .prompt([
      {
        name: 'choice',
        type: 'list',
        message: 'Select an option:',
        choices: [
          'Add Department',
          'Add Role',
          'Add Employee',
          'View Departments',
          'View Roles',
          'View Employees',
          'Update Employee Roles',
          'Exit',
        ],
      },
    ])
    .then((answers) => {
      const { choice } = answers;

      switch (choice) {
        case 'Add Department':
          addDepartment();
          break;
        case 'Add Role':
          addRole();
          break;
        case 'Add Employee':
          addEmployee();
          break;
        case 'View Departments':
          viewDepartments();
          break;
        case 'View Roles':
          viewRoles();
          break;
        case 'View Employees':
          viewEmployees();
          break;
        case 'Update Employee':
          updateEmployee();
          break;
        case 'Update Employee Roles':
          updateEmployeeRoles();
          break;
        case 'Exit':
          console.log('Exiting CMS...');
          process.exit();
        default:
          console.log('Invalid choice. Please select again.');
          mainMenu();
      }
    });
}

// Call the mainMenu function to start the application
mainMenu();