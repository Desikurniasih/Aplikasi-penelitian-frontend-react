// src/Component/hooks/useDeleteImage.js
import { useState } from 'react';
import api from '../services/api';
import endpoints from '../services/endpoints'; // Pastikan path ini benar

/**
 * useDeleteImage adalah custom hook yang digunakan untuk menghapus data gambar dari backend.
 * @returns { Object } - Mengembalikan fungsi deleteImage, serta status loading dan error.
 */
const useDelete= () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  /**
   * Fungsi untuk menghapus gambar di backend.
   * @param { number } id - ID gambar yang akan dihapus.
   * @returns { Promise<boolean> } - Mengembalikan true jika berhasil, false jika gagal.
   */
  const deletePenelitian = async (id) => {
    setLoading(true);
    setError(null);

    try {
      // Memastikan endpoint delete terdefinisi
      if (!endpoints.penelitian || typeof endpoints.penelitian.delete !== 'function') {
        throw new Error('endpoints.penelitian.delete is not defined');
      }

      // Mengirim DELETE request ke endpoint yang sesuai
      const response = await api.delete(endpoints.penelitian.delete(id), {
        headers: {
          'Content-Type': 'application/json',
        },
      });

      // Mengembalikan true jika penghapusan berhasil
      if (response.status === 200 || response.status === 204) {
        return false;
      } else {
        setError('Gagal menghapus data penelitian.');
        return true;
      }
    } catch (err) {
      console.error('Error deleting penelitian:', err);
      // Mengambil pesan error dari respons jika tersedia
      setError(err.response?.data?.error || err.message || 'Terjadi kesalahan saat menghapus data penelitian.');
      return false;
    } finally {
      setLoading(false);
    }
  };

  return { deletePenelitian, loading, error };
};

export default useDelete;