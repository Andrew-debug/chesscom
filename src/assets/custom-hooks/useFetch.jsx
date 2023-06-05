import { useEffect, useState } from "react";

const useFetch = (default_url_value) => {
  const [url, seturl] = useState(default_url_value);
  const [data, setData] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  const fetchDataAction = async () => {
    try {
      setIsLoading(true);
      const response = await fetch(url);
      const jsonData = await response.json();
      setData(jsonData);
      setIsLoading(false);
    } catch (error) {
      setIsLoading(false);
      setError(error);
    }
  };
  return {
    url,
    seturl,
    data,
    setData,
    isLoading,
    error,
    fetchDataAction,
    resetData: () => setData(null),
  };
};

export default useFetch;
