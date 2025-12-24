import { Entity, Column, PrimaryGeneratedColumn, CreateDateColumn, UpdateDateColumn } from 'typeorm';
import { ApiProperty } from '@nestjs/swagger';

@Entity('patients')
export class Patient {
  @ApiProperty({ example: 1, description: 'ID unik pasien' })
  @PrimaryGeneratedColumn()
  id: number;

  @ApiProperty({ example: 'John Doe', description: 'Nama lengkap pasien' })
  @Column({ length: 100 })
  nama: string;

  @ApiProperty({ example: '1234567890123456', description: 'Nomor Induk Kependudukan (16 digit)' })
  @Column({ length: 20, unique: true })
  nik: string;

  @ApiProperty({ example: '1990-05-15', description: 'Tanggal lahir pasien (YYYY-MM-DD)' })
  @Column({ type: 'date' })
  tanggal_lahir: Date;

  @ApiProperty({ example: 'Laki-laki', description: 'Jenis kelamin pasien', enum: ['Laki-laki', 'Perempuan'] })
  @Column({ length: 20 })
  jenis_kelamin: string;

  @ApiProperty({ example: 'Jl. Contoh No. 123, Jakarta', description: 'Alamat lengkap pasien' })
  @Column({ type: 'text' })
  alamat: string;

  @ApiProperty({ example: '081234567890', description: 'Nomor telepon pasien' })
  @Column({ length: 15 })
  no_telepon: string;

  @ApiProperty({ example: 'john@example.com', description: 'Email pasien (opsional)', required: false })
  @Column({ length: 100, nullable: true })
  email: string;

  @ApiProperty({ example: 'O', description: 'Golongan darah pasien', enum: ['A', 'B', 'AB', 'O'] })
  @Column({ length: 5 })
  golongan_darah: string;

  @ApiProperty({ example: '2024-01-15T10:30:00Z', description: 'Waktu data dibuat' })
  @CreateDateColumn()
  created_at: Date;

  @ApiProperty({ example: '2024-01-15T10:30:00Z', description: 'Waktu data terakhir diupdate' })
  @UpdateDateColumn()
  updated_at: Date;
}
