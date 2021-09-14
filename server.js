const inquirer = require('inquirer');

const mysql = require('mysql2');

// const db = require('employee_db')

// const fs = require("fs");

const PORT = process.env.PORT || 3001;
  
// Connect to database
const db = mysql.createConnection(
    {
      host: 'localhost',
      // Your MySQL username,
      user: 'root',
      // Your MySQL password
      password: 'root',
      database: 'employee_db'
    },
    console.log('Connected to the employee database.')
  );

 
  // inquirer stuff goes here // -------------------------- //

  // array of questions for user input*
 const managerPrompts = [
   {
      type: "input",
      name: "first_name",
      message: "Please enter the manager's first name.",
  },    

  {
    type: "input",
    name: "last_name",
    message: "Please enter the manager's last name.",
  },    
      
  {
      type: "list",
      name: "department_id",
      message: "Please enter the manager's department.",
      choices: [
        "executive",
        "sales",
        "research",
        "accounting",
        "devops",
        "compliance",
        "hr"
      ],
  },
      
  {
      type: "input",
      name: "employee(id)",
      message: "Please enter the manager's employee id.",
  },
      
  {
      type: "input",
      name: "roles_id",
      message: "Please enter the manager's role id.",
  }
  ]
    
  // end of question array //
  
  const employArray = [];
  
      
       const buildManager = () => {
       return inquirer.prompt(managerPrompts)
      .then((prompts) => {
          const manager = new Manager(prompts.first_name, prompts.last_name, prompts.department_id, prompts.employee(id), prompts.roles_id);
          employArray.push(manager);
          console.log(manager)
           // 
                  
      })  
  };
  
  const buildEmployee = () => {
      
      return inquirer.prompt ([
          {
             type: 'input',
             name: 'first_name',
             message: "Please enter the employee's first name", 
          },
      
          {
             type: 'input',
             name: 'last_name',
             message: "Please enter the employee's last name", 
          },
      
          {
              type: 'list',
              name: 'roles_id',
              message: "Please select their role",
              choices: ['accountexec', 'scientist', 'accountant', 'engineer', 'attorney', 'recruiter']
          },
           
          {
              type: 'input',
              name: 'manager_id',
              message: "Please enter their manager's ID (if unknown, enter 0).",
          },
  
          {
              type: 'confirm',
              name: 'buildEmployeeConfirm',
              message: 'Enter another employee?',
          }
      ])
      .then(userInput => {
          // Selects the data sets for each employee class
  
          let { first_name, last_name, roles_id, manager_id, buildEmployeeConfirm } = userInput; 
          let employee; 
  
          if (roles_id === "accountexec") {
              employee = new Engineer (first_name, last_name, roles_id, manager_id);
  
           } else if (roles_id === "scientist") {
              employee = new Intern (first_name, last_name, roles_id, manager_id);

           } else if (roles_id === "accountant") {
              employee = new Intern (first_name, last_name, roles_id, manager_id);  

           } else if (roles_id === "engineer") {
              employee = new Intern (first_name, last_name, roles_id, manager_id);  
              
           } else if (roles_id === "attorney") {
              employee = new Intern (first_name, last_name, roles_id, manager_id);   

           } else if (roles_id === "recruiter") {
              employee = new Intern (first_name, last_name, roles_id, manager_id);  
           }
          // pushes newly built employee to employArray
          employArray.push(employee); 
  
          if (buildEmployeeConfirm) {
              return buildEmployee(employArray); 
          } else {
              return employArray;
          }
      })
  
  };


  
  
  // If user chooses not to buildEmployee then data is pushed to DB 
  const sql = data => {
    const params = [req.params.id];
      fs.post('/employee/:id', data, err => {
            if (err) {
              console.log(err);
              return;
          } else {
              console.log('Updated database, result "OK"')
          }
      })
  }; 
  
  buildManager()
  // callback to execute when the Promise is resolved.
    .then(buildEmployee)
    .then(employArray => {
  // callback to execute when the Promise is rejected.      
      return renderDB(employArray);
    })
    .then(finalDB => {
   // Promise for the completion of which ever callback is executed     
      return updateDB(finalDB);
    })
    .catch(err => {
   console.log(err);
    });
  
 
 
 
 
  // --------------------------------------------------------- //
// pulled from the apiRoute files I deleted earlier

  // department routes //
//   const express = require('express');
// const app = express.app();
// const db = require('../../db/connection');

// GET all department //


  // end of role routes //

  generateDB = (data) => {

    profileArray = []; 

    for (let i = 0; i < data.length; i++) {
        const employee = data[i];
        const role = employee.getRole(); 

        if (roles === 'manager') {
            const managerProfile = createManager(employee);
            profileArray.push(employeesTable);
        }

        if (role === 'accountexec') {
            const engineerProfile = createEngineer(employee);
            profileArray.push(employeesTable);
        }

        if (role === 'scientist') {
            const internProfile = createIntern(employee);
            profileArray.push(employeesTable);
        }

        if (role === 'accountant') {
          const internProfile = createIntern(employee);
          profileArray.push(employeesTable);
        }

        if (role === 'engineer') {
          const internProfile = createIntern(employee);
          profileArray.push(employeesTable);
        }

        if (role === 'attorney') {
          const internProfile = createIntern(employee);
          profileArray.push(employeesTable);
        }
        
        if (role === 'recruiter') {
          const internProfile = createIntern(employee);
          profileArray.push(employeesTable);
        }
    }

    
    // Records in the array are joined so the data can be rendered in the DB
    const employeeRecords = profileArray.join('')

    const renderEmployees = renderEmployeesTable(employeeRecords); 
    return renderEmployees;

}

// creating the index file with all the teammembers' Records 
const renderDB = function (employeeRecords) {   


  
}
module.exports = app;