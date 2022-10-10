import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { withIronSessionSsr } from "iron-session/next";
import PostsBar from "../components/PostsBar";
import Footer from "../components/Footer";
import { Spinner } from "flowbite-react";
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
          <div class="py-8 px-4 mx-auto max-w-screen-xl lg:py-16 lg:px-6">
              <div class="mx-auto max-w-screen-sm text-center lg:mb-16 mb-8">
                  <h2 class="mb-4 text-3xl lg:text-4xl tracking-tight font-extrabold text-gray-900 dark:text-white">Welcome to lipforum!</h2>
              </div> 
              <div class="grid gap-8 lg:grid-cols-2">
                {posts.map((post) => (
                  <article class="p-6 bg-white rounded-lg border border-gray-200 shadow-md dark:bg-gray-800 dark:border-gray-700">
                      <div class="flex justify-between items-center mb-5 text-gray-500">
                          <span class="bg-primary-100 text-primary-800 text-xs font-medium inline-flex items-center px-2.5 py-0.5 rounded dark:bg-primary-200 dark:text-primary-800">
                              None
                          </span>
                          <span class="text-sm">14 days ago</span>
                      </div>
                      <h2 class="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white"><a href={"/post/" + post.postid}>{post.title}</a></h2>
                      <p class="mb-5 font-light text-gray-500 dark:text-gray-400">{post.description}</p>
                      <div class="flex justify-between items-center">
                          <div class="flex items-center space-x-4">
                              <img class="w-7 h-7 rounded-full" src="/guest.jpg" alt="User Avatar" />
                              <a href={"/user/" + post.creator}><span class="font-medium dark:text-white hover:underline underline-offset-2">{post.creator}</span></a>
                          </div>
                          <a href={"/post/" + post.postid} class="inline-flex items-center font-medium text-primary-600 dark:text-primary-500 hover:underline">
                              Read more
                              <svg class="ml-2 w-4 h-4" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fill-rule="evenodd" d="M10.293 3.293a1 1 0 011.414 0l6 6a1 1 0 010 1.414l-6 6a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-4.293-4.293a1 1 0 010-1.414z" clip-rule="evenodd"></path></svg>
                          </a>
                      </div>
                  </article>     
                ))}              
              </div>  
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