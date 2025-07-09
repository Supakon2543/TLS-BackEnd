import { Column, Entity, PrimaryColumn } from "typeorm";

@Entity('lab_test')
export class LabTest {

    @PrimaryColumn({ length: 10 })
    id: string

    @Column()
    order: number

    @Column({ length: 50 })
    name: string

    @Column()
    status: boolean

}
