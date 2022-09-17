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
              res.redirect('http://localhost:3000?success=true')
             } else {
              res.redirect('http://localhost:3000/login?err=Invalid%20login%20data.')
             }
           });
        } else {
           res.redirect('http://localhost:3000/login?err=User%20with%20this%20name%20doesnt%20exist.')
        }      
      } catch(err) {
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