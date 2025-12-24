import { Injectable, NotFoundException, ConflictException, InternalServerErrorException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Patient } from './entities/patient.entity';
import { CreatePatientDto } from './dto/create-patient.dto';
import { UpdatePatientDto } from './dto/update-patient.dto';

@Injectable()
export class PatientService {
  constructor(
    @InjectRepository(Patient)
    private patientRepository: Repository<Patient>,
  ) {}

  // CREATE - Tambah pasien baru
  async create(createPatientDto: CreatePatientDto): Promise<Patient> {
    try {
      // Cek apakah NIK sudah ada
      const existingPatient = await this.patientRepository.findOne({
        where: { nik: createPatientDto.nik }
      });
      
      if (existingPatient) {
        throw new ConflictException(`Pasien dengan NIK ${createPatientDto.nik} sudah terdaftar`);
      }
      
      const patient = this.patientRepository.create(createPatientDto);
      return await this.patientRepository.save(patient);
    } catch (error) {
      if (error instanceof ConflictException) {
        throw error;
      }
      throw new InternalServerErrorException('Gagal menyimpan data pasien');
    }
  }

  // READ - Ambil semua pasien
  async findAll(): Promise<Patient[]> {
    try {
      return await this.patientRepository.find({
        order: { created_at: 'DESC' }
      });
    } catch (error) {
      throw new InternalServerErrorException('Gagal mengambil data pasien');
    }
  }

  // READ - Ambil pasien berdasarkan ID
  async findOne(id: number): Promise<Patient> {
    const patient = await this.patientRepository.findOne({ where: { id } });
    
    if (!patient) {
      throw new NotFoundException(`Pasien dengan ID ${id} tidak ditemukan`);
    }
    
    return patient;
  }

  // UPDATE - Update data pasien
  async update(id: number, updatePatientDto: UpdatePatientDto): Promise<Patient> {
    const patient = await this.findOne(id);
    
    // Jika NIK diubah, cek apakah NIK baru sudah dipakai
    if (updatePatientDto.nik && updatePatientDto.nik !== patient.nik) {
      const existingPatient = await this.patientRepository.findOne({
        where: { nik: updatePatientDto.nik }
      });
      
      if (existingPatient) {
        throw new ConflictException(`NIK ${updatePatientDto.nik} sudah digunakan pasien lain`);
      }
    }
    
    Object.assign(patient, updatePatientDto);
    return await this.patientRepository.save(patient);
  }

  // DELETE - Hapus pasien
  async remove(id: number): Promise<{ message: string }> {
    const patient = await this.findOne(id);
    await this.patientRepository.remove(patient);
    return { message: `Pasien ${patient.nama} berhasil dihapus` };
  }

  // SEARCH - Cari pasien berdasarkan nama atau NIK
  async search(keyword: string): Promise<Patient[]> {
    return await this.patientRepository
      .createQueryBuilder('patient')
      .where('patient.nama ILIKE :keyword', { keyword: `%${keyword}%` })
      .orWhere('patient.nik LIKE :keyword', { keyword: `%${keyword}%` })
      .orderBy('patient.created_at', 'DESC')
      .getMany();
  }
}
