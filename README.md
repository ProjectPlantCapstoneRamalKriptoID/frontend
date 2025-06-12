# Frontend Ramal Kripto.id

Aplikasi web frontend untuk platform prediksi cryptocurrency yang dikembangkan sebagai bagian dari Capstone Project. Aplikasi ini menyediakan interface yang user-friendly untuk mengakses prediksi harga cryptocurrency secara real-time.

### Prerequisites

- [Node.js](https://nodejs.org/) (disarankan versi 12 atau lebih tinggi)
- [npm](https://www.npmjs.com/) (Node package manager)

### Installation

1. Clone the repository

   ```bash
   git clone https://github.com/ProjectPlantCapstoneRamalKriptoID/frontend
   cd frontend
   ```

2. Install dependencies

   ```bash
   npm install
   ```

## Scripts

- Build for Production:

  ```shell
  npm run build
  ```

  Script ini menjalankan webpack dalam mode production menggunakan konfigurasi `webpack.prod.js` dan menghasilkan sejumlah file build ke direktori `dist`.

- Start Development Server:

  ```shell
  npm run start-dev
  ```

  Script ini menjalankan server pengembangan webpack dengan fitur live reload dan mode development sesuai konfigurasi di`webpack.dev.js`.

- Serve:
  ```shell
  npm run serve
  ```
  Script ini menggunakan [`http-server`](https://www.npmjs.com/package/http-server) untuk menyajikan konten dari direktori `dist`.
