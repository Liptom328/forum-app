import bcrypt from "bcrypt";
import { Generator } from "snowflake-generator";
import users from "../../services/users";

export default async function handler(req, res) {
    try {
        const SnowflakeGenerator = new Generator(1420070400000); 
        var id = SnowflakeGenerator.generate()
        var username = req.body.username;
        var email = req.body.email;
        var password = req.body.password;
     
        var salt = bcrypt.genSaltSync(10);
        var hash = bcrypt.hashSync(password, salt);
     
        await users.create(id, username, email, hash)
        res.redirect('http://localhost:3000')
      } catch(err) {
        console.error("Error while creating new user ", err.message);
      }
}