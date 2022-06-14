import { Module } from '@nestjs/common';
import { OperService } from './services/oper.service';
import { OperController } from './controllers/oper.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { OperPostEntity } from './models/post.entity';
import {JwtModule} from "@nestjs/jwt";

@Module({
  imports: [TypeOrmModule.forFeature([OperPostEntity]),
    JwtModule.register({ secret: process.env.SECRET }),
  ],
  providers: [OperService],
  controllers: [OperController],
})
export class OperModule {}
