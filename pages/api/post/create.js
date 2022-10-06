import { Generator } from "snowflake-generator";
import posts from "../../../services/posts";

export default async function handler(req, res) {
    try {
        const SnowflakeGenerator = new Generator(1420070400000); 
        var id = SnowflakeGenerator.generate()
        var title = req.body.title;
        var creator = req.body.creator;
        var description = req.body.description;
        var content = req.body.content;

        console.log(description)
        console.log(content)
        await posts.create(id, creator, title, description, content)
        
        res.redirect('http://localhost:3000?message="Post%20created%20sucessfully.')
      } catch(err) {
        console.error("Error while creating new poll ", err.message);
      }
}