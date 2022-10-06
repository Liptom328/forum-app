import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { withIronSessionSsr } from "iron-session/next";
import PostsBar from "../components/PostsBar";
import Footer from "../components/Footer";
import { Spinner, Card } from "flowbite-react";
import config from "../config";
import axios from "axios";

export default function Home({ user, posts }) {
  const [loading, setLoading] = useState(true)
  const router = useRouter();

  useEffect(() => {
    if (user === null) {
      router.push(`/login`)
    } else {
      setLoading(false)
    }
  }, [user]);

  if (loading === true) {
    return (
      <div>
        <PostsBar/>
        <section class="bg-gray-50 dark:bg-gray-900">
          <div class="text-center flex flex-col items-center justify-center px-6 py-8 mx-auto h-screen lg:py-0">
            <Spinner aria-label="Default status" size="xl"/>
          </div>
        </section>
        <Footer/>
      </div>
    )
  } else {
    return (
      <div>
        <PostsBar/>
        <section class="bg-gray-50 dark:bg-gray-900">
          <div className="max-w-sm px-6 py-6 flex flex-row gap-x-8 mx-2">
          {posts.map((post) => (
            <Card>
              <h5 className="text-2xl font-bold tracking-tight text-gray-900 dark:text-white">
                <a href={"/post/" + post.postid.toString()} class="text-sky-500 hover:underline dark:text-primary-500">{post.title}</a>
              </h5>
              <p className="font-normal text-gray-700 dark:text-gray-400">
                {post.description}
              </p>
            </Card>
          ))}
          </div>
        </section>
        <Footer/>
      </div>
    )
  }
}

export const getServerSideProps = withIronSessionSsr(
  async function getServerSideProps({ req }) {
    var userData = null;
    var postsList = null;

    const res = await axios.get("http://localhost:3000/api/post/getAll");
    if (res.data !== undefined) {
      postsList = res.data
    }

    if (req.session.user !== undefined) {
      userData = req.session.user
    }

    return {
      props: {
        user: userData,
        posts: postsList
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