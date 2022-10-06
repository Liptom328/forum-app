import LoginBar from "../components/LoginBar";
import Footer from "../components/Footer";
import { Textarea, Label } from "flowbite-react";
import { withIronSessionSsr } from "iron-session/next";
import config from "../config";

export default function Create({ user }) {
    return (
        <div>
        <LoginBar/>
            <section class="bg-gray-50 dark:bg-gray-900">
                <div class="flex flex-col items-center justify-center px-6 py-8 mx-auto md:h-screen lg:py-0">
                    <a href="#" class="flex items-center mb-6 text-2xl font-semibold text-gray-900 dark:text-white">
                        lip<span class="text-sky-600">forum</span>
                    </a>
                    <div class="w-full bg-white rounded-lg shadow dark:border md:mt-0 sm:max-w-md xl:p-0 dark:bg-gray-800 dark:border-gray-700">
                        <div class="p-6 space-y-4 md:space-y-6 sm:p-8">
                            <h1 class="text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl dark:text-white">
                                Create new post
                            </h1>
                            <form class="space-y-4 md:space-y-6" action="/api/post/create" method="post">
                                <input type="hidden" name="creator" id="creator" value={user.id} />
                                <div>
                                    <label for="title" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Title</label>
                                    <input type="text" name="title" id="title" class="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="Post" required=""/>
                                </div>
                                <div>
                                    <label for="description" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Description</label>
                                    <input type="text" name="description" id="description" class="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="Description." required=""/>
                                </div>
                                <div id="textarea">
                                <div className="mb-2 block">
                                    <Label
                                    htmlFor="comment"
                                    value="Content"
                                    />
                                </div>
                                <Textarea
                                    id="comment"
                                    name="content"
                                    placeholder="Post content..."
                                    required={true}
                                    rows={4}
                                />
                                </div>
                                <button type="submit" class="w-full text-white bg-primary-600 hover:bg-primary-700 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800">Create</button>
                            </form>
                        </div>
                    </div>
                </div>
            </section>
            <Footer/>
        </div>
    )
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