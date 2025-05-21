import { Column, Entity, PrimaryColumn } from "typeorm"

@Entity('test_report_format')
export class TestReportFormat {

    @PrimaryColumn({ length: 15 })
    id: string

    @Column()
    order: number

    @Column({ length: 50 })
    name: string

    @Column()
    status: boolean

}
