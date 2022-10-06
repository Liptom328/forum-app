import bcrypt from "bcrypt";
import config from "../../config";
import users from "../../services/users";
import { withIronSessionApiRoute } from "iron-session/next";

export default withIronSessionApiRoute(
  async function loginRoute(req, res) {
    try {
        var username = req.body.username;
        var password = req.body.password;
        var userData = await users.getData(username)
        if (userData !== undefined) {
           bcrypt.compare(password, userData['password'], async function(err, result) {
             if (result === true) {
              req.session.user = {
                id: userData['id'],
                username: username,
                email: userData['email'],
                password: password,
              };
              await req.session.save();
              res.redirect('http://localhost:3000')
             } else {
              res.redirect('http://localhost:3000/login')
             }
           });
        } else {
           res.redirect('http://localhost:3000/login')
        }      
      } catch(err) {
        res.send("Error")
        console.error("Error while logging in ", err.message);
      }
  },
  {
    cookieName: "poll_auth",
    password: config.sessionSecret,
    // secure: true should be used in production (HTTPS) but can't be used in development (HTTP)
    cookieOptions: {
      secure: false,
    },
  },
);