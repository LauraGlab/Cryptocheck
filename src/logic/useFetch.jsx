import { useState, useEffect } from "react";

export default function useFetch(url, deps = []) {
  const [data, setData] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const controller = new AbortController();
    setIsLoading(true);

    fetch(url, { signal: controller.signal })
      .then((res) => res.json())
      .then((data) => {
        setIsLoading(false);
        setData(data);
        setError(null);
      })
      .catch((error) => {
        setTimeout(() => setIsLoading(false), 1500);
        if (error.name !== "AbortError") {
          console.error("Fetch error:", error);
          setError(true);
        }
      });

    return () => controller.abort();
  }, deps);

  return { data, isLoading, error };
}
