import { withIronSessionSsr } from "iron-session/next";
import config from "../config";

export default function Home({ user }) {
  return (
    <div>
      <h1>Welcome back, {user.username}</h1>
      <h2>Login</h2>
      <form action="/api/login" method="post">
        Username: <input type="text" name="username" /><br/><br/>
        Password: <input type="password" name="password"/><br/><br/>
        <input type="submit" value="accept"/><br/><br/><hr/>
      </form>
      <h2>Sign up</h2>
      <form action="/api/signup" method="post">
        Username: <input type="text" name="username" /><br/><br/>
        Email: <input type="text" name="email"/><br/><br/>
        Password: <input type="password" name="password"/><br/><br/>
        <input type="submit" value="accept"/><br/><br/>
      </form>
    </div>
  )
}

export const getServerSideProps = withIronSessionSsr(
  async function getServerSideProps({ req }) {
    var userData = req.session.user;
    if (userData === undefined) {
      userData = "you are not logged in."
    }

    return {
      props: {
        user: userData,
      },
    };
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