import { BadRequestException, Injectable } from '@nestjs/common';
import * as bcrypt from 'bcrypt';
import { JwtService } from '@nestjs/jwt';
import { InjectRepository } from '@nestjs/typeorm';
import { Student } from 'src/entity/Student.entity';
import { MongoRepository } from 'typeorm';

@Injectable()
export class AuthService {
  constructor(
    @InjectRepository(Student) private repo: MongoRepository<Student>,
    private jwt: JwtService,
  ) {}
  async create(body: any): Promise<any> {
    const Student = await this.repo.findOne(body.roll_no);
    if (!Student) {
      throw new BadRequestException('student already registered');
    } else {
      const hash = await bcrypt.hash(body.password, 10);
      body.password = hash;
      const newStudent = await this.repo.create({
        name: body.name,
        dob: body.dob,
        roll_no: body.roll_no,
        gender: body.gender,
        password: body.password,
      });
      return this.repo.save(newStudent);
    }
  }
  async validateUser(body: any): Promise<any> {
    const Student = await this.repo.findOneBy(body.id);
    console.log(Student);

    if (Student) {
      const result = await bcrypt.compare(body.password, Student.password);
      console.log('result', result);
      if (result) {
        return Student;
      } else {
        throw new BadRequestException('incorrect password');
      }
    } else {
      throw new BadRequestException('invalid rollnumber');
    }
  }

  async signIn(body): Promise<any> {
    const student = await this.validateUser(body);
    console.log('value', student);
    if (student) {
      const payload = {
        id: student.id,
        name: student.name,
      };
      const token = this.jwt.sign(payload);
      console.log('token', token);
      return {
        student,
        token,
      };
    } else {
      throw new BadRequestException('error');
    }
  }
}
