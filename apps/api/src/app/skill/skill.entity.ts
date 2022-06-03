import {Column, Entity, JoinColumn, ManyToOne, OneToOne, PrimaryColumn, Relation} from 'typeorm';
import {Org} from "../org/org.entity";
import { ApiProperty } from '@nestjs/swagger';

@Entity({ schema: 'mms', name: 'skill' })
export class Skill {
  @ApiProperty({
    example: '5dc228e2-51e4-4738-9d8a-2b72edb229a4'
  })
  @PrimaryColumn({ type: 'int4' })
  id: string;

  @ApiProperty({
    example: '5dc228e2-51e4-4738-9d8a-2b72edb229a4'
  })
  @Column({ type: 'uuid', name: "org_id"})
  @ManyToOne(() => Org)
  @JoinColumn({name:"org_id" , referencedColumnName: "id"})
  org: Relation<Org>

  @ApiProperty({
    example: '00001'
  })
  @Column({ type: 'text' })
  code: string;

  @ApiProperty({
    example: 'نام تخصص'
  })
  @Column({ type: 'text' })
  name: string;


  @ApiProperty({
    example: '2016-06-22 20:44:52.134125-07',
    required:false
  })
  @Column({ type: 'timestamptz' , nullable:true})
  invalid_from?: string;

}

