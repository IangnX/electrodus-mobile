import { User } from "./user";

export interface ResponseApiMessage {
  status: string,
  data: User,
  message:string
  error: string
}
