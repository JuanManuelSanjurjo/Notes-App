import { useState, useEffect } from 'react';

function useFetch({url, method = 'GET', body = null}) {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
      const fetchData = async () => {
        try {

          const options = {
            method,
            headers: {
              'Content-Type': 'application/json',
            },
          };

          if (body) {
            options.body = JSON.stringify(body);
          }
          const response = await fetch(`http://localhost:3000/api/${url}`, options)

          if (!response.ok) {
            throw new Error('Error fetching data');
          }
          const data = await response.json();
          setData(data);
          setLoading(false);
        } catch (error) {
          setError(error.message);
          setLoading(false);
        }
      };

      fetchData();
  }, [url]);

  return { data, loading, error };
}

export default useFetch;