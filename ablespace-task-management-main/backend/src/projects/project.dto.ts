import { IsIn, IsOptional, IsString, MaxLength, MinLength } from "class-validator";

const PRIORITIES = ["no-priority", "urgent", "high", "medium", "low"];

export class CreateProjectDto {
  @IsString()
  @MinLength(1)
  @MaxLength(200)
  name: string;

  @IsOptional()
  @IsIn(PRIORITIES)
  priority?: string;

  @IsOptional()
  @IsString()
  lead?: string;

  @IsOptional()
  @IsString()
  dueDate?: string;
}

export class UpdateProjectDto {
  @IsOptional()
  @IsString()
  @MinLength(1)
  @MaxLength(200)
  name?: string;

  @IsOptional()
  @IsIn(PRIORITIES)
  priority?: string;

  @IsOptional()
  @IsString()
  lead?: string;

  @IsOptional()
  @IsString()
  dueDate?: string;
}
