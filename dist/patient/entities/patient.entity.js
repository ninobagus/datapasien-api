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
Object.defineProperty(exports, "__esModule", { value: true });
exports.Patient = void 0;
const typeorm_1 = require("typeorm");
const swagger_1 = require("@nestjs/swagger");
let Patient = class Patient {
};
exports.Patient = Patient;
__decorate([
    (0, swagger_1.ApiProperty)({ example: 1, description: 'ID unik pasien' }),
    (0, typeorm_1.PrimaryGeneratedColumn)(),
    __metadata("design:type", Number)
], Patient.prototype, "id", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: 'John Doe', description: 'Nama lengkap pasien' }),
    (0, typeorm_1.Column)({ length: 100 }),
    __metadata("design:type", String)
], Patient.prototype, "nama", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: '1234567890123456', description: 'Nomor Induk Kependudukan (16 digit)' }),
    (0, typeorm_1.Column)({ length: 20, unique: true }),
    __metadata("design:type", String)
], Patient.prototype, "nik", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: '1990-05-15', description: 'Tanggal lahir pasien (YYYY-MM-DD)' }),
    (0, typeorm_1.Column)({ type: 'date' }),
    __metadata("design:type", Date)
], Patient.prototype, "tanggal_lahir", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: 'Laki-laki', description: 'Jenis kelamin pasien', enum: ['Laki-laki', 'Perempuan'] }),
    (0, typeorm_1.Column)({ length: 20 }),
    __metadata("design:type", String)
], Patient.prototype, "jenis_kelamin", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: 'Jl. Contoh No. 123, Jakarta', description: 'Alamat lengkap pasien' }),
    (0, typeorm_1.Column)({ type: 'text' }),
    __metadata("design:type", String)
], Patient.prototype, "alamat", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: '081234567890', description: 'Nomor telepon pasien' }),
    (0, typeorm_1.Column)({ length: 15 }),
    __metadata("design:type", String)
], Patient.prototype, "no_telepon", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: 'john@example.com', description: 'Email pasien (opsional)', required: false }),
    (0, typeorm_1.Column)({ length: 100, nullable: true }),
    __metadata("design:type", String)
], Patient.prototype, "email", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: 'O', description: 'Golongan darah pasien', enum: ['A', 'B', 'AB', 'O'] }),
    (0, typeorm_1.Column)({ length: 5 }),
    __metadata("design:type", String)
], Patient.prototype, "golongan_darah", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: '2024-01-15T10:30:00Z', description: 'Waktu data dibuat' }),
    (0, typeorm_1.CreateDateColumn)(),
    __metadata("design:type", Date)
], Patient.prototype, "created_at", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: '2024-01-15T10:30:00Z', description: 'Waktu data terakhir diupdate' }),
    (0, typeorm_1.UpdateDateColumn)(),
    __metadata("design:type", Date)
], Patient.prototype, "updated_at", void 0);
exports.Patient = Patient = __decorate([
    (0, typeorm_1.Entity)('patients')
], Patient);
//# sourceMappingURL=patient.entity.js.map