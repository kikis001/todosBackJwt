import { Role } from "./role.model";

export interface PayloadToken {
  sub: string | unknown;
  role: string
}