import db from "./db";

async function create(id, creator, postid, content){
  const query = 'INSERT INTO comments (id, creator, postid, content) VALUES (?, ?, ?, ?)';
  const result = await db.query(query, [id, creator, postid, content])

  let message = 'Error in creating new comment';

  if (result.affectedRows) {
    message = 'New comment created successfully';
  }

  return {message};
}

async function getAll(postid) {
  const result = await db.query('SELECT c.id, c.creator, c.postid, c.content, u.username FROM comments c INNER JOIN users u ON u.id = c.creator WHERE postid = ?', [postid], function(err) {
    if (err) {
      console.error(err)
    }
  })

  return result;
}

module.exports = {
  create,
  getAll
}
