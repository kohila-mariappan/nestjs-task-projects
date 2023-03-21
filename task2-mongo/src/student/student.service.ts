import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { MongoRepository } from 'typeorm';
import { Student } from 'src/entity/Student.entity';

@Injectable()
export class StudentService {
  constructor(
    @InjectRepository(Student) private repo: MongoRepository<Student>,
  ) {}
  async create(body): Promise<any> {
    const student = await this.repo.create({
      name: body.name,
      dob: body.dob,
      roll_no: body.roll_no,
      gender: body.gender,
      password: body.password,
    });
    return this.repo.save(student);
  }
  async findOne(body: any): Promise<any> {
    const student = await this.repo.findOne(body);
    return student;
  }
  async findAll(): Promise<any> {
    const student = await this.repo.find();
    return student;
  }
  async findOneId(id): Promise<any> {
    const student = await this.repo.findOneBy(id);
    return student;
  }
  async update(id, body): Promise<any> {
    await this.repo.update(id, body);
    const updateDetails = await this.repo.findOne(id);
    console.log(updateDetails);
    return updateDetails;
  }
  async remove(id): Promise<any> {
    const student = await this.repo.delete(id);
    console.log(student);
    return 'student was removed from student list';
  }
}
