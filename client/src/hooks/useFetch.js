import { useEffect, useState } from "react";
import axios from "axios";

export function useFetch (url) {
  const [data, setData] = useState(null)

  useEffect(() => {
    axios.get(`http://localhost:3000/${url}`)
      .then((response) => {
        setData(response.data)
      });
  }, []);

  return { data }
}
