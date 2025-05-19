import { Column, Entity, PrimaryColumn } from "typeorm"

@Entity('role')
export class Role {

    @PrimaryColumn({ length: 5 })
    id: string

    @Column()
    order: number

    @Column({ length: 50 })
    name: string

    @Column()
    status: boolean

}
