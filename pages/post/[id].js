import { useRouter } from 'next/router';
import Head from 'next/head'
import { useState, useEffect } from "react";
import axios from "axios";
import PostsBar from "../../components/PostsBar";
import Footer from "../../components/Footer";
import config from "../../config";
import { withIronSessionSsr } from 'iron-session/next';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowLeft } from '@fortawesome/free-solid-svg-icons';
import { Spinner } from "flowbite-react";

export default function Post({ user }) {
  const router = useRouter();
  const [data, setData] = useState(null)
  const [creatorData, setCreatorData] = useState(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    if (router.query.id !== undefined) {
      if (data === null) {
        axios.get(`/api/post/get/${router.query.id}`)
        .then(function (response) {
          if (response.data.message === "OK") {
            setData(response.data)
            axios.get(`/api/user/${response.data.creator}`)
            .then(function (response) {
              if (response.data.message === "OK") {
                setCreatorData(response.data)
                setLoading(false)
              }
            })
          }
        })
      }
    }
  }, [router.query.id]);

  if (loading === true) {
    return (
      <div>
        <Head>
            <title>Loading...</title>
            <meta name="viewport" content="initial-scale=1.0, width=device-width" />
        </Head>
        <section className="bg-gray-50 dark:bg-gray-900">
          <div className="text-center flex flex-col items-center justify-center px-6 py-8 mx-auto h-screen lg:py-0">
            <Spinner aria-label="Default status" size="xl"/>
          </div>
        </section>
      </div>
    )
  } else {
    return (
        <div>
          <Head>
            <title>{data.title} | lipforum</title>
            <meta name="viewport" content="initial-scale=1.0, width=device-width" />
          </Head>
          <PostsBar/>
          <section className="flex flex-col bg-gray-50">
            <div className="mt-6 ml-7">
              <a href="/" className="text-sky-600 text-base font-semibold"><FontAwesomeIcon icon={faArrowLeft} /> <span className="hover:underline underline-offset-2">Go Back</span></a>
            </div>
            <div className="mt-2 ml-7">
              <h1 className="text-3xl font-semibold">{data.title}</h1>
            </div>
            <div className="mt-2 ml-7">
              <p className="text-lg">{data.description}</p>
            </div>
            <div className="mt-2 ml-7">
              <a className="text-sky-600 text-lg font-semibold hover:underline underline-offset-2" href={"/user/" + data.creator}>{creatorData.username}</a>
            </div>
            <div className="mt-7 ml-7 mr-7 mb-7">
              <p className="text-xl break-words md:break-all">{data.content}</p>
            </div>
            <div className="ml-7 mb-7">
              <h1 className="text-3xl font-semibold">Comments</h1>
              {
                user === null 
                ? ( <p className="mt-4">You need to be logged in to post comments.</p> )
                : (
                  <div className="mt-5 flex">
                    <form action="/api/comment/create" method="post">
                      <input type="hidden" name="creator" value={user.id}/>
                      <input type="hidden" name="postid" value={data.id}/>
                      <input type="text" name="content" className="border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 w-60" placeholder="Content..."></input>
                      <button type="submit" className="ml-3 mb-3 font-semibold bg-primary-600 w-20 pb-0.5 h-9 text-center rounded-md text-white">Post</button>
                    </form>
                  </div>
                )
              }
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

    if (req.session.user !== undefined) {
      userData = req.session.user
    }

    return {
      props: {
        user: userData
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