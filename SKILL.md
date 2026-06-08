# SKILL.md - Tech Stack & Kompetensi Fundamental

Dokumen ini memetakan keahlian teknis dan saintifik yang diperlukan untuk membangun platform generator ilustrasi publikasi (fokus pada fungsionalitas mirip Figurelabs.ai).

## 1. Literasi Saintifik & Validasi Visual (Critical Skills)
* **Scientific Data Visualization:** Kemampuan menerjemahkan *prompt* teks menjadi grafik atau diagram yang bebas dari misrepresentasi data (misalnya, menghindari distorsi skala pada grafik batang atau kesalahan proyeksi pada data geospasial).
* **Academic Formatting Standards:** Pemahaman terhadap kaidah visual untuk publikasi jurnal (seperti ketebalan garis minimal, resolusi 300+ DPI untuk cetak, dan penggunaan *font* *sans-serif* yang terbaca pada ukuran kecil).

## 2. Web Frontend Development
* **JavaScript (ES6+) & React:** Membangun *state management* untuk *canvas* interaktif dan antarmuka pengguna yang reaktif tanpa lag.
* **Tailwind CSS:** *Styling* aplikasi secara responsif dan modern dengan *footprint* memori yang sangat kecil, menjaga kinerja *browser* tetap ringan.
* **Vite:** Pengelolaan *build tool* dan *local server* yang super cepat, dioptimalkan untuk perangkat dengan keterbatasan memori.

## 3. Image Processing & Integrasi Model AI
* **HTML5 Canvas API:** Manipulasi gambar langsung di peramban. Mencakup seleksi area spesifik (*Region Redraw*), penghapusan latar secara komputasional (*green screen removal*), dan penambahan anotasi saintifik.
* **REST API & AI Orchestration:** Menghubungkan *frontend* dengan model *Text-to-Figure* atau *Sketch-to-Figure*, memastikan *prompt* yang dikirim telah divalidasi oleh "filter saintifik" sebelum diproses oleh model.
* **Vectorization & SVG Export:** Keahlian krusial untuk mengonversi hasil *render* atau instruksi *canvas* menjadi *Scalable Vector Graphics* (SVG) agar kualitas figur tetap presisi (*lossless*) saat disisipkan ke dalam draf publikasi.

## 4. Deployment & Manajemen Proyek
* **GitHub:** Penerapan *version control* yang disiplin, memfasilitasi eksperimen fitur AI baru melalui percabangan (*branching*) yang rapi.
* **Vercel:** Proses *hosting frontend* terotomatisasi (*Continuous Deployment*) untuk *feedback loop* yang cepat selama masa pengembangan.