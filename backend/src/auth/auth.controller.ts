import {Body, Controller, Get, Post, Req, Res, UseGuards} from '@nestjs/common';
import { AuthService } from './auth.service';
import {JwtAuthGuard} from "./jwt/jwt.guard";
import { Response } from 'express';
import { Public } from './jwt/public.decorator';
import {Roles} from "./jwt/roles.decorator";
import {Role} from "./jwt/roles.enum";


@Controller('auth')
export class AuthController {
    constructor(private auth: AuthService) {}

    @Post('register')
    register(@Body() body: { email: string; password: string; companyId: number }) {
        return this.auth.register(body.email, body.password, body.companyId);
    }

    @Public()
    @Post('login')
    login(@Body() body: { email: string; password: string }) {
        console.log(`body: ${JSON.stringify(body)}`);
        return this.auth.login(body.email, body.password);
    }

    @Post('logout')
    logout(@Res() res: Response) {
        // Just return success — actual logout handled client-side
        return res.status(200).json({ message: 'Logged out' })
    }

    @Roles(Role.ADMIN, Role.MEMBER)
    @Get('me')
    getMe(@Req() req) {
        const user = req.user
        return { id: user.sub, email: user.email }
    }
}
