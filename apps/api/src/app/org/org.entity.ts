import {Column, Entity, JoinColumn, JoinTable, ManyToOne, OneToOne, PrimaryColumn, Relation} from 'typeorm';
import {Currency} from "../currency/currency.entity";
import { ApiProperty } from '@nestjs/swagger';


@Entity({ schema: 'pbl', name: 'org' })
export class Org {
  @ApiProperty({
    example: '5dc228e2-51e4-4738-9d8a-2b72edb229a4'
  })
  @PrimaryColumn({ type: 'uuid' })
  id: string;

  @ApiProperty({
    example: '0001'
  })
  @Column({ type: 'text' })
  code: string;

  @ApiProperty({
    example: 'نام سارمان'
  })
  @Column({ type: 'text'})
  name: string;

  @Column({ type: 'int4', name: "currency_id"})
  @ManyToOne(() => Currency)
  @JoinColumn({name:"currency_id" , referencedColumnName: "id"})
  currency: Relation<Currency>


  @ApiProperty({
    example: '1',
    description: 'ارز پیش فزض '
  })
  @Column({ type: 'int4' })
  currency_id: string;

}

