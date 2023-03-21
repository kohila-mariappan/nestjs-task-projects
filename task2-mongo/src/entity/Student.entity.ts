import { Entity, ObjectID, ObjectIdColumn, Column } from 'typeorm';

@Entity()
export class Student {
  @ObjectIdColumn()
  id: ObjectID;

  @Column()
  name: string;

  @Column()
  dob: string;

  @Column()
  gender: string;

  @Column()
  roll_no: string;

  @Column()
  password: string;
}
