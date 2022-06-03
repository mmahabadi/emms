import {Column, Entity, JoinColumn, OneToOne, PrimaryColumn, Relation} from 'typeorm';
import {Org} from "../org/org.entity";
import {Currency} from "../currency/currency.entity";
import { ApiProperty } from '@nestjs/swagger';

@Entity({ schema: 'mms', name: 'asset_identity' })
export class AssetIdentity {
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
    example: 'شناسه ویژه'
  })
  @Column({ type: 'text' })
  name: string;


  @ApiProperty({
    example: [{ title: "عنوان" , fieldType: "نوع" , mandatory: false, defaultValue: "پیش فرض" }],
  })
  @Column({ type: 'jsonb' })
  rows: [{ title: string; fieldType: string ; mandatory: boolean; defaultValue: string }];
}

