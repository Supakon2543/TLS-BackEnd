import { LabSite } from "src/lab_site/entities/lab_site.entity"
import { Column, Entity, JoinColumn, ManyToOne, PrimaryColumn } from "typeorm"

@Entity('user_location')
export class UserLocation {

    @PrimaryColumn({ length: 10 })
    id: string

    @Column()
    order: number

    @Column({ length: 50 })
    name: string

    @Column({ nullable: true })
    lab_site_id: string

    @ManyToOne((type) => LabSite, (lab_site) => lab_site.id)
    @JoinColumn({ name: "lab_site_id" })
    LabSite: LabSite

    @Column()
    status: boolean

}
