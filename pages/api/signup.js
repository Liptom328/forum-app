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
        var emailData = users.getEmailData(email);
        var userData = users.getData(username);
     
        await users.create(id, username, email, hash)
        res.redirect('http://localhost:3000?message=Signup%20successful%20you%20can%20login%20into%20your%20account.')
      } catch(err) {
        console.error("Error while creating new user ", err.message);
      }
}