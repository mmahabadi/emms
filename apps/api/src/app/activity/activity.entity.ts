import {Column, Entity, JoinColumn, OneToOne, PrimaryColumn, Relation} from 'typeorm';
import {Org} from "../org/org.entity";
import { ApiProperty } from '@nestjs/swagger';

@Entity({ schema: 'mms', name: 'activity' })
export class Activity {

  @ApiProperty({
    example: '5dc228e2-51e4-4738-9d8a-2b72edb229a4'
  })
  @PrimaryColumn({ type: 'uuid' })
  id: string;


  @ApiProperty({
    example: '5dc228e2-51e4-4738-9d8a-2b72edb229a4'
  })
  @Column({ type: 'uuid', name: "org_id"})
  @OneToOne(() => Org)
  @JoinColumn({name:"org_id" , referencedColumnName: "id"})
  org: Relation<Org>

  @ApiProperty({
    example: '00001'
  })
  @Column({ type: 'text' })
  code: string;

  @ApiProperty({
    example: ' سازمان ؟؟؟؟؟؟؟؟؟؟؟'
  })
  @Column({ type: 'text' })
  name: string;

  // @Column({ type: 'uuid' })
  // parent_id: string;

  @ApiProperty({
    example: '5dc228e2-51e4-4738-9d8a-2b72edb229a4'
  })
  @Column({ type: 'uuid', name: "parent_id"})
  @OneToOne(() => Activity)
  @JoinColumn({name:"parent_id" , referencedColumnName: "id"})
  parent: Relation<Activity>


  @ApiProperty({
    example: '[{ "id": "5dc228e2-51e4-4738-9d8a-2b72edb229a5"}]'
  })
  @Column({ type: 'jsonb' })
  goods: [{ id: string}];

  @ApiProperty({
    example: '[{ "id": "5dc228e2-51e4-4738-9d8a-2b72edb229a5"}]'
  })
  @Column({ type: 'jsonb' })
  skills: [{ id: string}];
}

