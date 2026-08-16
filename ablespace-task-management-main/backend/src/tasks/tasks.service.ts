import { Injectable, NotFoundException, OnModuleInit } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { randomUUID } from "crypto";
import { TaskEntity } from "./task.entity";
import { CreateTaskDto, UpdateTaskDto } from "./task.dto";

@Injectable()
export class TasksService implements OnModuleInit {
  constructor(
    @InjectRepository(TaskEntity)
    private readonly repo: Repository<TaskEntity>
  ) {}

  // Seed the DB once on boot so the frontend has something to render
  // even before anyone has created a task from the UI.
  async onModuleInit() {
    const count = await this.repo.count();
    if (count > 0) return;

    const seed: Partial<TaskEntity>[] = [
      { title: "Write API Documentation", status: "todo", priority: "high", labels: ["Research", "Design", "Deployment"], dueDate: "2026-07-31", member: "Admin", projectId: "p1" },
      { title: "Implement Search Function", status: "todo", priority: "medium", labels: ["Deployment"], dueDate: "2026-07-29", member: "Admin", projectId: "p1" },
      { title: "Deploy to Production", status: "todo", priority: "urgent", labels: ["Deployment"], dueDate: "2026-07-29", member: "Admin", projectId: "p1" },
      { title: "Code Review Completed", status: "doing", priority: "medium", labels: ["Deployment"], dueDate: "2026-07-29", member: "Admin", projectId: "p2" },
      { title: "Design Mockups Finalized", status: "doing", priority: "low", labels: ["Deployment"], dueDate: "2026-07-29", member: "Admin", projectId: "p2" },
      { title: "Feature Testing Passed", status: "completed", priority: "medium", labels: ["Testing", "Passed"], dueDate: "2026-07-30", member: "QA Team", projectId: "p3" },
      { title: "UI Design Updated", status: "completed", priority: "low", labels: ["Design", "Updated"], dueDate: "2026-07-31", member: "Designer", projectId: "p1" },
      { title: "Security Audit Scheduled", status: "completed", priority: "high", labels: ["Audit", "Scheduled"], dueDate: "2026-08-01", member: "Security", projectId: "p3" },
      { title: "UI Review", status: "on-hold", priority: "medium", labels: ["Review"], member: "Design", projectId: "p1" },
      { title: "Backend Integration", status: "on-hold", priority: "high", labels: ["Development"], member: "Dev Team", projectId: "p2" },
    ];

    for (const s of seed) {
      await this.repo.save(this.repo.create({ ...s, subtasks: [], comments: [] }));
    }
  }

  findAll() {
    return this.repo.find({ order: { createdAt: "ASC" } });
  }

  async findOne(id: string) {
    const task = await this.repo.findOne({ where: { id } });
    if (!task) throw new NotFoundException(`Task ${id} not found`);
    return task;
  }

  create(dto: CreateTaskDto) {
    const task = this.repo.create({
      id: randomUUID(),
      ...dto,
      status: (dto.status as TaskEntity["status"]) ?? "todo",
      priority: (dto.priority as TaskEntity["priority"]) ?? "no-priority",
      labels: dto.labels ?? [],
      subtasks: [],
      comments: [],
    });
    return this.repo.save(task);
  }

  async update(id: string, dto: UpdateTaskDto) {
    const task = await this.findOne(id);
    Object.assign(task, dto);
    return this.repo.save(task);
  }

  async remove(id: string) {
    const task = await this.findOne(id);
    await this.repo.remove(task);
    return { deleted: true };
  }
}
