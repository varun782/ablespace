import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { TasksModule } from "./tasks/tasks.module";
import { ProjectsModule } from "./projects/projects.module";
import { TaskEntity } from "./tasks/task.entity";
import { ProjectEntity } from "./projects/project.entity";

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: "better-sqlite3",
      database: process.env.DB_PATH || "data.sqlite",
      entities: [TaskEntity, ProjectEntity],
      synchronize: true, // fine for an assessment project; use migrations in real prod
    }),
    TasksModule,
    ProjectsModule,
  ],
})
export class AppModule {}
