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
          'edit employee role',
          'view / edit managers',
          'view employees in a specific department',
          'delete a department',
          'delete an employee role',
          'delete an employee',
          'exit program'
        ]
    }
 ])
    // end start menu //      

 .then((input) => {
    const {choices} = input;

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
      addRole();

    } 
      if (choices === 'add a new employee') {
      addEmployee();

    } 
      if (choices === 'edit employee role') {
      editRole();

    } 
      if (choices === 'view / edit managers') {
      editManager();

    } 
      if (choices === 'view employees in a specific department') {
      describeDeptEmp();

    } 
      if (choices === 'delete a department') {
      deleteDepartment();

    } 
      if (choices === 'delete an employee role') {
      deleteRole();

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
    
    
  // describeDepartments = () => {
  //   console.log('something goes here');
  //    // inquirer.prompt, const, (err), err, query, ETC.. //
  //   console.table(results);
  //   somethingGoesHereMaybe();
  // }

  // describeRoles = () => {
  //   console.log('something goes here');
  //   // inquirer.prompt, const, (err), err, query, ETC.. //
  //   console.table(results);
  //   somethingGoesHereMaybe();

  // }

  // describeEmployees = () => {
  //   console.log('something goes here');
  // // inquirer.prompt, const, (err), err, query, ETC.. //
  //   console.table(results);
  //   somethingGoesHereMaybe();

  // }

  // addDepartment = () => {
  //   console.log('something goes here');
  // // inquirer.prompt, const, (err), err, query, ETC.. //
  //   console.table(results);
  //   somethingGoesHereMaybe();

  // }

  // addRole = () => {
  //   console.log('something goes here');
  //   // inquirer.prompt, const, (err), err, query, ETC.. //
  //   console.table(results);
  //   somethingGoesHereMaybe();

  // }

  // addEmployee = () => {
  //   console.log('something goes here');
  //  // inquirer.prompt, const, (err), err, query, ETC.. //
  //   console.table(results);
  //   somethingGoesHereMaybe();

  // }

  // editRole = () => {
  //   console.log('something goes here');
  //   // inquirer.prompt, const, (err), err, query, ETC.. //
  //   console.table(results);
  //   somethingGoesHereMaybe();

  // }

  // editManager () => {
  //    console.log('something goes here');
  //    // inquirer.prompt, const, (err), err, query, ETC.. //
  //    console.table(results);
  //    somethingGoesHereMaybe();
  // }

  // describeDeptEmp () => {
  //   console.log('something goes here');
  //    // inquirer.prompt, const, (err), err, query, ETC.. //
  //   console.table(results);
  //   somethingGoesHereMaybe();

  // }

  // deleteDepartment () => {
  //   console.log('something goes here');
  //   // inquirer.prompt, const, (err), err, query, ETC.. //
  //   console.table(results);
  //   somethingGoesHereMaybe();

  // }

  // deleteRole () => {
  //   console.log('something goes here');
  //   // inquirer.prompt, const, (err), err, query, ETC.. //
  //   console.table(results);
  //   somethingGoesHereMaybe();

  // }

  // deleteEmployee () => {
  //   console.log('something goes here');
  //   // inquirer.prompt, const, (err), err, query, ETC.. //
  //   console.table(results);
  //   somethingGoesHereMaybe();

  // }

  // wrapUpThisMess();
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
  
    
    
