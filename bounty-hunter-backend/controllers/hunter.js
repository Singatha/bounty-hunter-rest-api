const { pool } = require('../lib/db');

function addHunter(req, res){
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
}

function getHunterList(res){
    const query = 'SELECT * FROM BountyHunters';
  
    pool.query(query, (error, results) => {
        if (error) {
            console.error('Error retrieving bounty hunters:', error);
            res.sendStatus(500);
        } else {
           res.json(results);
        }
    });
}

module.exports = { addHunter, getHunterList }
