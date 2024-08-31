import { useState, useEffect } from "react";

export default function useHttpPostHook(url = "", data = "") {
  const [response, setResponse] = useState(null);
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    if (url && data) {
      ////console.log("estas dentro del useHttpPostHook");
      const fetchData = async () => {
        setIsLoading(true);
        try {
          const response = await fetch(url, {
            method: "POST",
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
      };

      fetchData();
    }
  }, [url, data]);

  return { response, error, isLoading };
}
