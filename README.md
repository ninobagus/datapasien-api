# Patient API - NestJS Backend + Swagger

## 🛠️ Tech Stack & Requirements

### Prerequisites
| Software | Version | Download |
|----------|---------|----------|
| Node.js | 18.x / 20.x (LTS) | [nodejs.org](https://nodejs.org/) |
| npm | 9.x / 10.x | Included with Node.js |
| PostgreSQL | 12.x - 16.x | [postgresql.org](https://www.postgresql.org/) |

### Backend Dependencies
| Package | Version |
|---------|---------|
| NestJS | ^10.0.0 |
| TypeORM | ^0.3.17 |
| Swagger | ^7.1.0 |
| PostgreSQL Driver (pg) | ^8.11.0 |
| class-validator | ^0.14.0 |
| TypeScript | ^5.1.3 |

## Instalasi

1. Pastikan PostgreSQL sudah terinstall dan berjalan
2. Buat database:
   ```sql
   CREATE DATABASE patient_db;
   ```

3. Update konfigurasi database di `src/app.module.ts` sesuai dengan credential PostgreSQL Anda

4. Install dependencies:
   ```bash
   npm install
   ```

5. Jalankan server:
   ```bash
   npm run start:dev
   ```

## URL

| URL | Deskripsi |
|-----|-----------|
| http://localhost:3001 | Backend Server |
| http://localhost:3001/api/docs | 📚 Swagger Documentation |

## API Endpoints

| Method | Endpoint | Deskripsi |
|--------|----------|-----------|
| GET | /api/patients | Ambil semua pasien |
| GET | /api/patients/:id | Ambil pasien by ID |
| GET | /api/patients/search?q=keyword | Cari pasien |
| POST | /api/patients | Tambah pasien baru |
| PATCH | /api/patients/:id | Update pasien |
| DELETE | /api/patients/:id | Hapus pasien |

## Contoh Request Body (POST/PATCH)

```json
{
  "nama": "John Doe",
  "nik": "1234567890123456",
  "tanggal_lahir": "1990-05-15",
  "jenis_kelamin": "Laki-laki",
  "alamat": "Jl. Contoh No. 123, Jakarta",
  "no_telepon": "081234567890",
  "email": "john@example.com",
  "golongan_darah": "O"
}
```

## Swagger Features

- 📖 Interactive API Documentation
- 🧪 Try out API endpoints directly
- 📋 Request/Response examples
- ✅ Validation error examples
- 🔍 Search and filter endpoints
