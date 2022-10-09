import {Column, Entity, JoinColumn, OneToOne, PrimaryColumn, Relation} from "typeorm";
import {ApiProperty} from "@nestjs/swagger";
import {Org} from "../org/org.entity";
import {Asset } from "../asset/asset.entity";
import {Damage} from "../damage/damage.entity";

@Entity({ schema: 'mms', name: 'job_request' })
export class JobRequest {

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
    example: '5dc228e2-51e4-4738-9d8a-2b72edb229a4'
  })
  @Column({ type: 'uuid', name: "asset_id"})
  @OneToOne(() => Asset)
  @JoinColumn({name:"asset_id" , referencedColumnName: "id"})
  asset: Relation<Asset>

  @Column({ type: 'enum', name: "importance_type" , enum :['P01', 'P02', 'P03', 'P04', 'P05', 'P06', 'P07']})
  importanceType: ImportanceType

  @Column({ type: 'enum', name: "request_type" , enum :['TW3CM', 'W1EM', 'W2CM', 'W3PM', 'W4IM']})
  requestType: RequestType

  @ApiProperty({
    example: '5dc228e2-51e4-4738-9d8a-2b72edb229a4'
  })
  @Column({ type: 'uuid', name: "damage_id"})
  @OneToOne(() => Damage)
  @JoinColumn({name:"damage_id" , referencedColumnName: "id"})
  damage: Relation<Damage>

  @ApiProperty({
    example: '2022-09-19T13:48:02.471Z'
  })
  @Column({ type: 'timestamptz', name: 'request_date' })
  requestDate: string;

  @ApiProperty({
    example: '2022-09-19T13:48:02.471Z'
  })
  @Column({ type: 'timestamptz', name: 'create_at' })
  createAt: string;

}
enum ImportanceType {
  'P01'='P01', 'P02'='P02', 'P03'='P03', 'P04'='P04', 'P05'= 'P05', 'P06' = 'P06', 'P07' = 'P07'
}

enum RequestType {
  'TW3CM'='TW3CM', 'W1EM' = 'W1EM', 'W2CM' = 'W2CM', 'W3PM' = 'W3PM', 'W4IM' = 'W4IM'
}

