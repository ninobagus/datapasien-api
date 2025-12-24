"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.PatientService = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const typeorm_2 = require("typeorm");
const patient_entity_1 = require("./entities/patient.entity");
let PatientService = class PatientService {
    constructor(patientRepository) {
        this.patientRepository = patientRepository;
    }
    async create(createPatientDto) {
        try {
            const existingPatient = await this.patientRepository.findOne({
                where: { nik: createPatientDto.nik }
            });
            if (existingPatient) {
                throw new common_1.ConflictException(`Pasien dengan NIK ${createPatientDto.nik} sudah terdaftar`);
            }
            const patient = this.patientRepository.create(createPatientDto);
            return await this.patientRepository.save(patient);
        }
        catch (error) {
            if (error instanceof common_1.ConflictException) {
                throw error;
            }
            throw new common_1.InternalServerErrorException('Gagal menyimpan data pasien');
        }
    }
    async findAll() {
        try {
            return await this.patientRepository.find({
                order: { created_at: 'DESC' }
            });
        }
        catch (error) {
            throw new common_1.InternalServerErrorException('Gagal mengambil data pasien');
        }
    }
    async findOne(id) {
        const patient = await this.patientRepository.findOne({ where: { id } });
        if (!patient) {
            throw new common_1.NotFoundException(`Pasien dengan ID ${id} tidak ditemukan`);
        }
        return patient;
    }
    async update(id, updatePatientDto) {
        const patient = await this.findOne(id);
        if (updatePatientDto.nik && updatePatientDto.nik !== patient.nik) {
            const existingPatient = await this.patientRepository.findOne({
                where: { nik: updatePatientDto.nik }
            });
            if (existingPatient) {
                throw new common_1.ConflictException(`NIK ${updatePatientDto.nik} sudah digunakan pasien lain`);
            }
        }
        Object.assign(patient, updatePatientDto);
        return await this.patientRepository.save(patient);
    }
    async remove(id) {
        const patient = await this.findOne(id);
        await this.patientRepository.remove(patient);
        return { message: `Pasien ${patient.nama} berhasil dihapus` };
    }
    async search(keyword) {
        return await this.patientRepository
            .createQueryBuilder('patient')
            .where('patient.nama ILIKE :keyword', { keyword: `%${keyword}%` })
            .orWhere('patient.nik LIKE :keyword', { keyword: `%${keyword}%` })
            .orderBy('patient.created_at', 'DESC')
            .getMany();
    }
};
exports.PatientService = PatientService;
exports.PatientService = PatientService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectRepository)(patient_entity_1.Patient)),
    __metadata("design:paramtypes", [typeorm_2.Repository])
], PatientService);
//# sourceMappingURL=patient.service.js.map