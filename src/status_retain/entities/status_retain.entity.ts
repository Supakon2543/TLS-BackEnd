import { Column, Entity, PrimaryColumn } from "typeorm";

@Entity('status_retain')
export class StatusRetain {

    @PrimaryColumn({ length: 15 })
    id: string

    @Column()
    order: number

    @Column({ length: 50 })
    name: string

    @Column()
    status: boolean

}
