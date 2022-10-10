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

module.exports = {
  create
}
