import { GroupedCountDto } from './grouped-count-dto';

export class StaticsDto {

  todayScan: number;
  totalUser: number;
  totalOrganizations: number;
  totalDepartments: number;
  totalRooms: number;
  dailyScan: GroupedCountDto[];
}
