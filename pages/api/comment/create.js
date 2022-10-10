import { Generator } from "snowflake-generator";
import comments from "../../../services/comments";

export default async function handler(req, res) {
    try {
        const SnowflakeGenerator = new Generator(1420070400000); 
        var id = SnowflakeGenerator.generate()
        var creator = req.body.creator;
        var postid = req.body.postid;
        var content = req.body.content;

        await comments.create(id, creator, postid, content)
        
        res.redirect(`http://localhost:3000/post/${postid}`)
      } catch(err) {
        console.error("Error while creating new comment ", err.message);
      }
}