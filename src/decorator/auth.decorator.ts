import { applyDecorators, SetMetadata, UseGuards } from "@nestjs/common";
import { AuthGuard } from "../guards/auth.guard.ts";

export function Auth(...permissions: string[]) {
  return applyDecorators(
    SetMetadata("permissions", permissions),
    UseGuards(AuthGuard),
  );
}
