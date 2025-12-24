import { PatientService } from './patient.service';
import { CreatePatientDto } from './dto/create-patient.dto';
import { UpdatePatientDto } from './dto/update-patient.dto';
import { Patient } from './entities/patient.entity';
export declare class PatientController {
    private readonly patientService;
    constructor(patientService: PatientService);
    create(createPatientDto: CreatePatientDto): Promise<Patient>;
    findAll(): Promise<Patient[]>;
    search(keyword: string): Promise<Patient[]>;
    findOne(id: number): Promise<Patient>;
    update(id: number, updatePatientDto: UpdatePatientDto): Promise<Patient>;
    remove(id: number): Promise<{
        message: string;
    }>;
}
