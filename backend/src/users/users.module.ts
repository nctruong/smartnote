import { Module } from '@nestjs/common';
import { ControllerModule } from './controller/controller.module';
import { UsersService } from './users.service';

@Module({
  imports: [ControllerModule],
  providers: [UsersService]
})
export class UsersModule {}
