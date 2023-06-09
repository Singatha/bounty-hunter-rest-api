const express = require('express');
const app = express();
const mysql = require('mysql');
const bodyParser = require('body-parser');

// Create a MySQL connection pool
const pool = mysql.createPool({
  host: 'your-database-host',
  user: 'your-database-username',
  password: 'your-database-password',
  database: 'your-database-name'
});

// Create the Bounties table
pool.query(`
  CREATE TABLE IF NOT EXISTS Bounties (
    bounty_id INT PRIMARY KEY AUTO_INCREMENT,
    title VARCHAR(255) NOT NULL,
    description TEXT NOT NULL,
    reward DECIMAL(10, 2) NOT NULL,
    status VARCHAR(20) NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
  )`, (error, results, fields) => {
    if (error) {
      console.error('Error creating Bounties table:', error);
    } else {
      console.log('Bounties table created successfully');
    }
});

// Create the BountyHunters table
pool.query(`
  CREATE TABLE IF NOT EXISTS BountyHunters (
    hunter_id INT PRIMARY KEY AUTO_INCREMENT,
    name VARCHAR(255) NOT NULL,
    specialization VARCHAR(255) NOT NULL,
    experience INT NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
  )`, (error, results, fields) => {
    if (error) {
      console.error('Error creating BountyHunters table:', error);
    } else {
      console.log('BountyHunters table created successfully');
    }
});

// Create the BountyAssignments table
pool.query(`
  CREATE TABLE BountyAssignments (
    assignment_id INT PRIMARY KEY AUTO_INCREMENT,
    bounty_id INT NOT NULL,
    hunter_id INT NOT NULL,
    assigned_date DATE NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (bounty_id) REFERENCES Bounties(bounty_id),
    FOREIGN KEY (hunter_id) REFERENCES BountyHunters(hunter_id)
  )`, (error, results, fields) => {
    if (error) {
      console.error('Error creating BountyAssignments table:', error);
    } else {
      console.log('BountyAssignmentss table created successfully');
    }
});

// Middleware to parse JSON body
app.use(bodyParser.json());

// Route to add a new bounty
app.post('/bounties', (req, res) => {
  const { title, description, reward } = req.body;
  const query = 'INSERT INTO Bounties (title, description, reward, status, created_at, updated_at) VALUES (?, ?, ?, ?, NOW(), NOW())';
  const values = [title, description, reward, 'open'];

  pool.query(query, values, (error, results) => {
    if (error) {
      console.error('Error adding bounty:', error);
      res.sendStatus(500);
    } else {
      res.sendStatus(201);
    }
  });
});

// Route to list all bounties
app.get('/bounties', (req, res) => {
  const query = 'SELECT * FROM Bounties';

  pool.query(query, (error, results) => {
    if (error) {
      console.error('Error retrieving bounties:', error);
      res.sendStatus(500);
    } else {
      res.json(results);
    }
  });
});

// Route to choose a bounty
app.put('/bounties/:bountyId/choose', (req, res) => {
  const { bountyId } = req.params;
  const query = 'UPDATE Bounties SET status = ? WHERE id = ?';
  const values = ['chosen', bountyId];

  pool.query(query, values, (error, results) => {
    if (error) {
      console.error('Error choosing bounty:', error);
      res.sendStatus(500);
    } else {
      res.sendStatus(200);
    }
  });
});

// Route to add a new bounty hunter
app.post('/hunters', (req, res) => {
  const { name, specialization, experience } = req.body;
  const query = 'INSERT INTO BountyHunters (name, specialization, experience, created_at, updated_at) VALUES (?, ?, ?, NOW(), NOW())';
  const values = [name, specialization, experience];

  pool.query(query, values, (error, results) => {
    if (error) {
      console.error('Error adding bounty hunter:', error);
      res.sendStatus(500);
    } else {
      res.sendStatus(201);
    }
  });
});

// Route to list all bounty hunters
app.get('/hunters', (req, res) => {
  const query = 'SELECT * FROM BountyHunters';

  pool.query(query, (error, results) => {
    if (error) {
      console.error('Error retrieving bounty hunters:', error);
      res.sendStatus(500);
    } else {
      res.json(results);
    }
  });
});

// Route to hire a bounty hunter for a bounty
app.post('/bounties/:bountyId/hire/:hunterId', (req, res) => {
  const { bountyId, hunterId } = req.params;
  const query = 'INSERT INTO BountyAssignments (bounty_id, hunter_id, assigned_date, created_at) VALUES (?, ?, NOW(), NOW())';
  const values = [bountyId, hunterId];

  pool.query(query, values, (error, results) => {
    if (error) {
      console.error('Error hiring bounty hunter:', error);
      res.sendStatus(500);
    } else {
      res.sendStatus(201);
    }
  });
});

// Start the server
app.listen(3000, () => {
  console.log('Server started on port 3000');
});
