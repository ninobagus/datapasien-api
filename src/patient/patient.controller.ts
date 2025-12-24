import { Controller, Get, Post, Body, Patch, Param, Delete, Query, ParseIntPipe, HttpCode, HttpStatus } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiResponse, ApiParam, ApiQuery, ApiBody } from '@nestjs/swagger';
import { PatientService } from './patient.service';
import { CreatePatientDto } from './dto/create-patient.dto';
import { UpdatePatientDto } from './dto/update-patient.dto';
import { Patient } from './entities/patient.entity';

@ApiTags('patients')
@Controller('api/patients')
export class PatientController {
  constructor(private readonly patientService: PatientService) {}

  @Post()
  @HttpCode(HttpStatus.CREATED)
  @ApiOperation({ 
    summary: 'Tambah pasien baru',
    description: 'Membuat data pasien baru. NIK harus unik dan semua field wajib harus diisi.'
  })
  @ApiBody({ type: CreatePatientDto })
  @ApiResponse({ 
    status: 201, 
    description: 'Pasien berhasil ditambahkan',
    type: Patient 
  })
  @ApiResponse({ 
    status: 400, 
    description: 'Validasi gagal - Field wajib kosong atau format tidak valid',
    schema: {
      example: {
        success: false,
        statusCode: 400,
        message: 'Validasi gagal',
        errors: ['Nama tidak boleh kosong', 'NIK hanya boleh berisi angka'],
        timestamp: '2024-01-15T10:30:00.000Z'
      }
    }
  })
  @ApiResponse({ 
    status: 409, 
    description: 'NIK sudah terdaftar',
    schema: {
      example: {
        success: false,
        statusCode: 409,
        message: 'Pasien dengan NIK 1234567890123456 sudah terdaftar',
        errors: null,
        timestamp: '2024-01-15T10:30:00.000Z'
      }
    }
  })
  create(@Body() createPatientDto: CreatePatientDto) {
    return this.patientService.create(createPatientDto);
  }

  @Get()
  @ApiOperation({ 
    summary: 'Ambil semua data pasien',
    description: 'Mengambil seluruh data pasien yang tersimpan, diurutkan berdasarkan waktu pembuatan (terbaru dulu)'
  })
  @ApiResponse({ 
    status: 200, 
    description: 'Daftar semua pasien',
    type: [Patient] 
  })
  findAll() {
    return this.patientService.findAll();
  }

  @Get('search')
  @ApiOperation({ 
    summary: 'Cari pasien',
    description: 'Mencari pasien berdasarkan nama atau NIK (case-insensitive untuk nama)'
  })
  @ApiQuery({ 
    name: 'q', 
    required: false, 
    description: 'Kata kunci pencarian (nama atau NIK)',
    example: 'John'
  })
  @ApiResponse({ 
    status: 200, 
    description: 'Hasil pencarian pasien',
    type: [Patient] 
  })
  search(@Query('q') keyword: string) {
    return this.patientService.search(keyword || '');
  }

  @Get(':id')
  @ApiOperation({ 
    summary: 'Ambil pasien berdasarkan ID',
    description: 'Mengambil detail data pasien berdasarkan ID'
  })
  @ApiParam({ 
    name: 'id', 
    description: 'ID pasien',
    example: 1 
  })
  @ApiResponse({ 
    status: 200, 
    description: 'Data pasien ditemukan',
    type: Patient 
  })
  @ApiResponse({ 
    status: 404, 
    description: 'Pasien tidak ditemukan',
    schema: {
      example: {
        success: false,
        statusCode: 404,
        message: 'Pasien dengan ID 999 tidak ditemukan',
        errors: null,
        timestamp: '2024-01-15T10:30:00.000Z'
      }
    }
  })
  findOne(@Param('id', ParseIntPipe) id: number) {
    return this.patientService.findOne(id);
  }

  @Patch(':id')
  @ApiOperation({ 
    summary: 'Update data pasien',
    description: 'Mengupdate data pasien. Hanya field yang dikirim yang akan diupdate (partial update).'
  })
  @ApiParam({ 
    name: 'id', 
    description: 'ID pasien yang akan diupdate',
    example: 1 
  })
  @ApiBody({ type: UpdatePatientDto })
  @ApiResponse({ 
    status: 200, 
    description: 'Pasien berhasil diupdate',
    type: Patient 
  })
  @ApiResponse({ 
    status: 404, 
    description: 'Pasien tidak ditemukan' 
  })
  @ApiResponse({ 
    status: 409, 
    description: 'NIK sudah digunakan pasien lain' 
  })
  update(
    @Param('id', ParseIntPipe) id: number,
    @Body() updatePatientDto: UpdatePatientDto,
  ) {
    return this.patientService.update(id, updatePatientDto);
  }

  @Delete(':id')
  @ApiOperation({ 
    summary: 'Hapus pasien',
    description: 'Menghapus data pasien secara permanen berdasarkan ID'
  })
  @ApiParam({ 
    name: 'id', 
    description: 'ID pasien yang akan dihapus',
    example: 1 
  })
  @ApiResponse({ 
    status: 200, 
    description: 'Pasien berhasil dihapus',
    schema: {
      example: {
        message: 'Pasien John Doe berhasil dihapus'
      }
    }
  })
  @ApiResponse({ 
    status: 404, 
    description: 'Pasien tidak ditemukan' 
  })
  remove(@Param('id', ParseIntPipe) id: number) {
    return this.patientService.remove(id);
  }
}
