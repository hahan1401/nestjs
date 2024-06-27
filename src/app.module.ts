import { BullModule } from '@nestjs/bull';
import { CacheModule } from '@nestjs/cache-manager';
import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { APP_GUARD } from '@nestjs/core';
import { MongooseModule } from '@nestjs/mongoose';
import * as redisStore from 'cache-manager-redis-store';
import type { RedisClientOptions } from 'redis';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthGuard } from './auth/auth.guard';
import { AuthModule } from './auth/auth.module';
import { RolesGuard } from './auth/roles.guard';
import { CatsModule } from './cats/cats.module';
import { UsersModule } from './users/users.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      envFilePath: ['.env.development.local', '.env.development'],
      isGlobal: true,
    }),
    MongooseModule.forRoot(
      'mongodb+srv://hanvietha141:hanvietha141@express-nextjs.2aezl0o.mongodb.net/?retryWrites=true&w=majority&appName=express-nextjs/nestjs',
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
  exports: [CatsModule, UsersModule],
  controllers: [AppController],
  providers: [
    AppService,
    {
      provide: APP_GUARD,
      useClass: AuthGuard,
    },
    {
      provide: APP_GUARD,
      useClass: RolesGuard,
    },
  ],
})
export class AppModule {}
