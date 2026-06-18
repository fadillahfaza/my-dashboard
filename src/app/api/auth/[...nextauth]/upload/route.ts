import { NextResponse } from 'next/server';

export async function POST(request: Request) {
  try {
    const formData = await request.formData();
    const file = formData.get('document') as File;

    if (!file) {
      return NextResponse.json({ error: 'Tidak ada file yang dipilih.' }, { status: 400 });
    }

    // Mengambil data dasar file untuk dikembalikan ke frontend
    return NextResponse.json({
      success: true,
      fileName: file.name,
      fileType: file.type,
      fileSize: `${(file.size / (1024 * 1024)).toFixed(2)} MB`,
      uploadedAt: new Date().toLocaleString('id-ID'),
    });
  } catch (error) {
    return NextResponse.json({ error: 'Gagal memproses file.' }, { status: 500 });
  }
}