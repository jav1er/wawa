import { useState, useEffect } from "react";
import GetPosts from "../helpers/getPosts";
import useData from "./useData";

export default function useUpdatePosts(params = "") {
  //////console.log(url);
  //////console.log(params);
  const [response, setResponse] = useState([]);
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const { setPosts } = useData();

  useEffect(() => {
    ////console.log("estas en useUpdatePosts");
    if (params) {
      const fetchData = async () => {
        setIsLoading(true);
        try {
          const currentPosts = await GetPosts(params);

          if (params.selectOrderArray === "top") {
            setPosts((previousPosts) => [...currentPosts, ...previousPosts]);
          } else {
            setPosts((previousPosts) => [...previousPosts, ...currentPosts]);
          }
        } catch (error) {
          setError(error);
        }
        setIsLoading(false);
      };
      fetchData();
    }
  }, [params, setPosts]);

  return { /*response,*/ /*error,*/ isLoading };
}
