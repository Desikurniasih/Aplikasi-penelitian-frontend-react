import React from 'react';
import useAPI from '../hooks/useAPI';
import endpoints from '../services/endpoints';
import { FaCode, FaMapMarkerAlt, FaCalendarAlt, FaClock } from "react-icons/fa";

function Penelitian() {
 
  const { data: penelitian, loading, error } = useAPI(endpoints.penelitian.getAll);

  
  console.log('Data penelitian:',penelitian);

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
  console.log(penelitianList);

  return (
    <div className="container mx-auto p-6 max-w-screen-lg">
    <h1 className="text-4xl text-center font-extrabold text-gray-900 mb-8">
      📋 Data Penelitian
    </h1>
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
      {penelitianList.length > 0 ? (
        penelitianList.map((penelitian) => (
          <div
            key={penelitian.id}
            className="bg-gradient-to-br from-white to-gray-50 shadow-lg hover:shadow-xl rounded-xl p-6 border border-gray-200 hover:scale-105 transition-transform duration-200"
          >
            <h2 className="text-xl font-bold text-gray-800 mb-2">
              {penelitian.judul}
            </h2>
            <div className="text-sm text-gray-600 space-y-2 mb-4">
      <p className="flex items-center">
        <FaCode className="mr-2 text-blue-500" />
        <span className="font-semibold">Kode:</span> {penelitian.kd_penelitian}
      </p>
      <p className="flex items-center">
        <FaMapMarkerAlt className="mr-2 text-red-500" />
        <span className="font-semibold">Lokasi:</span> {penelitian.lokasi}
      </p>
      <p className="flex items-center">
        <FaCalendarAlt className="mr-2 text-green-500" />
        <span className="font-semibold">Tahun Akademik:</span>{" "}
        {penelitian.thn_akademik}
      </p>
      <p className="flex items-center">
          <FaClock className="mr-2 text-purple-500" />
          <span className="font-semibold">Tanggal:</span> {new Date(penelitian.tanggal).toLocaleDateString()}
        </p>
            </div>
            <p className="text-sm font-semibold">
  Status:{" "}
  <span
    className={`inline-block px-3 py-1 text-sm rounded-lg ${
      penelitian.status === "Aktif"
        ? "bg-blue-500 text-white"
        : penelitian.status === "selesai"
        ? "bg-green-500 text-white"
        : "bg-green-500 text-white"
    }`}
  >
    {penelitian.status}
  </span>
</p>

          </div>
        ))
      ) : (
        <p className="text-center text-gray-500 col-span-full">
          Tidak ada data penelitian
        </p>
      )}
    </div>
  </div>
  

  
  );
}

export default Penelitian;
