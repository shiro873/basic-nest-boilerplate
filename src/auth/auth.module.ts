import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { UsersModule } from '../users/users.module';
import { ConfigModule } from '@nestjs/config';

@Module({
  imports: [UsersModule, ConfigModule], // 👈 Import UsersModule
  providers: [AuthService],
  controllers: [AuthController],
})
export class AuthModule {}
