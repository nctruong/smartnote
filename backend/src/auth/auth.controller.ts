import {Body, Controller, Get, Post, Req, Res, UseGuards} from '@nestjs/common';
import { AuthService } from './auth.service';
import {JwtAuthGuard} from "./jwt/jwt.guard";

@Controller('auth')
export class AuthController {
    constructor(private auth: AuthService) {}

    @Post('register')
    register(@Body() body: { email: string; password: string; name?: string }) {
        return this.auth.register(body.email, body.password, body.name);
    }

    @Post('login')
    login(@Body() body: { email: string; password: string }) {
        return this.auth.login(body.email, body.password);
    }

    @UseGuards(JwtAuthGuard)
    @Post('logout')
    logout(@Res() res: Response) {
        // Just return success — actual logout handled client-side
        return res.status(200).json({ message: 'Logged out' })
    }

    @UseGuards(JwtAuthGuard)
    @Get('me')
    getMe(@Req() req) {
        const user = req.user
        return { id: user.sub, email: user.email }
    }
}
