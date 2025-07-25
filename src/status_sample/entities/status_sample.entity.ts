import { Column, Entity, PrimaryColumn } from "typeorm"

@Entity('status_sample')
export class StatusSample {

    @PrimaryColumn({ length: 10 })
    id: string

    @Column()
    order: number

    @Column({ length: 50 })
    name: string

    @Column()
    status: boolean

}
