import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

export type Priority = "no-priority" | "urgent" | "high" | "medium" | "low";
export type Status = "todo" | "doing" | "completed" | "on-hold";

@Entity()
export class TaskEntity {
  @PrimaryGeneratedColumn("uuid")
  id: string;

  @Column()
  title: string;

  @Column({ type: "text", nullable: true })
  description?: string;

  @Column({ default: "todo" })
  status: Status;

  @Column({ default: "no-priority" })
  priority: Priority;

  @Column({ type: "simple-json", default: "[]" })
  labels: string[];

  @Column({ nullable: true })
  startDate?: string;

  @Column({ nullable: true })
  dueDate?: string;

  @Column({ nullable: true })
  member?: string;

  @Column({ nullable: true })
  team?: string;

  @Column({ nullable: true })
  reporter?: string;

  @Column({ default: "p1" })
  projectId: string;

  @Column({ type: "simple-json", default: "[]" })
  subtasks: {
    id: string;
    title: string;
    priority: Priority;
    member?: string;
    dueDate?: string;
  }[];

  @Column({ type: "simple-json", default: "[]" })
  comments: { id: string; author: string; text: string; createdAt: string }[];

  @Column({ default: () => "CURRENT_TIMESTAMP" })
  createdAt: string;
}
