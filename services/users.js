import db from "./db"

async function create(id, username, email, password){
  const query = 'INSERT INTO users (id, username, email, password) VALUES (?, ?, ?, ?)';
  const result = await db.query(query, [id, username, email, password])

  let message = 'Error in creating new user';

  if (result.affectedRows) {
    message = 'New user created successfully';
  }

  return {message};
}

async function getData(username) {
  const result = await db.query('SELECT * FROM `users` WHERE `username` = ?', [username], function(err) {
    if (err) {
      console.error(err)
    }
  })

  return result[0];
}

async function getDataById(userId) {
  const result = await db.query('SELECT * FROM `users` WHERE `id` = ?', [userId], function(err) {
    if (err) {
      console.error(err)
    }
  })
  return result[0];
}

module.exports = {
  create,
  getData,
  getDataById
}
