import { IsString } from "class-validator";

export class SaveSearchDto {
  @IsString()
  public query: string;
}
