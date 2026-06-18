'use client';

import { useState } from 'react';

// Definisi tipe data file
interface UploadedFile {
  fileName: string;
  fileType: string;
  fileSize: string;
  uploadedAt: string;
}

export default function DashboardPage() {
  const [files, setFiles] = useState<UploadedFile[]>([]);
  const [filterType, setFilterType] = useState<string>('all');
  const [uploading, setUploading] = useState<boolean>(false);

  // Fungsi Handle Upload
  const handleUpload = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setUploading(true);

    const formData = new FormData(e.currentTarget);
    
    try {
      const response = await fetch('/api/upload', {
        method: 'POST',
        body: formData,
      });

      const data = await response.json();

      if (data.success) {
        // Tambahkan file baru ke daftar state
        setFiles((prevFiles) => [data, ...prevFiles]);
        alert('File berhasil diunggah (tersimpan sementara di memori)!');
        (e.target as HTMLFormElement).reset();
      } else {
        alert(data.error || 'Gagal mengunggah file.');
      }
    } catch (error) {
      alert('Terjadi kesalahan sistem.');
    } finally {
      setUploading(false);
    }
  };

  // Logika Filter Data File
  const filteredFiles = files.filter((file) => {
    if (filterType === 'all') return true;
    if (filterType === 'pdf') return file.fileType.includes('pdf');
    if (filterType === 'image') return file.fileType.includes('image') || file.fileType.includes('png') || file.fileType.includes('jpeg');
    return true;
  });

  return (
    <div style={{ padding: '2rem', maxWidth: '1200px', margin: '0 auto', fontFamily: 'sans-serif' }}>
      <h1 style={{ marginBottom: '1.5rem' }}>Dashboard Ritel - Manajemen File</h1>

      {/* 1. FORM UPLOAD FILE */}
      <div style={{ background: '#f5f5f5', padding: '1.5rem', borderRadius: '8px', marginBottom: '2rem' }}>
        <form onSubmit={handleUpload} style={{ display: 'flex', gap: '1rem', alignItems: 'center' }}>
          <div>
            <label htmlFor="document" style={{ display: 'block', marginBottom: '0.5rem', fontWeight: 'bold' }}>Pilih File (PDF / Gambar):</label>
            <input type="file" id="document" name="document" accept=".pdf,image/*" required />
          </div>
          <button type="submit" disabled={uploading} style={{ padding: '0.5rem 1rem', background: '#0070f3', color: '#fff', border: 'none', borderRadius: '4px', cursor: 'pointer', alignSelf: 'flex-end' }}>
            {uploading ? 'Mengunggah...' : 'Unggah File'}
          </button>
        </form>
      </div>

      {/* 2. FILTER FILE */}
      <div style={{ marginBottom: '1rem', display: 'flex', gap: '1rem', alignItems: 'center' }}>
        <label htmlFor="filter" style={{ fontWeight: 'bold' }}>Filter Format:</label>
        <select id="filter" value={filterType} onChange={(e) => setFilterType(e.target.value)} style={{ padding: '0.5rem', borderRadius: '4px' }}>
          <option value="all">Semua Format File</option>
          <option value="pdf">Dokumen (PDF)</option>
          <option value="image">Gambar (PNG / JPG)</option>
        </select>
      </div>

      {/* 3. TABEL DAFTAR FILE */}
      <table style={{ width: '100%', borderCollapse: 'collapse', marginTop: '1rem' }}>
        <thead>
          <tr style={{ background: '#333', color: '#fff', textAlign: 'left' }}>
            <th style={{ padding: '0.75rem', border: '1px solid #ddd' }}>Nama File</th>
            <th style={{ padding: '0.75rem', border: '1px solid #ddd' }}>Ukuran</th>
            <th style={{ padding: '0.75rem', border: '1px solid #ddd' }}>Tanggal Unggah</th>
            <th style={{ padding: '0.75rem', border: '1px solid #ddd' }}>Tipe</th>
          </tr>
        </thead>
        <tbody>
          {filteredFiles.length === 0 ? (
            <tr>
              <td colSpan={4} style={{ padding: '1rem', textAlign: 'center', border: '1px solid #ddd', color: '#666' }}>
                Tidak ada file yang ditemukan.
              </td>
            </tr>
          ) : (
            filteredFiles.map((file, index) => (
              <tr key={index} style={{ borderBottom: '1px solid #ddd' }}>
                <td style={{ padding: '0.75rem', border: '1px solid #ddd' }}>{file.fileName}</td>
                <td style={{ padding: '0.75rem', border: '1px solid #ddd' }}>{file.fileSize}</td>
                <td style={{ padding: '0.75rem', border: '1px solid #ddd' }}>{file.uploadedAt}</td>
                <td style={{ padding: '0.75rem', border: '1px solid #ddd' }}>
                  <span style={{ padding: '0.25rem 0.5rem', borderRadius: '4px', background: file.fileType.includes('pdf') ? '#ff4d4f' : '#52c41a', color: '#fff', fontSize: '12px' }}>
                    {file.fileType.includes('pdf') ? 'PDF' : 'IMAGE'}
                  </span>
                </td>
              </tr>
            ))
          )}
        </tbody>
      </table>
    </div>
  );
}