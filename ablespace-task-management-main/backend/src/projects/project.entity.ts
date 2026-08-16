import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class ProjectEntity {
  @PrimaryGeneratedColumn("uuid")
  id: string;

  @Column()
  name: string;

  @Column({ default: "no-priority" })
  priority: string;

  @Column({ nullable: true })
  lead?: string;

  @Column({ nullable: true })
  dueDate?: string;
}
