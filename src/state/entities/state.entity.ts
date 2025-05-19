import { Column, Entity, PrimaryColumn } from "typeorm"

@Entity('state')
export class State {

    @PrimaryColumn({ length: 10 })
    id: string

    @Column()
    order: number

    @Column({ length: 50 })
    name: string

    @Column()
    status: boolean

}
