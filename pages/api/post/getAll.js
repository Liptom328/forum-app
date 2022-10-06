import posts from "../../../services/posts";

export default async function handler(req, res) {
    try { 
        const data = await posts.getAll()
        res.send(data)
      } catch(err) {
        console.error("Error while getting list of posts ", err.message);
      }
}