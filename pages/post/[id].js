import { useRouter } from 'next/router';
import { useState, useEffect } from "react";
import axios from "axios";
import PostsBar from "../../components/PostsBar";
import Footer from "../../components/Footer";
import { Spinner } from "flowbite-react";

export default function Post() {
  const router = useRouter();
  const [data, setData] = useState(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    if (router.query.id !== undefined) {
      if (data === null) {
        axios.get(`/api/post/get/${router.query.id}`)
        .then(function (response) {
          console.log(response.data)
          if (response.data.message === "OK") {
            setData(response.data)
            setLoading(false)
            console.log(router.query.id)
          }
        })
      }
    }
  }, [router.query.id]);

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
    return <p>Title: {data.title}, Description: {data.description}, Content: {data.content}, ID: {data.id}, Creator: {data.creator}</p>
  }
}