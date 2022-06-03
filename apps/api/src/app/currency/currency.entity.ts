import {Column, Entity, PrimaryColumn} from 'typeorm';
import { ApiProperty } from '@nestjs/swagger';

@Entity({ schema: 'pbl', name: 'currency' })
export class Currency {
  @ApiProperty({
    example: '1'
  })
  @PrimaryColumn({ type: 'int4' })
  id: string;

  @ApiProperty({
    example: 'IRR'
  })
  @Column({ type: 'text' })
  code: string;

  @ApiProperty({
    example: 'ریال'
  })
  @Column({ type: 'text' })
  name: string;


  @ApiProperty({
    example: 'IRR'
  })
  @Column({ type: 'text' , nullable:true})
  symbol: string;


  @ApiProperty({
    example: '0'
  })
  @Column({ type: 'int4'  , nullable:true})
  scale: number;
}

