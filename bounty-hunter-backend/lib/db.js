const mysql = require('mysql');

// Create a MySQL connection pool
const pool = mysql.createPool({
  host: 'mysql-db',
  user:'root',
  password: 'password',
  database: 'bountyhunterDB'
});

// Create the Bounties table
// pool.query(`
//   CREATE TABLE IF NOT EXISTS Bounties (
//     bounty_id INT PRIMARY KEY AUTO_INCREMENT,
//     title VARCHAR(255) NOT NULL,
//     description TEXT NOT NULL,
//     reward DECIMAL(10, 2) NOT NULL,
//     status VARCHAR(20) NOT NULL,
//     created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
//     updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
//   )`, (error, results, fields) => {
//     if (error) {
//       console.error('Error creating Bounties table:', error);
//     } else {
//       console.log('Bounties table created successfully');
//     }
// });

// Create the BountyHunters table
// pool.query(`
//   CREATE TABLE IF NOT EXISTS BountyHunters (
//     hunter_id INT PRIMARY KEY AUTO_INCREMENT,
//     name VARCHAR(255) NOT NULL,
//     specialization VARCHAR(255) NOT NULL,
//     experience INT NOT NULL,
//     created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
//     updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
//   )`, (error, results, fields) => {
//     if (error) {
//       console.error('Error creating BountyHunters table:', error);
//     } else {
//       console.log('BountyHunters table created successfully');
//     }
// });

// Create the BountyAssignments table
// pool.query(`
//   CREATE TABLE BountyAssignments (
//     assignment_id INT PRIMARY KEY AUTO_INCREMENT,
//     bounty_id INT NOT NULL,
//     hunter_id INT NOT NULL,
//     assigned_date DATE NOT NULL,
//     created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
//     FOREIGN KEY (bounty_id) REFERENCES Bounties(bounty_id),
//     FOREIGN KEY (hunter_id) REFERENCES BountyHunters(hunter_id)
//   )`, (error, results, fields) => {
//     if (error) {
//       console.error('Error creating BountyAssignments table:', error);
//     } else {
//       console.log('BountyAssignmentss table created successfully');
//     }
// });

module.exports = { pool };
