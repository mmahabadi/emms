import {Column, Entity, JoinColumn, OneToOne, PrimaryGeneratedColumn, Relation} from 'typeorm';
import {Org} from "../org/org.entity";
import {Location} from "../location/location.entity";
import {AssetCat} from "../assetCats/assetCat.entity";
import {ApiProperty} from '@nestjs/swagger';

@Entity({ schema: 'mms', name: 'asset' })
export class Asset {
  @ApiProperty({
    example: '5dc228e2-51e4-4738-9d8a-2b72edb229a4'
  })
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @ApiProperty({
    example: '5dc228e2-51e4-4738-9d8a-2b72edb229a5',
    name: "asset_cat_id"
  })
  @Column({ type: 'uuid', name: "asset_cat_id"})
  @OneToOne(() => AssetCat)
  @JoinColumn({name:"asset_cat_id" , referencedColumnName: "id"})
  assetCat: Relation<AssetCat>

  @ApiProperty({
    example: '00001',
  })
  @Column({ type: 'text' })
  code: string;

  @ApiProperty({
    example: 'تجهیز ۱',
  })
  @Column({ type: 'text' })
  name: string;

  @ApiProperty({
    example: '2022-06-22 20:44:52.134125-07',
  })
  @Column({ type: 'timestamptz' , nullable:true})
  invalid_from?: string;

  @ApiProperty({
    example: '5dc228e2-51e4-4738-9d8a-2b72edb229a5',
  })
  @Column({ type: 'uuid', name: "org_id"})
  @OneToOne(() => Org)
  @JoinColumn({name:"org_id" , referencedColumnName: "id"})
  org: Relation<Org>

  @ApiProperty({
    example: '11111111111111111111111',
    required: false
  })
  @Column({ type: 'text' })
  plate_no: string;

  @ApiProperty({
    example: '5dc228e2-51e4-4738-9d8a-2b72edb229a5',
  })
  @Column({ type: 'uuid', name: "parent_id"})
  @OneToOne(() => Asset)
  @JoinColumn({name:"parent_id" , referencedColumnName: "id"})
  parent: Relation<Asset>

  @ApiProperty({
    example: '5dc228e2-51e4-4738-9d8a-2b72edb229a5',
  })
  @Column({ type: 'uuid', name: "location_id"})
  @OneToOne(() => Location)
  @JoinColumn({name:"location_id" , referencedColumnName: "id"})
  location: Relation<Location>

  @ApiProperty({
    example: '{"asset_cat_id": "5dc228e2-51e4-4738-9d8a-2b72edb229a5", "values":{"title": "مدل", "value": "1399"}}',
  })
  @Column({ type: 'uuid'})
  identity?: {asset_cat_id: string ; values : {title: string; value: string}};

}

class damageResult {
  damageId : string;
  children: damageResult[]
}
