import { State } from "src/state/entities/state.entity"
import { Column, Entity, JoinColumn, ManyToOne, PrimaryColumn } from "typeorm"

@Entity('status_request')
export class StatusRequest {

    @PrimaryColumn({ length: 10 })
    id: string

    @Column()
    order: number

    @Column({ length: 50 })
    name: string

    @Column({ nullable: true })
    state_id: string

    @ManyToOne((type) => State, (state) => state.id)
    @JoinColumn({ name: "state_id" })
    State: State

    @Column()
    status: boolean

}
