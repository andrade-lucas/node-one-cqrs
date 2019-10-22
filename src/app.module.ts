import { Module } from '@nestjs/common';
import { BackofficeModule } from './modules/backoffice/backoffice.module';
import { MongooseModule } from '@nestjs/mongoose';

@Module({
  imports: [
    BackofficeModule,
    MongooseModule.forRoot('mongodb+srv://nodestr:nodestr@cluster0-jdnvd.mongodb.net/test?retryWrites=true&w=majority'),
  ],
  controllers: [],
  providers: []
})
export class AppModule {}
