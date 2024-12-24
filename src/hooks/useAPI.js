import { useState, useEffect, useCallback } from 'react';
import api from '../services/api';

const useAPI = (endpoint, options = {}) => {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchData = useCallback(async () => {
    try {
      setLoading(true);
      console.log(`Fetching data from: ${endpoint}`);
      
      // Tambahkan timeout promise
      const timeoutPromise = new Promise((_, reject) => {
        setTimeout(() => reject(new Error('Request timeout')), 10000);
      });

      const response = await Promise.race([
        api.get(endpoint),
        timeoutPromise
      ]);

      console.log('Data received:', response.data);
      setData(response.data || []);
      setError(null);
    } catch (err) {
      console.error('Error in useAPI:', {
        message: err.message,
        endpoint,
        response: err.response
      });

      let errorMessage = 'Terjadi kesalahan saat mengambil data';
      
      if (err.code === 'ERR_NETWORK') {
        errorMessage = 'Tidak dapat terhubung ke server. Pastikan server berjalan dan CORS diaktifkan.';
      } else if (err.response) {
        errorMessage = `Server Error: ${err.response.status} - ${err.response.statusText}`;
      }

      setError(errorMessage);
      setData(null);
    } finally {
      setLoading(false);
    }
  }, [endpoint]);

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  return { 
    data, 
    loading, 
    error,
    refetch: fetchData
  };
};

export default useAPI;
