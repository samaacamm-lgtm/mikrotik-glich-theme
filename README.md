<div align="center">

# 🔴 MikroTik Hotspot — Red Glitch Theme

**Tema halaman hotspot MikroTik RouterOS bergaya cyber-glitch merah-hitam,**
**lengkap dengan halaman login, status, logout, dan mini-game shoot 'em up.**

![MikroTik](https://img.shields.io/badge/MikroTik-RouterOS-red?style=for-the-badge)
![HTML5](https://img.shields.io/badge/HTML5-E34F26?style=for-the-badge&logo=html5&logoColor=white)
![CSS3](https://img.shields.io/badge/CSS3-1572B6?style=for-the-badge&logo=css3&logoColor=white)
![JavaScript](https://img.shields.io/badge/JavaScript-F7DF1E?style=for-the-badge&logo=javascript&logoColor=black)
![License](https://img.shields.io/badge/License-MIT-crimson?style=for-the-badge)

</div>

---

## 📸 Preview

| Login | Status |
|:---:|:---:|
| ![Login](screenshots/login.png) | ![Status](screenshots/status.png) |

| Logout | Mini-game |
|:---:|:---:|
| ![Logout](screenshots/logout.png) | ![Game](screenshots/game.png) |

---

## ✨ Fitur

- 🎨 **Desain neon merah-hitam** — efek glow, grid scanline, dan partikel latar yang halus
- 🔐 **Halaman login** — form username & password dengan tombol *Connect Now*
- 📊 **Halaman status** — IP address, bytes up/down, waktu terhubung, dan interval refresh
- 🚪 **Halaman logout** — ringkasan sesi: durasi, total traffic, user, IP, dan MAC address
- 🎮 **Mini-game `game.html`** — *Mission // 2777: Red Glitch Air Combat*, hiburan saat menunggu
- 📱 **Responsif** — tampil baik di desktop maupun HP
- ⚡ **Ringan** — murni HTML, CSS, dan JavaScript tanpa framework

---

## 🎮 Mission // 2777 — Red Glitch Air Combat

Game pesawat tembak-menembak vertikal yang tersembunyi di dalam tema ini.

| Kontrol | Fungsi |
|---|---|
| `W` `A` `S` `D` / Tombol panah | Gerak pesawat |
| `Space` | Tembak |
| `X` | Glitch Bomb |
| Sentuh & geser | Kontrol di HP |

**HUD:** Score, Hi-Score, Sector, Lives, Bombs, dan hitungan menuju Boss berikutnya.
Tersedia tombol **Sound: ON/OFF** dan **Exit** untuk kembali ke halaman hotspot.

Akses lewat: `http://<alamat-hotspot>/game.html`

---

## 📁 Struktur File

> Sesuaikan dengan isi repo kamu.

```
.
├── login.html        # Halaman login hotspot
├── status.html       # Halaman status sesi aktif
├── logout.html       # Halaman setelah logout
├── game.html         # Mini-game Mission // 2777
├── alogin.html       # (opsional) halaman setelah login berhasil
├── error.html        # (opsional) halaman error
├── md5.js            # Diperlukan untuk login CHAP
├── css/              # Stylesheet
├── img/              # Logo dan aset gambar
└── screenshots/      # Gambar preview untuk README
```

---

## 🚀 Instalasi

### Opsi 1 — Lewat WinBox

1. Buka **WinBox** dan login ke router MikroTik.
2. Masuk ke menu **Files**.
3. Buat folder baru, misalnya `hotspot-red`.
4. Upload seluruh file tema ke folder tersebut.
5. Arahkan hotspot profile ke folder itu:

   ```routeros
   /ip hotspot profile set [find name=hsprof1] html-directory=hotspot-red
   ```

   *(ganti `hsprof1` dengan nama hotspot profile kamu)*

### Opsi 2 — Lewat FTP

1. Pastikan layanan FTP aktif di router:

   ```routeros
   /ip service enable ftp
   ```

2. Upload folder tema ke router memakai klien FTP favoritmu.
3. Atur `html-directory` seperti pada Opsi 1.

### Opsi 3 — Clone repo

```bash
git clone https://github.com/samaacamm-lgtm/<nama-repo>.git
cd <nama-repo>
```

Lalu upload isinya ke router seperti di atas.

---

## 🔧 Kustomisasi

### Warna

Ubah warna utama di bagian variabel CSS (jika dipakai) atau cari kode warna merah di file stylesheet:

```css
:root {
  --accent: #ff0a3c;   /* merah neon utama */
  --bg: #050005;       /* latar gelap */
}
```

### Teks & Branding

Ubah judul, deskripsi, dan label (misalnya `HOTSPOT ACCESS`, `GATEWAY ONLINE`) langsung di file `login.html`, `status.html`, dan `logout.html`.

### Variabel MikroTik

Tema ini memakai variabel bawaan hotspot MikroTik, misalnya:

| Variabel | Isi |
|---|---|
| `$(username)` | Nama user yang login |
| `$(ip)` | IP address klien |
| `$(mac)` | MAC address klien |
| `$(uptime)` | Lama sesi |
| `$(bytes-in-nice)` / `$(bytes-out-nice)` | Total traffic upload / download |
| `$(link-login-only)` | Tautan aksi login |
| `$(link-logout)` | Tautan aksi logout |

> Jangan hapus atau ubah nama variabel ini, karena akan diganti otomatis oleh RouterOS saat halaman ditampilkan.

---

## ✅ Kompatibilitas

- MikroTik **RouterOS v6 / v7**
- Browser modern: Chrome, Edge, Firefox, Safari, dan browser HP

---

## 🛠️ Troubleshooting

**Halaman tetap tampil default MikroTik**
Pastikan `html-directory` pada hotspot profile sudah mengarah ke folder tema, lalu bersihkan cache browser.

**Gambar atau CSS tidak muncul**
Cek apakah folder `css/` dan `img/` ikut terupload dan path-nya di HTML sudah benar.

**Login gagal padahal user benar**
Pastikan `md5.js` ada di folder tema jika memakai login CHAP.

**Game tidak bisa dibuka sebelum login**
Tambahkan entri di **Walled Garden** atau **Walled Garden IP List** agar `game.html` dapat diakses tanpa login.

---

## 🤝 Kontribusi

Pull request dan saran sangat diterima.

1. Fork repo ini
2. Buat branch fitur (`git checkout -b fitur-baru`)
3. Commit perubahan (`git commit -m "Tambah fitur baru"`)
4. Push ke branch (`git push origin fitur-baru`)
5. Buka Pull Request

---

## 📄 Lisensi

Dirilis di bawah lisensi [MIT](LICENSE). Bebas dipakai dan dimodifikasi.

> MikroTik dan RouterOS adalah merek dagang milik SIA Mikrotīkls. Proyek ini tidak berafiliasi dengan MikroTik.

---

<div align="center">

Dibuat dengan ❤️ dan terlalu banyak warna merah oleh [@samaacamm-lgtm](https://github.com/samaacamm-lgtm)

⭐ Kasih bintang kalau tema ini berguna!

</div>
