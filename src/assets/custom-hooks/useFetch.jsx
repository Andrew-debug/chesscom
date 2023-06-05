import { useEffect, useState } from "react";

const useFetch = (default_url_value, default_data = null, autorequest) => {
  const [url, seturl] = useState(default_url_value);
  const [data, setData] = useState(default_data);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  const fetchDataAction = async () => {
    if (url) {
      try {
        console.log("request", url);
        setIsLoading(true);
        const response = await fetch(url);
        const jsonData = await response.json();
        setData(jsonData);
        setIsLoading(false);
      } catch (error) {
        setIsLoading(false);
        setError(error);
      }
    }
  };
  useEffect(() => {
    if (autorequest) {
      fetchDataAction();
    }
  }, [url]);

  return {
    url,
    seturl,
    data,
    setData,
    isLoading,
    error,
    fetchDataAction,
    resetData: () => {
      if (default_data) {
        setData(default_data);
      } else {
        setData(null);
      }
    },
  };
};

export default useFetch;
