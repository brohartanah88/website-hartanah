/* =========================================================
   FAIL INI SAHAJA YANG PERLU ANDA UBAH
   ---------------------------------------------------------
   1. TETAPAN  -> nama agensi, no. WhatsApp, emel, dll.
   2. SENARAI_HARTANAH -> tambah / buang / ubah hartanah.

   Untuk gambar sebenar: letak fail gambar dalam folder
   "images/" dan tulis namanya, contoh: "images/rumah-shah-alam.jpg"
   ========================================================= */

const TETAPAN = {
  namaAgensi: "Khairul Hartanah",
  slogan: "Cari rumah idaman anda dengan mudah",
  // Format antarabangsa tanpa "+" atau "-" (contoh: 60123456789)
  noWhatsApp: "60123456789",
  noTelefonPaparan: "012-345 6789",
  email: "emel@contoh.com",
  alamat: "Shah Alam, Selangor",
  noREN: "REN 00000", // No. pendaftaran ejen (jika ada)
  facebook: "",        // contoh: "https://facebook.com/namapage"
  instagram: "",       // contoh: "https://instagram.com/namaakaun"
  tiktok: ""
};

const SENARAI_HARTANAH = [
  {
    id: 1,
    tajuk: "Rumah Teres 2 Tingkat, Seksyen 7",
    status: "Jual",            // "Jual" atau "Sewa"
    jenis: "Rumah Teres",      // Rumah Teres, Kondominium, Banglo, Semi-D, Apartment, Tanah, Kedai
    harga: 650000,             // Harga (RM). Untuk sewa: harga sebulan
    lokasi: "Seksyen 7, Shah Alam",
    negeri: "Selangor",
    bilik: 4,
    bilikAir: 3,
    keluasan: 1650,            // kaki persegi
    pegangan: "Freehold",      // Freehold / Leasehold
    gambar: "images/teres.svg",
    unggulan: true,            // true = paparan "Pilihan"
    penerangan: "Rumah teres 2 tingkat dalam kawasan matang dan selesa. Berhampiran sekolah, masjid, pasar raya dan akses mudah ke lebuh raya Persekutuan dan ELITE.",
    ciri: ["Renovated dapur", "Pagar & grill penuh", "Dekat sekolah", "Bebas banjir"]
  },
  {
    id: 2,
    tajuk: "Kondominium Pemandangan KLCC",
    status: "Sewa",
    jenis: "Kondominium",
    harga: 3200,
    lokasi: "Jalan Ampang, Kuala Lumpur",
    negeri: "Kuala Lumpur",
    bilik: 3,
    bilikAir: 2,
    keluasan: 1200,
    pegangan: "Freehold",
    gambar: "images/kondo.svg",
    unggulan: true,
    penerangan: "Unit tingkat tinggi dengan pemandangan KLCC. Lengkap berperabot, sedia untuk dimasuki. Kemudahan kolam renang, gim dan keselamatan 24 jam.",
    ciri: ["Fully furnished", "Kolam renang", "Gim", "Keselamatan 24 jam", "2 tempat letak kereta"]
  },
  {
    id: 3,
    tajuk: "Banglo Moden dengan Taman Luas",
    status: "Jual",
    jenis: "Banglo",
    harga: 2380000,
    lokasi: "Bukit Jelutong, Shah Alam",
    negeri: "Selangor",
    bilik: 6,
    bilikAir: 5,
    keluasan: 5200,
    pegangan: "Freehold",
    gambar: "images/banglo.svg",
    unggulan: true,
    penerangan: "Banglo 2.5 tingkat reka bentuk moden dalam komuniti berpengawal. Taman landskap luas, sesuai untuk keluarga besar.",
    ciri: ["Gated & guarded", "Taman landskap", "Bilik pembantu", "Ruang bumbung"]
  },
  {
    id: 4,
    tajuk: "Tanah Pertanian 2 Ekar",
    status: "Jual",
    jenis: "Tanah",
    harga: 380000,
    lokasi: "Kuala Pilah",
    negeri: "Negeri Sembilan",
    bilik: 0,
    bilikAir: 0,
    keluasan: 87120,
    pegangan: "Freehold",
    gambar: "images/tanah.svg",
    unggulan: false,
    penerangan: "Tanah pertanian rata, ada akses jalan tar dan bekalan elektrik berhampiran. Sesuai untuk dusun, homestay atau pelaburan jangka panjang.",
    ciri: ["Geran individu", "Jalan tar", "Tanah rata", "Ada sungai berhampiran"]
  },
  {
    id: 5,
    tajuk: "Apartment Mampu Milik, Setia Alam",
    status: "Jual",
    jenis: "Apartment",
    harga: 285000,
    lokasi: "Setia Alam, Shah Alam",
    negeri: "Selangor",
    bilik: 3,
    bilikAir: 2,
    keluasan: 900,
    pegangan: "Leasehold",
    gambar: "images/kondo.svg",
    unggulan: false,
    penerangan: "Apartment 3 bilik sesuai untuk pembeli rumah pertama. Berhampiran Setia City Mall dan pengangkutan awam.",
    ciri: ["Sesuai rumah pertama", "Dekat mall", "Lif", "Taman permainan"]
  },
  {
    id: 6,
    tajuk: "Rumah Semi-D 1 Tingkat",
    status: "Sewa",
    jenis: "Semi-D",
    harga: 1800,
    lokasi: "Bandar Baru Bangi",
    negeri: "Selangor",
    bilik: 4,
    bilikAir: 2,
    keluasan: 2400,
    pegangan: "Freehold",
    gambar: "images/banglo.svg",
    unggulan: false,
    penerangan: "Rumah semi-D setingkat, sesuai untuk keluarga dengan warga emas. Laman tepi yang luas dan kawasan yang tenang.",
    ciri: ["Partially furnished", "Laman tepi", "Kawasan tenang", "Dekat UKM"]
  },
  {
    id: 7,
    tajuk: "Lot Kedai 3 Tingkat Tepi Jalan Utama",
    status: "Jual",
    jenis: "Kedai",
    harga: 1450000,
    lokasi: "Bandar Hilir, Melaka",
    negeri: "Melaka",
    bilik: 0,
    bilikAir: 3,
    keluasan: 4800,
    pegangan: "Leasehold",
    gambar: "images/kedai.svg",
    unggulan: false,
    penerangan: "Lot kedai di lokasi strategik tepi jalan utama, banyak tempat letak kereta. Tingkat bawah kini disewa — pulangan sewa segera.",
    ciri: ["Tepi jalan utama", "Ada penyewa", "Banyak parking", "Kawasan pelancongan"]
  },
  {
    id: 8,
    tajuk: "Rumah Teres 1 Tingkat Dekat Bandar",
    status: "Jual",
    jenis: "Rumah Teres",
    harga: 320000,
    lokasi: "Taman Universiti, Skudai",
    negeri: "Johor",
    bilik: 3,
    bilikAir: 2,
    keluasan: 1300,
    pegangan: "Freehold",
    gambar: "images/teres.svg",
    unggulan: false,
    penerangan: "Rumah teres setingkat berhampiran UTM dan pusat bandar. Sesuai untuk diduduki sendiri atau disewakan kepada pelajar.",
    ciri: ["Dekat UTM", "Sesuai pelaburan", "Kawasan matang"]
  }
];
