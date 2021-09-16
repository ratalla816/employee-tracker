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
      name: 'choices',
      message: 'Please select an option.',
      choices:
        [
          'view departments',
          'view list of active employees',
          'add a department',
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
    if (choices === 'view list of active employees') { 
      describeEmployees();

    }         
     if (choices === 'add a department') { 
      addDepartment();

    }         
     if (choices === 'exit program') {
      // Closing the connection is done using end() which makes sure all remaining queries are executed before sending a quit packet to the mysql server.
      // https://stackoverflow.com/questions/20692989/node-mysql-where-does-connection-end-go
      connection.end()
    };
      
    })
  }
    
      // Credit - Eric Stanulis (Substitute Instructor)
 const describeDepartments = () => {
    console.log('Displaying departments');
     const sql = `SELECT * FROM department`;
     // Credit - Eric Stanulis (Substitute Instructor)
     connection.query(sql, (err, results) => {
      if (err) throw err;
    console.table(results);
    beginPrompts()
  });
}; 

  describeEmployees = () => {
    console.log('Displaying employees');
   const sql = `SELECT * FROM employees`;
   connection.query(sql, (err, results) => {
       if (err) throw err;
    console.table(results);
    beginPrompts();
  }); 
 };

  addDepartment = () => { 
    inquirer.prompt([
      {
        type: 'input',
        name: 'newDepartment',
        message: 'Please enter department name',
      }
    ])
  .then(userInput => {
      const sql = `INSERT INTO department (name) VALUES (?)`;               
       connection.query(sql, userInput.newDepartment, (err, results) => {
       if (err) throw err;
        console.log('department added')
        console.table(results);
        beginPrompts();
     }); 
   });
  }; 
   
 



      

