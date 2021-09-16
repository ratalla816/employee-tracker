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

 // Credit -  https://www.mysqltutorial.org/mysql-nodejs/connect/ //
 connection.connect(function(err) {
  initiateApp();
 });
   
  // If our connection is successful we should see this message
  initiateApp = () => {
    console.log('Welcome to the Atalla Corporation Employee Database')
    beginPrompts();
  };  
  

// begin inquirer questions - start menu //
const beginPrompts = () => {
  inquirer.prompt([
    {
      type: 'list',
      // *CHOICES up here...
      name: 'choices',
      message: 'Please select an option.',
      choices:
        [
          'view departments',
          'view list of active employees',
          'add new department',
          'exit program'
        ]
    }
 ])
    // end start menu //      

 .then((userInput) => {
       // *have to equal CHOICES down here // Credit - Eric Stanulis (Substitute Instructor)
    const {choices} = userInput;

    if (choices === 'view departments') { describeDepartments(); }
           
    if (choices === 'view list of active employees') { describeEmployees(); }

    if (choices === 'add new department') { newDepartment(); }         
   
    if (choices === 'exit program') {
      // Closing the connection is done using end() which makes sure all remaining queries are executed before sending a quit packet to the mysql server.
      // https://stackoverflow.com/questions/20692989/node-mysql-where-does-connection-end-go
      connection.end() };
      
    })
  }
                
    const describeDepartments = () => {
    console.log('Displaying departments');
     const sql = `SELECT * FROM department`;
     // connection.query Credit - Eric Stanulis (Substitute Instructor)
     connection.query(sql, (err, results) => {
      if (err) throw err;
    // console.table instead of console.log Credit - Nathan Szurek (tutor)
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

  newDepartment = () => { 
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
