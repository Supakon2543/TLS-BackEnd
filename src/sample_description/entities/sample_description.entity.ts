import { Column, Entity, PrimaryColumn } from "typeorm"

@Entity('sample_description')
export class SampleDescription {

    @PrimaryColumn({ length: 10 })
    id: string

    @Column()
    order: number

    @Column({ length: 50 })
    name: string

    @Column()
    status: boolean

}
