import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { PatientModule } from './patient/patient.module';
import { Patient } from './patient/entities/patient.entity';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: 'localhost',
      port: 5432,
      username: 'postgres',
      password: 'Mib1234;', // Ganti dengan password PostgreSQL Anda
      database: 'patient_db',
      entities: [Patient],
      synchronize: true, // Hanya untuk development
    }),
    PatientModule,
  ],
})
export class AppModule {}
