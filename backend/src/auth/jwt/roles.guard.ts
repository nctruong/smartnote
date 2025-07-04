import {
    Injectable,
    CanActivate,
    ExecutionContext,
} from '@nestjs/common';
import {Reflector} from '@nestjs/core';
import {ROLES_KEY} from './roles.decorator';
import {Role} from './roles.enum';
import {IS_PUBLIC_KEY} from "./public.decorator";

@Injectable()
export class RolesGuard implements CanActivate {
    constructor(private reflector: Reflector) {
    }

    canActivate(context: ExecutionContext): boolean {
        const isPublic = this.reflector.getAllAndOverride<boolean>(IS_PUBLIC_KEY, [
            context.getHandler(),
            context.getClass(),
        ]);

        if (isPublic) {
            return true;
        }

        const requiredRoles = this.reflector.getAllAndOverride<Role[]>(ROLES_KEY, [
            context.getHandler(),
            context.getClass(),
        ]) || [Role.MEMBER];

        if (!requiredRoles) return true;

        const {user} = context.switchToHttp().getRequest();
        if (!user || !user.role) {
            console.warn('[RolesGuard] No user or user has no role');
            return false; // Or throw new ForbiddenException()
        }
        const hasRole = requiredRoles.includes(user.role);
        console.log(`[RolesGuard] Required: ${requiredRoles}, User role: ${user.role}, Allowed: ${hasRole}`);
        return hasRole;
    }
}
