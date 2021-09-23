import {TaskStatusEnum} from "./task-status-enum";

export type GetTaskQueryParams = {
  finishPrevisionStart?: string;
  finishPrevisionEnd?: string;
  status?: TaskStatusEnum;
}