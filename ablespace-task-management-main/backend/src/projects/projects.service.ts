import { Injectable, NotFoundException, OnModuleInit } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { randomUUID } from "crypto";
import { ProjectEntity } from "./project.entity";
import { CreateProjectDto, UpdateProjectDto } from "./project.dto";

@Injectable()
export class ProjectsService implements OnModuleInit {
  constructor(
    @InjectRepository(ProjectEntity)
    private readonly repo: Repository<ProjectEntity>
  ) {}

  async onModuleInit() {
    const count = await this.repo.count();
    if (count > 0) return;

    const seed: Partial<ProjectEntity>[] = [
      { id: "p1", name: "Design Homepage", priority: "high", lead: "Dexter", dueDate: "2026-09-12" },
      { id: "p2", name: "Develop Login Feature", priority: "low", lead: "CN", dueDate: "2026-09-15" },
      { id: "p3", name: "Test Payment Gateway", priority: "medium", dueDate: "2026-09-18" },
    ];

    for (const s of seed) {
      await this.repo.save(this.repo.create(s));
    }
  }

  findAll() {
    return this.repo.find();
  }

  async findOne(id: string) {
    const project = await this.repo.findOne({ where: { id } });
    if (!project) throw new NotFoundException(`Project ${id} not found`);
    return project;
  }

  create(dto: CreateProjectDto) {
    const project = this.repo.create({ id: randomUUID(), ...dto });
    return this.repo.save(project);
  }

  async update(id: string, dto: UpdateProjectDto) {
    const project = await this.findOne(id);
    Object.assign(project, dto);
    return this.repo.save(project);
  }

  async remove(id: string) {
    const project = await this.findOne(id);
    await this.repo.remove(project);
    return { deleted: true };
  }
}
