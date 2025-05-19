import { Column, Entity, PrimaryColumn } from "typeorm";

@Entity('sample_type')
export class SampleType {

    @PrimaryColumn({ length: 10 })
    id: string

    @Column()
    order: number

    @Column({ length: 50 })
    name: string

    @Column()
    status: boolean

}
