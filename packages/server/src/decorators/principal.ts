import { createParamDecorator, ExecutionContext } from "@nestjs/common";
import { Request } from "express";

export const Principal = createParamDecorator(
    (data : unknown, ctx: ExecutionContext) => {
        const request : Request = ctx.switchToHttp().getRequest();
        return request.user;
    }
)

export interface UserPrincipal {
    id: number;
    email: string;
}