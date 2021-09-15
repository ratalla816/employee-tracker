const inquirer = require('inquirer');

const mysql = require('mysql2');

const PORT = process.env.PORT || 3001;
  
// Connect to database
const db = mysql.createConnection(
    {
      host: 'localhost',
      // Your MySQL username,
      user: 'root',
      // Your MySQL password
      password: 'root',
      database: 'atalla_corp_db'
    },
    console.log('Welcome to the Atalla Corporation Employee Database.')
    
  );

 
  
  // begin inquirer questions //
 const beginPrompts = () => {
   inquirer.prompt ([
   {
      type: "list",
      name: "start",
      message: "Please select an option.",
      choices: 
      [
          'view departments',
          'view a specific department',
          'add a department',
          'delete a department',
          'view existing employee roles',
          'view a specific employee role',
          'add a new employee role',
          'delete an employee role',
          'view all employees',
          'view a specific employee',
          'add a new employee',
          'delete an employee',
          'view / edit managers',
          'exit program',
      ]
  }    
  
]) 
  
}
    // end of question array //      
   
    .then((userInput) => {
       return inquirer.prompt(inquirerPrompts)
                         
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
  
 
 
 
 
 

// GET all department //


  // end of role routes //

  
    
   





  
}
module.exports = app;