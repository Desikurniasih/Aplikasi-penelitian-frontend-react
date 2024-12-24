import React from 'react';
import { Link } from 'react-router-dom';
import { FaChartLine, FaClipboardList, FaFileAlt } from 'react-icons/fa';

function Home() {
    return (
        <div className="space-y-8 p-6 bg-gray-100">
            <div className="bg-gradient-to-r from-blue-500 to-blue-600 text-white shadow-lg rounded-lg p-8">
                <h1 className="text-4xl font-bold mb-4">Selamat Datang di Dashboard SIPENA</h1>
                <p className="text-lg mb-6">
                SIPENA (Sistem Informasi Penjaminan Mutu Penelitian) adalah sebuah platform digital yang mendukung pengelolaan mutu penelitian secara sistematis dan berkelanjutan. SIPENA memungkinkan pengelolaan data penelitian, monitoring capaian, pelaporan, serta evaluasi kinerja penelitian sesuai dengan standar mutu yang ditetapkan.                </p>
                <button className="bg-white text-blue-600 px-6 py-2 rounded-full font-semibold hover:bg-blue-100 transition duration-300">
                    Pelajari Lebih Lanjut
                </button>
            </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                    <div className="bg-white p-6 rounded-lg shadow-md hover:shadow-xl transition duration-300">
                        <FaChartLine className="text-4xl text-blue-500 mb-4" />
                        <h2 className="text-xl font-semibold mb-2">Statistik Penelitian</h2>
                        <ul className="space-y-2 text-gray-600">
                            <li>Proposal diterima: 15</li>
                            <li>Sedang berjalan: 8</li>
                            <li>Selesai: 3</li>
                        </ul>
                        <Link to="/penelitian" className="mt-4 inline-block text-blue-500 hover:underline">
                            Lihat Detail
                        </Link>
                    </div>

               

                    <div className="bg-white p-6 rounded-lg shadow-md hover:shadow-xl transition duration-300">
                    <FaClipboardList className="text-4xl text-yellow-500 mb-4" />
                    <h2 className="text-2xl font-semibold text-gray-800 mb-4">Ajukan Proposal Penelitian</h2>
                    <div className="space-y-4 text-gray-700">
                        <p className="text-sm">Silakan unggah proposal penelitian Anda dengan mengisi formulir berikut. Pastikan data yang Anda masukkan lengkap dan benar.</p>

                        
                    </div>

                    <button 
                     onClick={() => window.location.href = '/upload'} 
                    className="mt-6 bg-blue-500 text-white px-6 py-3 rounded-full hover:bg-blue-600 transition duration-300 w-full">
                        Ajukan Proposal
                    </button>
                    </div>


                <div className="bg-white p-6 rounded-lg shadow-md hover:shadow-xl transition duration-300">
                    <FaFileAlt className="text-4xl text-purple-500 mb-4" />
                    <h2 className="text-xl font-semibold mb-2">Panduan</h2>
                    <ul className="space-y-2 text-gray-600">
                    <div className="space-y-2 text-gray-600">
                        <p>Setiap langkah penelitian, mulai dari perencanaan hingga publikasi hasil penelitian, 
                            harus dilakukan dengan memperhatikan prinsip-prinsip etika penelitian yang berlaku dan standar mutu yang telah ditetapkan.</p>
                       
                    </div>
                        <li><a href="#" className="text-purple-500 hover:underline">Panduan Penelitian</a></li>
                    </ul>
                </div>
            </div>

            <div className="bg-white p-6 rounded-lg shadow-md">
                <h2 className="text-2xl font-semibold mb-4"> SIPENA (Sistem Informasi Penjaminan Mutu Penelitian) </h2>
                <ul className="space-y-4">
                    <li className="border-b pb-2">
                        <h3 className="font-medium">Penyusunan Laporan Penelitian</h3>
                        <p className="text-sm text-gray-600">Struktur dan format laporan penelitian yang baik</p>
                    </li>
                    <li className="border-b pb-2">
                        <h3 className="font-medium">Publikasi Hasil Penelitian</h3>
                        <p className="text-sm text-gray-600">Menyebarluaskan hasil penelitian ke jurnal atau konferensi ilmiah</p>
                    </li>
                    <li>
                        <h3 className="font-medium">Pengumpulan Data</h3>
                        <p className="text-sm text-gray-600">Pengumpulan data yang valid dan dapat dipertanggungjawabkan</p>
                    </li>
                </ul>
            </div>
        </div>
    );
}

export default Home;
