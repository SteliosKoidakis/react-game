import { useState, useEffect } from 'react';
import { get } from 'axios';

const useHttp = (url = '') => {
  const [fetchedData, setFetchedData] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  const fetchData = async () => {
    if (typeof url !== 'string' || !url) return;

    try {
      setIsLoading(true);

      const response = await get(url);
      setFetchedData(response && response.data);
    } catch (error) {
      setFetchedData([]);
    }

    setIsLoading(false);
  };
  useEffect(fetchData, [url]);

  return [fetchedData, isLoading];
};

export default useHttp;
