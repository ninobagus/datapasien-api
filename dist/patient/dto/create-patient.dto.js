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
exports.CreatePatientDto = void 0;
const class_validator_1 = require("class-validator");
const swagger_1 = require("@nestjs/swagger");
class CreatePatientDto {
}
exports.CreatePatientDto = CreatePatientDto;
__decorate([
    (0, swagger_1.ApiProperty)({
        example: 'John Doe',
        description: 'Nama lengkap pasien',
        maxLength: 100,
    }),
    (0, class_validator_1.IsNotEmpty)({ message: 'Nama tidak boleh kosong' }),
    (0, class_validator_1.IsString)({ message: 'Nama harus berupa string' }),
    (0, class_validator_1.MaxLength)(100, { message: 'Nama maksimal 100 karakter' }),
    __metadata("design:type", String)
], CreatePatientDto.prototype, "nama", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        example: '1234567890123456',
        description: 'Nomor Induk Kependudukan (hanya angka)',
        maxLength: 16
    }),
    (0, class_validator_1.IsNotEmpty)({ message: 'NIK tidak boleh kosong' }),
    (0, class_validator_1.IsString)({ message: 'NIK harus berupa string' }),
    (0, class_validator_1.Length)(16, 16, { message: 'NIK harus tepat 16 digit' }),
    (0, class_validator_1.Matches)(/^[0-9]+$/, { message: 'NIK hanya boleh berisi angka' }),
    __metadata("design:type", String)
], CreatePatientDto.prototype, "nik", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        example: '1990-05-15',
        description: 'Tanggal lahir dalam format YYYY-MM-DD',
    }),
    (0, class_validator_1.IsNotEmpty)({ message: 'Tanggal lahir tidak boleh kosong' }),
    (0, class_validator_1.IsDateString)({}, { message: 'Format tanggal lahir tidak valid (gunakan YYYY-MM-DD)' }),
    __metadata("design:type", String)
], CreatePatientDto.prototype, "tanggal_lahir", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        example: 'Laki-laki',
        description: 'Jenis kelamin pasien',
        enum: ['Laki-laki', 'Perempuan'],
    }),
    (0, class_validator_1.IsNotEmpty)({ message: 'Jenis kelamin tidak boleh kosong' }),
    (0, class_validator_1.IsString)({ message: 'Jenis kelamin harus berupa string' }),
    __metadata("design:type", String)
], CreatePatientDto.prototype, "jenis_kelamin", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        example: 'Jl. Contoh No. 123, Jakarta Selatan',
        description: 'Alamat lengkap pasien',
    }),
    (0, class_validator_1.IsNotEmpty)({ message: 'Alamat tidak boleh kosong' }),
    (0, class_validator_1.IsString)({ message: 'Alamat harus berupa string' }),
    __metadata("design:type", String)
], CreatePatientDto.prototype, "alamat", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        example: '081234567890',
        description: 'Nomor telepon pasien',
        maxLength: 15,
    }),
    (0, class_validator_1.IsNotEmpty)({ message: 'No telepon tidak boleh kosong' }),
    (0, class_validator_1.IsString)({ message: 'No telepon harus berupa string' }),
    (0, class_validator_1.MaxLength)(15, { message: 'No telepon maksimal 15 karakter' }),
    __metadata("design:type", String)
], CreatePatientDto.prototype, "no_telepon", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({
        example: 'john@example.com',
        description: 'Alamat email pasien (opsional)',
    }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsEmail)({}, { message: 'Format email tidak valid' }),
    __metadata("design:type", String)
], CreatePatientDto.prototype, "email", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        example: 'O',
        description: 'Golongan darah pasien',
        enum: ['A', 'B', 'AB', 'O'],
        maxLength: 5,
    }),
    (0, class_validator_1.IsNotEmpty)({ message: 'Golongan darah tidak boleh kosong' }),
    (0, class_validator_1.IsString)({ message: 'Golongan darah harus berupa string' }),
    (0, class_validator_1.MaxLength)(2, { message: 'Golongan darah maksimal 2 karakter' }),
    (0, class_validator_1.Matches)(/^[A-Za-z]+$/, { message: 'Golongan darah hanya boleh berisi huruf' }),
    (0, class_validator_1.Matches)(/^(A|B|AB|O)$/i, { message: 'Golongan darah harus A, B, AB, atau O' }),
    __metadata("design:type", String)
], CreatePatientDto.prototype, "golongan_darah", void 0);
//# sourceMappingURL=create-patient.dto.js.map