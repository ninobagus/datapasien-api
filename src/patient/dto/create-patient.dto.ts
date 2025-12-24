import { IsNotEmpty, IsString, IsEmail, IsOptional, IsDateString, MaxLength, Matches,Length } from 'class-validator';
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';

export class CreatePatientDto {
  @ApiProperty({
    example: 'John Doe',
    description: 'Nama lengkap pasien',
    maxLength: 100,
  })
  @IsNotEmpty({ message: 'Nama tidak boleh kosong' })
  @IsString({ message: 'Nama harus berupa string' })
  @MaxLength(100, { message: 'Nama maksimal 100 karakter' })
  nama: string;

  @ApiProperty({
    example: '1234567890123456',
    description: 'Nomor Induk Kependudukan (hanya angka)',
    maxLength: 16
  })
  @IsNotEmpty({ message: 'NIK tidak boleh kosong' })
  @IsString({ message: 'NIK harus berupa string' })
  @Length(16, 16, { message: 'NIK harus tepat 16 digit' })
  @Matches(/^[0-9]+$/, { message: 'NIK hanya boleh berisi angka' })
  nik: string;

  @ApiProperty({
    example: '1990-05-15',
    description: 'Tanggal lahir dalam format YYYY-MM-DD',
  })
  @IsNotEmpty({ message: 'Tanggal lahir tidak boleh kosong' })
  @IsDateString({}, { message: 'Format tanggal lahir tidak valid (gunakan YYYY-MM-DD)' })
  tanggal_lahir: string;

  @ApiProperty({
    example: 'Laki-laki',
    description: 'Jenis kelamin pasien',
    enum: ['Laki-laki', 'Perempuan'],
  })
  @IsNotEmpty({ message: 'Jenis kelamin tidak boleh kosong' })
  @IsString({ message: 'Jenis kelamin harus berupa string' })
  jenis_kelamin: string;

  @ApiProperty({
    example: 'Jl. Contoh No. 123, Jakarta Selatan',
    description: 'Alamat lengkap pasien',
  })
  @IsNotEmpty({ message: 'Alamat tidak boleh kosong' })
  @IsString({ message: 'Alamat harus berupa string' })
  alamat: string;

  @ApiProperty({
    example: '081234567890',
    description: 'Nomor telepon pasien',
    maxLength: 15,
  })
  @IsNotEmpty({ message: 'No telepon tidak boleh kosong' })
  @IsString({ message: 'No telepon harus berupa string' })
  @MaxLength(15, { message: 'No telepon maksimal 15 karakter' })
  no_telepon: string;

  @ApiPropertyOptional({
    example: 'john@example.com',
    description: 'Alamat email pasien (opsional)',
  })
  @IsOptional()
  @IsEmail({}, { message: 'Format email tidak valid' })
  email?: string;

  @ApiProperty({
    example: 'O',
    description: 'Golongan darah pasien',
    enum: ['A', 'B', 'AB', 'O'],
    maxLength: 5,
  })
  @IsNotEmpty({ message: 'Golongan darah tidak boleh kosong' })
  @IsString({ message: 'Golongan darah harus berupa string' })
  @MaxLength(2, { message: 'Golongan darah maksimal 2 karakter' })
  @Matches(/^[A-Za-z]+$/, { message: 'Golongan darah hanya boleh berisi huruf' })
  @Matches(/^(A|B|AB|O)$/i, { message: 'Golongan darah harus A, B, AB, atau O' })
  golongan_darah: string;
}
