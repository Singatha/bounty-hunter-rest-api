const { pool } = require('../lib/db');

// Route to add a new bounty
function addBounty(req, res){
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
}

// Route to list all bounties
function getBountyList(req, res){
    const query = 'SELECT * FROM Bounties';

    pool.query(query, (error, results) => {
        if (error) {
        console.error('Error retrieving bounties:', error);
        res.sendStatus(500);
        } else {
        res.json(results);
        }
    });
}

// Route to choose a bounty
function updateBounty(req, res){
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
}

// Route to hire a bounty hunter for a bounty
function hireBounty(req, res){
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
}

module.exports = { addBounty, getBountyList, updateBounty, hireBounty }
