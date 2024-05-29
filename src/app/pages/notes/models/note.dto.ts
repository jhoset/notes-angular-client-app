import {CategoryDto} from "./category.dto";

export interface NoteDto {
  id: number;
  title: string;
  description: string;
  isActive?: boolean;
  categories?: CategoryDto[];
}
