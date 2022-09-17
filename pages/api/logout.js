import { withIronSessionApiRoute } from "iron-session/next";
import config from "../../config";

export default withIronSessionApiRoute(
  function logoutRoute(req, res, session) {
    req.session.destroy();
    res.redirect('http://localhost:3000?success=true')
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