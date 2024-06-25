import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { CatsModule } from './cats/cats.module';

@Module({
  imports: [
    MongooseModule.forRoot(
      'mongodb+srv://hanvietha141:hanvietha141@express-nextjs.2aezl0o.mongodb.net/?retryWrites=true&w=majority&appName=express-nextjs',
    ),
    CatsModule,
  ],
  exports: [CatsModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
