import { Column, Entity, PrimaryColumn } from "typeorm"

@Entity('activity_equipment')
export class ActivityEquipment {

    @PrimaryColumn({ length: 15 })
    id: string

    @Column()
    order: number

    @Column({ length: 50 })
    name: string

    @Column()
    status: boolean

}
