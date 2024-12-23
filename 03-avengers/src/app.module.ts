import { join } from 'path';

import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { ServeStaticModule } from '@nestjs/serve-static';

import { AvengersModule } from './avengers/avengers.module';
import { CommonModule } from './common/common.module';

@Module({
  imports: [
    ServeStaticModule.forRoot({
      rootPath: join(__dirname, '..', 'public'),
      serveRoot: '/',
    }),
    MongooseModule.forRoot('mongodb://localhost:27017/nest-avengers'),

    AvengersModule,

    CommonModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
