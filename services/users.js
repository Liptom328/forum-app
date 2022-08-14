const db = require('./db');

async function create(id, username, email, password){
  const query = 'INSERT INTO users (id, username, email, password) VALUES (?, ?, ?, ?)';
  const result = await db.query(query, [id, username, email, password])

  let message = 'Error in creating new user';

  if (result.affectedRows) {
    message = 'New user created successfully';
  }

  return {message};
}

module.exports = {
  create
}
