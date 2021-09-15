const inquirer = require('inquirer');

const mysql = require('mysql2');

const PORT = process.env.PORT || 3001;

// Connect to database
const connection = mysql.createConnection(
  {
    host: 'localhost',
    // Your MySQL username,
    user: 'root',
    // Your MySQL password
    password: 'root',
    database: 'atalla_corp_db'
  }
  
);

  // https://www.tabnine.com/code/javascript/functions/mysql/Connection/threadId //
  connection.connect(function(err) {
    if (err) {
     console.error('error connecting: ' + err.stack);
     return;
    }
    console.log('connected as id ' + connection.threadId);
    initiateApp();
  });

  initiateApp = () => {
    console.log('Welcome to the Atalla Corporation Employee Database')
    beginPrompts();
  };  

// begin inquirer questions - start menu //
const beginPrompts = () => {
  inquirer.prompt([
    {
      type: 'list',
      name: 'start menu',
      message: 'Please select an option.',
      choices:
        [
          'view departments',
          'view existing employee roles',
          'view all employees',
          'add a department',
          'add a new employee role',
          'add a new employee',
          'view / edit employees',
          'view / edit managers',
          'delete a department',
          'delete an employee role',
          'delete an employee',
          'exit program'
        ]
    }
 ])
    // end start menu //      

 .then((userInput) => {
    const {choices} = userInput;

    if (choices === 'view departments') {
       describeDepartments();

    } 
      if (choices === 'view existing employee roles') {
      describeRoles();

    }  
      if (choices === 'view all employees') {
      describeEmployees();

    }  
      if (choices === 'add a department') {
      addDepartment();

    } 
      if (choices === 'add a new employee role') {
      addRoles();

    } 
      if (choices === 'add a new employee') {
      addEmployee();

    } 
     if (choices === 'view / edit employees') {
      editEmployees();

    } 
      if (choices === 'view / edit managers') {
      editManager();

    } 
      if (choices === 'delete a department') {
      deleteDepartment();

    } 
      if (choices === 'delete an employee role') {
      deleteRoles();

    } 
      if (choices === 'delete an employee') {
      deleteEmployee();

    } 
      if (choices === 'exit program') {
      // Closing the connection is done using end() which makes sure all remaining queries are executed before sending a quit packet to the mysql server.
      // https://stackoverflow.com/questions/20692989/node-mysql-where-does-connection-end-go
      connection.end()
    };
      
    })
  }
    
    
//   describeDepartments = () => {
//     console.log('Displaying departments');
//      const sql = `SELECT * FROM department`;
//      db.query(sql, (err, rows) => {
//       if (err) throw err;
//     console.table(results);
//     beginPrompts();
//   });
// }; 

//   describeRoles = () => {
//     console.log('Displaying current roles');
//     const sql = `SELECT * FROM roles ORDER BY roles.id`;
//     db.query(sql, (err, rows) => {
//       if (err) throw err;
//     console.table(results);
//     beginPrompts();
//   });
//  };

//   describeEmployees = () => {
//     console.log('Displaying active employees');
//     const sql = `SELECT employees.*, department.name 
//              AS department_name 
//              FROM employees 
//              LEFT JOIN department 
//              ON employees.department_id = department.id`;
//     db.query(sql, (err, rows) => {
//        if (err) throw err;
//     console.table(results);
//     beginPrompts();
//   }); 
//  };

//   addDepartment = () => {
//     inquirer.prompt([
//       {
//         type: 'input',
//         name: 'newDepartment',
//         message: 'Please enter department name',
//       }
//     ])
//   .then(userInput => {
//       const sql = `INSERT INTO department (name) VALUES (?)`;               
//        db.query(sql, userInput.newDepartment, (err, results) => {
//        if (err) throw err;
//         console.log('department added')
//         console.table(results);
//      }); 
//    });
//   };
  
//   addRoles = () => {
//     inquirer.prompt([
//       {
//         type: 'input',
//         name: 'newRole',
//         message: 'Please enter title',
//       },
//       {
//         type: 'input',
//         name: 'salary',
//         message: 'Please enter annual salary',
//       }
//     ]) 

//       .then(userInput => {
//       const params = [userInput.newRole, userInput.salary];
//       const sql =  `SELECT name, id FROM department`;       
      
//       connection.promise().query(sql, (err, data) => {
//           if (err) throw err; 
//       const department = data.map(({name, id}) => ({name: name, value: id}));
//       inquirer.prompt([
//         {
//           type: 'list',
//           name: 'department',
//           message: 'Which department number does this role fall under?',
//           choices: [
//             "executive",
//             "sales",
//             "research",
//             "accounting",
//             "devops",
//             "compliance",
//             "hr"
//           ]
//         }
//       ])

//       .then(Selectdepartment => {
//         const department = selectDepartment.department;
//         params.push(department);
       
//         const sql = `INSERT INTO roles (title, salary, department_id) VALUES (?,?,?)`;               
//          db.query(sql, userInput.newRole, (err, results) => {
//          if (err) throw err;
//           console.log('role added');
//           console.table(results)
//       }); 
//     });
//  });

//   addEmployee = () => {
//     inquirer.prompt([
//       {
//         type: 'input',
//         name: 'firstName',
//         message: "Please enter employee's first name.",
//       },  
//       {
//         type: 'input',
//         name: 'lastName',
//         message: "Please enter employee's last name.",
//       }
//      ])

//       .then(userInput => {
//         const params = [userInput.firstName, userInput.lastName];
//         const sql =  `SELECT roles.id, roles.title FROM roles`;       
        
//         connection.promise().query(sql, (err, data) => {
//             if (err) throw err; 
//         const roles = data.map(({id, title}) => ({name: title, value: id}));
//         inquirer.prompt([
//           {
//             type: 'list',
//             name: 'roles',
//             message: "What is the employee's title please?",
//             choices: [roles]
//           }
//         ])
  
//         .then(selectRoles => {
//           const roles = selectRoles.roles;
//           params.push(roles);
         
//           const sql = `INSERT INTO employees (first_name, last_name, roles_id) VALUES (?,?,?)`;               
//            db.query(sql, userInput.newRole, (err, results) => {
//            if (err) throw err;
//             console.log('new employee added');
//             console.table(results)
//         }); 
//       });
//     });
//   });
  



//     editEmployees = () => {
//       const sql = `SELECT * FROM employees`;

//       connection.promise().query(sql, (err, rows) => {
//         if (err) throw err;
//       const employees = data.map(({id, first_name, last_name}) => ({name: first_name + "" + last_name, value:id}));
//       inquirer.prompt([
//         {
//           type: 'list',
//           name: 'employeeName',
//           message: 'Which employee do you want to edit?',
//           choices: [employees]
//         }
//       ])  
 
//     .then(selectEmployee => {
//       const employee = selectEmployee.employeeName;
//       const params = [req.params.id]
//       params.push(employee);

//       const sql = `SELECT * FROM roles`;
//       connection.promise().query(sql, (err, data) => {
//         if (err) throw err;
//       const roles = data.map(({id, title}) => ({name: title, value: id}));
//       inquirer.prompt([
//         {
//           type: 'list',
//           name: 'title',
//           message: "Please enter employee's new title",
//           choices: [roles]
//         }
//       ])

//       .then(roleSelect => {
//         const title = roleSelect.role;
//         params.push(title);

//         const sql = `UPDATE employees SET role_id = ? WHERE id = ?`;
//         const params = [req.params.id];
//         db.query(sql, userInput.editEmployee, (err, results) => {
//           if (err) throw err;
//            console.log('Employee records updated');
//            console.table(results)
//         }); 
//       });
//     }); 
//   });  

beginPrompts(); 



  
  

  // editManager () => {
  //    console.log('something goes here');
  //    // inquirer.prompt, const, (err), err, query, ETC.. //
  //    console.table(results);
  //    beginPrompts();
  // }

  // editEmployees () => {
  //   console.log('something goes here');
  //    // inquirer.prompt, const, (err), err, query, ETC.. //
  //   console.table(results);
  //   beginPrompts();

  // }

  // deleteDepartment () => {
  //   console.log('something goes here');
  //   // inquirer.prompt, const, (err), err, query, ETC.. //
  //   console.table(results);
  //   beginPrompts();

  // }

  // deleteRole () => {
  //   console.log('something goes here');
  //   // inquirer.prompt, const, (err), err, query, ETC.. //
  //   console.table(results);
  //   beginPrompts();

  // }

  // deleteEmployee () => {
  //   console.log('something goes here');
  //   // inquirer.prompt, const, (err), err, query, ETC.. //
  //   console.table(results);
  //   beginPrompts
  // }

  
    



           // .then(choices => {
        //     // Selects the data sets for each employee class

        //     let { first_name, last_name, roles_id, manager_id, buildEmployeeConfirm } = choices; 
        //     let employee; 

        //     if (roles_id === "accountexec") {
        //         employee = new Engineer (first_name, last_name, roles_id, manager_id);

        //      } if (roles_id === "scientist") {
        //         employee = new Intern (first_name, last_name, roles_id, manager_id);

        //      } if (roles_id === "accountant") {
        //         employee = new Intern (first_name, last_name, roles_id, manager_id);  

        //      } if (roles_id === "engineer") {
        //         employee = new Intern (first_name, last_name, roles_id, manager_id);  

        //      } if (roles_id === "attorney") {
        //         employee = new Intern (first_name, last_name, roles_id, manager_id);   

        //      } if (roles_id === "recruiter") {
        //         employee = new Intern (first_name, last_name, roles_id, manager_id);  
        //      }
        //     
        //     }
        // })






    // If user chooses not to buildEmployee then data is pushed to DB 

    // const sql = data => {
    //   const params = [req.params.id];
    //     fs.post('/employee/:id', data, err => {
    //           if (err) {
    //             console.log(err);
    //             return;
    //         } {
    //             console.log('Updated database, result "OK"')
    //         }
    //     })
    // }; 

    // buildManager()

    // callback to execute when the Promise is resolved.

    // .then(buildEmployee)
    //   .then(employArray => {

        // callback to execute when the Promise is rejected.      

      //   return renderDB(employArray);
      // })

    // end of role routes //
    // Promise for the completion of which ever callback is executed     
//     .then(finalDB => {
//         return updateDB(finalDB);
//       })
//     .catch(err => {
//       console.log(err);
//     });

