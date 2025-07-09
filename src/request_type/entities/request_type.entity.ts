import { Column, Entity, PrimaryColumn } from "typeorm";

@Entity('request_type')
export class RequestType {

    @PrimaryColumn({ length: 10 })
    id: string

    @Column()
    order: number

    @Column({ length: 50 })
    name: string

    @Column()
    status: boolean

}
