const inquirer = require('inquirer');

const mysql = require('mysql2');

// THIS MYSTERIOUSLY APPEARED - NO CLUE WHAT IT IS OR WHY ITS HERE //
// const Connection = require('mysql2/typings/mysql/lib/Connection');
// ************************************* //

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
// const beginPrompts = () => {
  inquirer.prompt([
    {
      type: "list",
      name: "start",
      message: "Please select an option.",
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
          'exit program',
        ]

    }
  ])
    // end of question array //      

    .then((userInput) => {
      let(inquirer.prompt) = userInput;


      if (userInput === 'view departments') {
        describeDepartments();

      } else if (userInput === 'view existing employee roles') {
        describeRoles();

      } else if (userInput === 'view all employees') {
        describeEmployees();

      } else if (userInput === 'add a department') {
        addDepartment();

      } else if (userInput === 'add a new employee role') {
        addRole();

      } else if (userInput === 'add a new employee') {
        addEmployee();

      } else if (userInput === 'edit employee role') {
        editRole();

      } else if (userInput === 'view / edit managers') {
        editManager();

      } else if (userInput === 'view employees in a specific department') {
        describeDeptEmp();

      } else if (userInput === 'delete a department') {
        deleteDepartment();

      } else if (userInput === 'delete an employee role') {
        deleteRole();

      } else if (userInput === 'delete an employee') {
        deleteEmployee();

      } else if (userInput === 'exit program') {
        return connection.terminated()
      };
      console.log('Dueces!')

    })
  }
    
    
    // describeDepartments = () => {

    //   }

    // describeRoles = () => {


    // }

    // describeEmployees = () => {


    // }

    // addDepartment = () => {


    // }

    // addRole = () => {


    // }

    // addEmployee = () => {


    // }

    // editRole = () => {


    // }

    // editManager () => {

    // }

    // describeDeptEmp () => {


    // }

    // deleteDepartment () => {


    // }

    // deleteRole () => {


    // }

    // deleteEmployee () => {


    // }





           // .then(userInput => {
        //     // Selects the data sets for each employee class

        //     let { first_name, last_name, roles_id, manager_id, buildEmployeeConfirm } = userInput; 
        //     let employee; 

        //     if (roles_id === "accountexec") {
        //         employee = new Engineer (first_name, last_name, roles_id, manager_id);

        //      } else if (roles_id === "scientist") {
        //         employee = new Intern (first_name, last_name, roles_id, manager_id);

        //      } else if (roles_id === "accountant") {
        //         employee = new Intern (first_name, last_name, roles_id, manager_id);  

        //      } else if (roles_id === "engineer") {
        //         employee = new Intern (first_name, last_name, roles_id, manager_id);  

        //      } else if (roles_id === "attorney") {
        //         employee = new Intern (first_name, last_name, roles_id, manager_id);   

        //      } else if (roles_id === "recruiter") {
        //         employee = new Intern (first_name, last_name, roles_id, manager_id);  
        //      }
        //     // pushes newly built employee to employArray
        //     employArray.push(employee); 

        //     if (buildEmployeeConfirm) {
        //         return buildEmployee(employArray); 
        //     } else {
        //         return employArray;
        //     }
        // })






    // If user chooses not to buildEmployee then data is pushed to DB 

    // const sql = data => {
    //   const params = [req.params.id];
    //     fs.post('/employee/:id', data, err => {
    //           if (err) {
    //             console.log(err);
    //             return;
    //         } else {
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





  // GET all department //


    // end of role routes //
    // Promise for the completion of which ever callback is executed     
//     .then(finalDB => {
//         return updateDB(finalDB);
//       })
//     .catch(err => {
//       console.log(err);
//     });

    
    
