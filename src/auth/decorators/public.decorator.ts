import { SetMetadata } from "@nestjs/common";

export const IsPublic = "isPublic"
export const Public = () => SetMetadata(IsPublic, true);