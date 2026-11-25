# Website Hartanah

Laman web hartanah statik (HTML, CSS dan JavaScript sahaja). Tiada server dan tiada database, jadi boleh dihos **percuma** di GitHub Pages.

## Ciri-ciri
- Senarai hartanah dengan penapis (jual/sewa, jenis, negeri, bilik) dan susunan harga
- Popup butiran hartanah dengan butang **WhatsApp** (mesej siap ditulis dengan nama hartanah)
- Kalkulator pinjaman rumah
- Borang hubungi yang menghantar mesej terus ke WhatsApp
- Butang WhatsApp terapung, mesra telefon bimbit

## Cara ubah kandungan
Semua maklumat ada dalam **satu fail sahaja: `data/hartanah.js`**

1. **`TETAPAN`**: tukar nama agensi, no. WhatsApp (format `60123456789`), emel, alamat, no. REN, pautan Facebook/Instagram/TikTok.
2. **`SENARAI_HARTANAH`**: salin satu blok `{ ... },` untuk tambah hartanah baru. Pastikan setiap `id` berbeza.
3. **Gambar sebenar**: upload foto ke folder `images/` (contoh `images/rumah-seksyen7.jpg`), kemudian tukar `gambar: "images/rumah-seksyen7.jpg"`. Saiz foto yang dicadangkan ialah lebar ~1200px, nisbah 4:3.

Boleh edit terus di laman GitHub: buka fail, tekan ikon pensel ✏️, ubah, kemudian tekan **Commit changes**. Website akan dikemas kini sendiri dalam 1 hingga 2 minit.

## Hos percuma dengan GitHub Pages
1. Buka repo di GitHub, kemudian **Settings → Pages**
2. Di bahagian *Build and deployment*: **Source** pilih `Deploy from a branch`
3. **Branch** pilih branch yang ada fail ini, folder `/ (root)`, kemudian tekan **Save**
4. Tunggu 1 hingga 2 minit. Website anda akan berada di:
   `https://brohartanah88.github.io/website-hartanah/`

> Repo mesti **Public** untuk GitHub Pages percuma.

### Domain sendiri (pilihan)
Jika ada domain (contoh `brohartanah.com.my`), masukkan di **Settings → Pages → Custom domain** dan ikut arahan DNS GitHub. Hosting tetap percuma; anda hanya bayar domain.

### Pilihan hos percuma lain
Netlify, Cloudflare Pages atau Vercel juga percuma. Sambungkan repo ini, tiada build command, dan publish directory `/`.
