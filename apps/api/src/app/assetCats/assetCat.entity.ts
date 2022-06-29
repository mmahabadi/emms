import {Column, Entity, JoinColumn, OneToOne, PrimaryColumn, Relation} from 'typeorm';
import {Org} from "../org/org.entity";
import {ApiProperty} from '@nestjs/swagger';

@Entity({ schema: 'mms', name: 'asset_cat' })
export class AssetCat {
  @ApiProperty({
    example: '5dc228e2-51e4-4738-9d8a-2b72edb229a4'
  })
  @PrimaryColumn({ type: 'uuid' })
  id: string;


  @ApiProperty({
    example: '5dc228e2-51e4-4738-9d8a-2b72edb229a5'
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
    example: 'نام '
  })
  @Column({ type: 'text' })
  name: string;

  @ApiProperty({
    example: 'عنوان  '
  })
  @Column({ type: 'text' })
  field_title: string;

  @ApiProperty({
    example: '2016-06-22 20:44:52.134125-07',
    required:false
  })
  @Column({ type: 'timestamptz' , nullable:true})
  invalid_from?: string;

  @ApiProperty({
    example: '2016-06-22 20:44:52.134125-07'
  })
  @Column({ type: 'uuid', name: 'id' })
  @OneToOne(() => AssetCat)
  @JoinColumn({name:"parent_id" , referencedColumnName: "id"})
  parent: Relation<AssetCat>;

  @ApiProperty({
    example: '2016-06-22 20:44:52.134125-07'
  })
  @Column({ type: 'uuid' , nullable:true })
  asset_identity_id?: string;



  @ApiProperty({
    example: '[{\n' +
        '  "damageId" : 5dc228e2-51e4-4738-9d8a-2b72edb229a5,\n' +
        '  children: [{"damageId":"5dc228e2-51e4-4738-9d8a-2b72edb229a5"}]\n' +
        '}]'
  })
  @Column({ type: 'jsonb' , nullable:true })
  damage_results: [damageResult];

  @ApiProperty({
    example: '[{\n' +
        '  "activityID" : "5dc228e2-51e4-4738-9d8a-2b72edb229a5",\n' +
        '  goods: ["5dc228e2-51e4-4738-9d8a-2b72edb229a5"],\n' +
        '  skill: [{"skillId": "5dc228e2-51e4-4738-9d8a-2b72edb229a5", "time":"2"}],\n' +
        '\n' +
        '}]'
  })
  @Column({ type: 'jsonb'  , nullable:true})
  activity_results?: [{activityID: string, goods:string[], skill:[{ skillId: string, time:number}]}] ;

}

class damageResult {
  damageId : string;
  children: damageResult[]
}
