import { Column, Entity, PrimaryColumn } from "typeorm"

@Entity('spec_type')
export class SpecType {

    @PrimaryColumn({ length: 10 })
    id: string

    @Column()
    order: number

    @Column({ length: 50 })
    name: string

    @Column()
    status: boolean

}
