import { useState, useEffect } from "react";
import GetPosts from "../helpers/getPosts";
import useData from "./useData";
import { useLocalStorage } from "./useLocalStorage";

export default function useGetPostNumber(params = "") {
  const { objCollection: collection } = useLocalStorage("user-logged");
  const {
    objCollection: numberPublicationsStorage,
    setLocalStorage: setNumberPublicationsStorage,
  } = useLocalStorage("number-publications");
  const { numberPublications, setNumberPublications } = useData();

  const [response, setResponse] = useState(null);
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setIsLoading(true);
        const posts = await GetPosts(`author=${collection.username}`);
        const currentUserPostsTotal = posts.length;
        setNumberPublicationsStorage({ currentUserPostsTotal });
        setNumberPublications(currentUserPostsTotal);
      } catch (error) {
        setError(error);
        setNumberPublications(null);
      } finally {
        setIsLoading(false);
      }
    };

    const hasUsername = collection?.username;
    const hasNumberPublicationsStorage = numberPublicationsStorage;

    if (hasUsername && !hasNumberPublicationsStorage) {
      fetchData();
    }

    if (hasNumberPublicationsStorage) {
      setNumberPublications(numberPublicationsStorage.currentUserPostsTotal);
    }
  }, [collection?.username]);

  useEffect(() => {
    setNumberPublicationsStorage({ currentUserPostsTotal: numberPublications });
  }, [numberPublications]);

  return { response, error, isLoading };
}
