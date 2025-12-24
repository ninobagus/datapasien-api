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
exports.PatientController = void 0;
const common_1 = require("@nestjs/common");
const swagger_1 = require("@nestjs/swagger");
const patient_service_1 = require("./patient.service");
const create_patient_dto_1 = require("./dto/create-patient.dto");
const update_patient_dto_1 = require("./dto/update-patient.dto");
const patient_entity_1 = require("./entities/patient.entity");
let PatientController = class PatientController {
    constructor(patientService) {
        this.patientService = patientService;
    }
    create(createPatientDto) {
        return this.patientService.create(createPatientDto);
    }
    findAll() {
        return this.patientService.findAll();
    }
    search(keyword) {
        return this.patientService.search(keyword || '');
    }
    findOne(id) {
        return this.patientService.findOne(id);
    }
    update(id, updatePatientDto) {
        return this.patientService.update(id, updatePatientDto);
    }
    remove(id) {
        return this.patientService.remove(id);
    }
};
exports.PatientController = PatientController;
__decorate([
    (0, common_1.Post)(),
    (0, common_1.HttpCode)(common_1.HttpStatus.CREATED),
    (0, swagger_1.ApiOperation)({
        summary: 'Tambah pasien baru',
        description: 'Membuat data pasien baru. NIK harus unik dan semua field wajib harus diisi.'
    }),
    (0, swagger_1.ApiBody)({ type: create_patient_dto_1.CreatePatientDto }),
    (0, swagger_1.ApiResponse)({
        status: 201,
        description: 'Pasien berhasil ditambahkan',
        type: patient_entity_1.Patient
    }),
    (0, swagger_1.ApiResponse)({
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
    }),
    (0, swagger_1.ApiResponse)({
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
    }),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [create_patient_dto_1.CreatePatientDto]),
    __metadata("design:returntype", void 0)
], PatientController.prototype, "create", null);
__decorate([
    (0, common_1.Get)(),
    (0, swagger_1.ApiOperation)({
        summary: 'Ambil semua data pasien',
        description: 'Mengambil seluruh data pasien yang tersimpan, diurutkan berdasarkan waktu pembuatan (terbaru dulu)'
    }),
    (0, swagger_1.ApiResponse)({
        status: 200,
        description: 'Daftar semua pasien',
        type: [patient_entity_1.Patient]
    }),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", void 0)
], PatientController.prototype, "findAll", null);
__decorate([
    (0, common_1.Get)('search'),
    (0, swagger_1.ApiOperation)({
        summary: 'Cari pasien',
        description: 'Mencari pasien berdasarkan nama atau NIK (case-insensitive untuk nama)'
    }),
    (0, swagger_1.ApiQuery)({
        name: 'q',
        required: false,
        description: 'Kata kunci pencarian (nama atau NIK)',
        example: 'John'
    }),
    (0, swagger_1.ApiResponse)({
        status: 200,
        description: 'Hasil pencarian pasien',
        type: [patient_entity_1.Patient]
    }),
    __param(0, (0, common_1.Query)('q')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
], PatientController.prototype, "search", null);
__decorate([
    (0, common_1.Get)(':id'),
    (0, swagger_1.ApiOperation)({
        summary: 'Ambil pasien berdasarkan ID',
        description: 'Mengambil detail data pasien berdasarkan ID'
    }),
    (0, swagger_1.ApiParam)({
        name: 'id',
        description: 'ID pasien',
        example: 1
    }),
    (0, swagger_1.ApiResponse)({
        status: 200,
        description: 'Data pasien ditemukan',
        type: patient_entity_1.Patient
    }),
    (0, swagger_1.ApiResponse)({
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
    }),
    __param(0, (0, common_1.Param)('id', common_1.ParseIntPipe)),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number]),
    __metadata("design:returntype", void 0)
], PatientController.prototype, "findOne", null);
__decorate([
    (0, common_1.Patch)(':id'),
    (0, swagger_1.ApiOperation)({
        summary: 'Update data pasien',
        description: 'Mengupdate data pasien. Hanya field yang dikirim yang akan diupdate (partial update).'
    }),
    (0, swagger_1.ApiParam)({
        name: 'id',
        description: 'ID pasien yang akan diupdate',
        example: 1
    }),
    (0, swagger_1.ApiBody)({ type: update_patient_dto_1.UpdatePatientDto }),
    (0, swagger_1.ApiResponse)({
        status: 200,
        description: 'Pasien berhasil diupdate',
        type: patient_entity_1.Patient
    }),
    (0, swagger_1.ApiResponse)({
        status: 404,
        description: 'Pasien tidak ditemukan'
    }),
    (0, swagger_1.ApiResponse)({
        status: 409,
        description: 'NIK sudah digunakan pasien lain'
    }),
    __param(0, (0, common_1.Param)('id', common_1.ParseIntPipe)),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number, update_patient_dto_1.UpdatePatientDto]),
    __metadata("design:returntype", void 0)
], PatientController.prototype, "update", null);
__decorate([
    (0, common_1.Delete)(':id'),
    (0, swagger_1.ApiOperation)({
        summary: 'Hapus pasien',
        description: 'Menghapus data pasien secara permanen berdasarkan ID'
    }),
    (0, swagger_1.ApiParam)({
        name: 'id',
        description: 'ID pasien yang akan dihapus',
        example: 1
    }),
    (0, swagger_1.ApiResponse)({
        status: 200,
        description: 'Pasien berhasil dihapus',
        schema: {
            example: {
                message: 'Pasien John Doe berhasil dihapus'
            }
        }
    }),
    (0, swagger_1.ApiResponse)({
        status: 404,
        description: 'Pasien tidak ditemukan'
    }),
    __param(0, (0, common_1.Param)('id', common_1.ParseIntPipe)),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number]),
    __metadata("design:returntype", void 0)
], PatientController.prototype, "remove", null);
exports.PatientController = PatientController = __decorate([
    (0, swagger_1.ApiTags)('patients'),
    (0, common_1.Controller)('api/patients'),
    __metadata("design:paramtypes", [patient_service_1.PatientService])
], PatientController);
//# sourceMappingURL=patient.controller.js.map