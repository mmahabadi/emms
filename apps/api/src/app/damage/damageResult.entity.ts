import {Column, Entity, JoinColumn, OneToOne, PrimaryColumn, Relation} from 'typeorm';
import {Org} from "../org/org.entity";
import { ApiProperty } from '@nestjs/swagger';
import {Damage} from "./damage.entity";

@Entity({ schema: 'mms', name: 'damage' })
export class DamageResult {
  @ApiProperty({
    example: '5dc228e2-51e4-4738-9d8a-2b72edb229a4'
  })
  @PrimaryColumn({ type: 'uuid' })
  id: string;

  @ApiProperty({
    example: '5dc228e2-51e4-4738-9d8a-2b72edb229a4'
  })
  @Column({ type: 'uuid', name: "damage_id"})
  @OneToOne(() => Damage)
  @JoinColumn({name:"damage_id" , referencedColumnName: "id"})
  damage: Relation<Damage>

  @ApiProperty({
    example: '5dc228e2-51e4-4738-9d8a-2b72edb229a5',
  })
  @Column({ type: 'uuid', name: "parent_id"})
  @OneToOne(() => DamageResult)
  @JoinColumn({name:"parent_id" , referencedColumnName: "id"})
  parent: Relation<DamageResult>
}

