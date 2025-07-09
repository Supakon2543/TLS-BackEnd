import { Column, Entity, PrimaryColumn } from "typeorm";

@Entity('lab_site')
export class LabSite {

    @PrimaryColumn({ length: 5 })
    id: string

    @Column()
    order: number

    @Column({ length: 50 })
    name: string

    @Column()
    status: boolean

}
