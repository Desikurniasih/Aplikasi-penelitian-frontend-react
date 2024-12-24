import React, { useState } from 'react';
import useAPI from '../hooks/useAPI';
import endpoints from '../services/endpoints';
import usePost from '../hooks/usePost';
import usePut from '../hooks/usePut';
import useDelete from '../hooks/useDelete';
import { FaEdit, FaTrashAlt } from "react-icons/fa";
function Upload() {
  const [id, setId] = useState('');
  const [postkd_pen, setpostkd_pen] = useState('');
  const [postjudul, setpostjudul] = useState('');
  const [postlokasi, setpostlokasi] = useState('');
  const [postthn, setpostthn] = useState('');
  const [posttanggal, setposttanggal] = useState('');
  const [poststatus, setpoststatus] = useState('');
  const [isEditing, setIsEditing] = useState(false);

  const { postPenelitian, loading: uploading, error: uploadError } = usePost();
  const { putPenelitian, loading: updating, error: updateError } = usePut();
  const { deletePenelitian, loading: deleting, error: deleteError } = useDelete();
  const { data: penelitian, loading, error, refetch } = useAPI(endpoints.penelitian.getAll);

  const handleUpload = async () => {
    try {
      const result = await postPenelitian(postkd_pen, postjudul, postlokasi, postthn, posttanggal, poststatus);
      if (result) {
        alert('Data Penelitian berhasil ditambahkan!');
        setpostkd_pen('');
        setpostjudul('');
        setpostlokasi('');
        setpostthn('');
        setposttanggal('');
        setpoststatus('');
        refetch();
      } else {
        alert('Gagal menambahkan data penelitian!');
      }
    } catch (error) {
      alert('Terjadi kesalahan saat mengirim data.');
    }
  };

  const handleEditClick = (penelitian) => {
    setId(penelitian.id);
    setpostkd_pen(penelitian.kd_penelitian);
    setpostjudul(penelitian.judul);
    setpostlokasi(penelitian.lokasi);
    setpostthn(penelitian.thn_akademik);
    setposttanggal(penelitian.tanggal);
    setpoststatus(penelitian.status);
    setIsEditing(true);
  };

  const handleCancelEdit = () => {
    setId(null);
    setpostkd_pen('');
    setpostjudul('');
    setpostlokasi('');
    setpostthn('');
    setposttanggal('');
    setpoststatus('');
    setIsEditing(false);
  };

  const handleUpdate = async () => {
    if (!postjudul.trim() || !postlokasi.trim() || !poststatus.trim()) {
      alert('Harap masukkan semua data.');
      return;
    }

    const result = await putPenelitian(id, postkd_pen, postjudul, postlokasi, postthn, posttanggal, poststatus);

    if (result) {
      alert('Data Penelitian berhasil diperbarui!');
      handleCancelEdit();
      refetch();
    } else {
      alert('Terjadi kesalahan saat memperbarui data penelitian.');
    }
  };

  const handleDeleteClick = async (id) => {
    const confirmDelete = window.confirm('Apakah Anda yakin ingin menghapus data ini?');
    if (!confirmDelete) return;

    const success = await deletePenelitian(id);
    if (success) {
      alert('Data Penelitian berhasil dihapus!');
      refetch();
    } else {
      alert(`Gagal menghapus data penelitian: ${deleteError}`);
    }
  };

  if (loading) {
    return (
      <div className="container mx-auto p-4">
        <h1 className="text-2xl font-bold mb-4">Data Penelitian</h1>
        <p>Loading...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="container mx-auto p-4">
        <h1 className="text-2xl font-bold mb-4">Data Penelitian</h1>
        <p className="text-red-500">Error: {error}</p>
      </div>
    );
  }

  const penelitianList = Array.isArray(penelitian.penelitian) ? penelitian.penelitian : [];

  return (
    <div className="container mx-auto p-6">
      <h1 className="text-3xl text-center font-bold mb-6">Manajemen Data Penelitian</h1>

      {!isEditing && (
        <form className="bg-gray-50 p-6 rounded-lg shadow-md mb-8">
        <h2 className="text-2xl text-center font-bold mb-6">Upload Penelitian</h2>
      
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {/* Input: Kode Akademik */}
          <div>
            <input
              type="number"
              placeholder="Kode Akademik"
              value={postkd_pen}
              onChange={(e) => setpostkd_pen(e.target.value)}
              className="w-full px-4 py-2 border rounded-lg"
            />
          </div>
      
          {/* Input: Judul */}
          <div>
            <input
              type="text"
              placeholder="Judul"
              value={postjudul}
              onChange={(e) => setpostjudul(e.target.value)}
              className="w-full px-4 py-2 border rounded-lg"
            />
          </div>
      
          {/* Input: Lokasi */}
          <div>
            <input
              type="text"
              placeholder="Lokasi"
              value={postlokasi}
              onChange={(e) => setpostlokasi(e.target.value)}
              className="w-full px-4 py-2 border rounded-lg"
            />
          </div>
      
          {/* Input: Tahun Akademik */}
          <div>
            <input
              type="text"
              placeholder="Tahun Akademik"
              value={postthn}
              onChange={(e) => setpostthn(e.target.value)}
              className="w-full px-4 py-2 border rounded-lg"
            />
          </div>
      
          {/* Input: Tanggal */}
          <div>
            <input
              type="date"
              value={posttanggal}
              onChange={(e) => setposttanggal(e.target.value)}
              className="w-full px-4 py-2 border rounded-lg"
            />
          </div>
      
          {/* Input: Status */}
          
          <div>
            <input
              type="text"
              placeholder="Status"
              value={poststatus}
              onChange={(e) => setpoststatus(e.target.value)}
              className="w-full px-4 py-2 border rounded-lg"
            />
          </div>

        </div>
      
        {/* Error Message */}
        {uploadError && <p className="text-red-500 mt-4 text-center">{uploadError}</p>}
      
        {/* Upload Button */}
        <button
          type="button"
          onClick={handleUpload}
          disabled={uploading}
          className={`mt-6 w-full py-2 px-4 font-semibold rounded bg-blue-500 hover:bg-blue-600 text-white transition-all ${
            uploading ? 'bg-gray-400 cursor-not-allowed' : ''
          }`}
        >
          {uploading ? 'Mengupload...' : 'Upload Data'}
        </button>
      </form>
      )}

      {isEditing && (
        <div className="mb-6">
          <h3 className="text-2xl text-center font-bold mb-6">Edit Penelitian</h3>
<form>
  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
    {/* Input: Kode Akademik */}
    <div>
      <input
        type="number"
        placeholder="Kode Akademik"
        value={postkd_pen}
        onChange={(e) => setpostkd_pen(e.target.value)}
        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
      />
    </div>

    {/* Input: Judul */}
    <div>
      <input
        type="text"
        placeholder="Judul"
        value={postjudul}
        onChange={(e) => setpostjudul(e.target.value)}
        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
      />
    </div>

    {/* Input: Lokasi */}
    <div>
      <input
        type="text"
        placeholder="Lokasi"
        value={postlokasi}
        onChange={(e) => setpostlokasi(e.target.value)}
        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
      />
    </div>

    {/* Input: Tahun Akademik */}
    <div>
      <input
        type="text"
        placeholder="Tahun Akademik"
        value={postthn}
        onChange={(e) => setpostthn(e.target.value)}
        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
      />
    </div>

    {/* Input: Tanggal */}
    <div>
      <input
        type="date"
        value={posttanggal}
        onChange={(e) => setposttanggal(e.target.value)}
        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
      />
    </div>

    {/* Input: Status */}
    <div>
            <input
              type="text"
              placeholder="Status"
              value={poststatus}
              onChange={(e) => setpoststatus(e.target.value)}
              className="w-full px-4 py-2 border rounded-lg"
            />
          </div>

  </div>

  <div className="flex gap-6 justify-center mt-6">
    <button
      type="button"
      onClick={handleUpdate}
      disabled={updating}
      className="bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 transition"
    >
      {updating ? 'Updating...' : 'Update Penelitian'}
    </button>
    <button
      type="button"
      onClick={handleCancelEdit}
      className="bg-red-500 text-white px-6 py-3 rounded-lg hover:bg-red-600 transition"
    >
      Batal
    </button>
  </div>
</form>
        </div>
      )}

<div className="overflow-x-auto shadow-xl rounded-lg border border-gray-200">
  <table className="min-w-full bg-white">
    <thead className="bg-gray-800 text-white">
      <tr>
        <th className="py-4 px-6 text-left text-sm font-medium">Kode Penelitian</th>
        <th className="py-4 px-6 text-left text-sm font-medium">Judul Penelitian</th>
        <th className="py-4 px-6 text-left text-sm font-medium">Lokasi</th>
        <th className="py-4 px-6 text-left text-sm font-medium">Tahun Akademik</th>
        <th className="py-4 px-6 text-left text-sm font-medium">Tanggal</th>
        <th className="py-4 px-6 text-left text-sm font-medium">Status</th>
        <th className="py-4 px-6 text-left text-sm font-medium">Action</th>
      </tr>
    </thead>
    <tbody>
      {penelitianList.length > 0 ? (
        penelitianList.map((penelitian) => (
          <tr key={penelitian.kd_penelitian} className="hover:bg-gray-50 border-b border-gray-200 transition-colors duration-300">
            <td className="py-4 px-6 text-center text-sm">{penelitian.kd_penelitian}</td>
            <td className="py-4 px-6 text-sm">{penelitian.judul}</td>
            <td className="py-4 px-6 text-center text-sm">{penelitian.lokasi}</td>
            <td className="py-4 px-6 text-center text-sm">{penelitian.thn_akademik}</td>
            <td className="py-4 px-6 text-center text-sm">
            {new Date(penelitian.tanggal).toLocaleDateString('id-ID')}
          </td>
            <td className="py-4 px-6 text-center text-sm">
              <span
                className={`${
                  penelitian.status.toLowerCase() === "aktif"
                    ? "text-blue-500 bg-blue-100 px-2 py-1 rounded"
                    : penelitian.status.toLowerCase() === "selesai"
                    ? "text-green-500 bg-green-100 px-2 py-1 rounded"
                    : "text-gray-700"
                }`}
              >
                {penelitian.status}
              </span>
            </td>



            <td className="py-4 px-6 text-center">
  <div className="flex justify-center gap-4">
    <button
      onClick={() => handleEditClick(penelitian)}
      className="p-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition duration-200"
    >
      <FaEdit className="text-lg" />
    </button>
    <button
      onClick={() => handleDeleteClick(penelitian.id)}
      className="p-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition duration-200"
    >
      <FaTrashAlt className="text-lg" />
    </button>
  </div>
</td>
          </tr>
        ))
      ) : (
        <tr>
          <td colSpan="7" className="text-center py-6 text-gray-500 text-sm">
            Tidak ada data penelitian yang tersedia.
          </td>
        </tr>
      )}
    </tbody>
  </table>
</div>

    </div>
  );
}

export default Upload;
