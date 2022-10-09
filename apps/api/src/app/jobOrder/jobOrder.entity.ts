import {Column, Entity, JoinColumn, OneToOne, PrimaryColumn, Relation} from "typeorm";
import {ApiProperty} from "@nestjs/swagger";
import {Org} from "../org/org.entity";
import {Department} from "../department/department.entity";

@Entity({ schema: 'mms', name: 'job_order' })
export class JobOrder {

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
  @Column({ type: 'uuid', name: "department_id"})
  @OneToOne(() => Department)
  @JoinColumn({name:"department_id" , referencedColumnName: "id"})
  department: Relation<Department>

  @ApiProperty({
    example: '2022-09-19T13:48:02.471Z'
  })
  @Column({ type: 'timestamptz', name: 'planning_start_time' })
  planningStartTime: string;

  @ApiProperty({
    example: '2022-09-19T13:48:02.471Z'
  })
  @Column({ type: 'timestamptz', name: 'planning_end_time' })
  planningEndTime: string;


  @Column({ type: 'jsonb', name: 'goods' })
  goods: string;

  @Column({ type: 'jsonb', name: 'activities' })
  activities: string;

  @ApiProperty({
    example: '2022-09-19T13:48:02.471Z'
  })
  @Column({ type: 'timestamptz', name: 'created_at' })
  createdAt: string;

  @Column({ type: 'uuid', name: 'created_by' })
  createdBy: string;

  /*

  @ApiProperty({
    example: '5dc228e2-51e4-4738-9d8a-2b72edb229a4'
  })
  @Column({ type: 'uuid', name: "job_request_id"})
  @OneToOne(() => Org)
  @JoinColumn({name:"job_request_id" , referencedColumnName: "id"})
  jobRequest: Relation<job_request>

  @ApiProperty({
    example: '5dc228e2-51e4-4738-9d8a-2b72edb229a4'
  })
  @Column({ type: 'uuid', name: "check_list_id"})
  @OneToOne(() => Org)
  @JoinColumn({name:"check_list_id" , referencedColumnName: "id"})
  jobRequest: Relation<job_request>
*/

/*

  @ApiProperty({
    example: '5dc228e2-51e4-4738-9d8a-2b72edb229a4'
  })
  @Column({ type: 'uuid', name: "job_request_id"})
  @OneToOne(() => JobRequest)
  @JoinColumn({name:"job_request_id" , referencedColumnName: "id"})
  jobRequestId: Relation<Org>
*/


}
