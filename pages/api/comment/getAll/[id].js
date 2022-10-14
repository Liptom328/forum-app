import comments from "../../../../services/comments";

export default async function commentsRoute(req, res) {
    try { 
        const data = await comments.getAll(req.query.id);
        res.json({ message: "OK", comments: data})
      } catch(err) {
        res.json({ message: "ERR" })
      }
}