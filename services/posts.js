import db from "./db";

async function create(postid, creator, title, description, content){
  const query = 'INSERT INTO posts (postid, creator, title, description, content) VALUES (?, ?, ?, ?, ?)';
  const result = await db.query(query, [postid, creator, title, description, content])

  let message = 'Error in creating new post';

  if (result.affectedRows) {
    message = 'New post created successfully';
  }

  return {message};
}

async function getDataById(postid) {
  const result = await db.query('SELECT * FROM posts WHERE postid = ?', [postid], function(err) {
    if (err) {
      console.error(err)
    }
  })
  
  return result[0];
}

async function getAll() {
  const result = await db.query('SELECT * FROM `posts`', [], function(err) {
    if (err) {
      console.error(err)
    }
  })

  return result;
}

module.exports = {
  create,
  getDataById,
  getAll
}
