import { useRouter } from 'next/router';
import { useState, useEffect } from "react";
import axios from "axios";
import PostsBar from "../../components/PostsBar";
import Footer from "../../components/Footer";
import { Spinner } from "flowbite-react";

export default function User() {
  const router = useRouter();
  const [data, setData] = useState(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    if (router.query.id !== undefined) {
      if (data === null) {
        axios.get(`/api/user/${router.query.id}`)
        .then(function (response) {
          console.log(response.data)
          if (response.data.message === "OK") {
            setData(response.data)
            setLoading(false)
          }
        })
      }
    }
  }, [router.query.id]);

  if (loading === true) {
    return (
      <div>
        <section class="bg-gray-50 dark:bg-gray-900">
          <div class="text-center flex flex-col items-center justify-center px-6 py-8 mx-auto h-screen lg:py-0">
            <Spinner aria-label="Default status" size="xl"/>
          </div>
        </section>
      </div>
    )
  } else {
    return <p>ID: {data.id}, Username: {data.username}, Email: {data.email}</p>
  }
}