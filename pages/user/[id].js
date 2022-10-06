import { useRouter } from 'next/router';
import { useEffect, useState } from "react";
import axios from "axios";

export default function User() {
  const router = useRouter();
  const [username, setUsername] = useState("?")

  if (router.query.id !== undefined) {
    axios.get(`/api/user/${router.query.id}`)
    .then(function (response) {
      if (response.data.message === "OK") {
        setUsername(response.data.username)
      }
    })
  }

  return <p>Username: {username}</p>
}