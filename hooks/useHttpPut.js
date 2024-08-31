import { useState, useEffect } from "react";

export default function useHttpPut(url = "", data = "", change = "") {
  const [response, setResponse] = useState(null);
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    // //console.log(url);
    // //console.log(data);
    // //console.log(change);
    if (url && data && change) {
      ////console.log("estas dentro del useHttpPut");
      (async () => {
        setIsLoading(true);
        try {
          const response = await fetch(url, {
            method: "PUT",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify(data),
          });

          const responseBody = await response.json();
          const statusText = response.statusText;

          setResponse({ data: responseBody, statusText });
        } catch (error) {
          setError(error);
        }
        setIsLoading(false);
      })();

      //fetchData();
    }
  }, [change, data, url]);

  return { response, error, isLoading };
}
