import { useState, useEffect } from 'react';
import { get } from 'axios';

const useHttp = (url = '') => {
  const [fetchedData, setFetchedData] = useState(null);

  const fetchData = async () => {
    if (typeof url !== 'string' || !url) return;

    try {
      const response = await get(url);
      setFetchedData(response && response.data);
    } catch (error) {
      setFetchedData([]);
    }
  };
  useEffect(fetchData, [url]);

  return [fetchedData];
};

export default useHttp;
