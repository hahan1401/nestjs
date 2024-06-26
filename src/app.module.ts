import { BullModule } from '@nestjs/bull';
import { CacheModule } from '@nestjs/cache-manager';
import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { MongooseModule } from '@nestjs/mongoose';
import * as redisStore from 'cache-manager-redis-store';
import type { RedisClientOptions } from 'redis';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthController } from './auth/auth.controller';
import { AuthModule } from './auth/auth.module';
import { AuthService } from './auth/auth.service';
import { CatsModule } from './cats/cats.module';
import { UsersController } from './users/users.controller';
import { UsersModule } from './users/users.module';
import { UsersService } from './users/users.service';

@Module({
  imports: [
    ConfigModule.forRoot({
      envFilePath: ['.env.development.local', '.env.development'],
      isGlobal: true,
    }),
    MongooseModule.forRoot(
      'mongodb+srv://hanvietha141:hanvietha141@express-nextjs.2aezl0o.mongodb.net/?retryWrites=true&w=majority&appName=express-nextjs',
    ),
    CacheModule.register<RedisClientOptions>({
      isGlobal: true,

      // eslint-disable-next-line @typescript-eslint/ban-ts-comment
      /* @ts-ignore */
      store: redisStore,

      // Store-specific configuration:
      host: 'localhost',
      port: 6379,
      ttl: 60,
    }),
    BullModule.forRoot({
      redis: {
        host: 'localhost',
        port: 6379,
      },
    }),
    CatsModule,
    UsersModule,
    AuthModule,
  ],
  exports: [CatsModule],
  controllers: [AppController, UsersController, AuthController],
  providers: [AppService, UsersService, AuthService],
})
export class AppModule {}
