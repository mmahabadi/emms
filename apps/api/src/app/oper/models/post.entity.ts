import { Column, Entity, PrimaryColumn } from 'typeorm';
import { ApiProperty } from '@nestjs/swagger';

@Entity({ schema: 'pbl', name: 'oper' })
export class OperPostEntity {
  @ApiProperty({
    example: '5dc228e2-51e4-4738-9d8a-2b72edb229a4'
  })
  @PrimaryColumn({ type: 'uuid' })
  id: string;

  @ApiProperty({
    example: '09121234568'
  })
  @Column({ type: 'text' })
  mobile_number: string;

  @ApiProperty({
    example: 'نام کاریر'
  })
  @Column({ type: 'text' })
  name: string;

  @ApiProperty({
    example: 'فامیل'
  })
  @Column({ type: 'text' })
  lastname: string;

  @ApiProperty({
    example: 'عنوان'
  })
  @Column({ type: 'text' })
  title: string;

  @ApiProperty({
    example: 'email'
  })
  @Column({ type: 'text' })
  email: string;

  @ApiProperty({
    example: 'پسورد'
  })
  @Column({ type: 'text' })
  password: string;

  @Column({ type: 'jsonb', nullable: true })
  extended_data: string;
}
