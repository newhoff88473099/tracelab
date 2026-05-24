import { Module } from '@nestjs/common';
import { PrismaModule } from './prisma/prisma.module';
import { CacheModule } from './cache/cache.module';
import { StorageModule } from './storage/storage.module';
import { AuthModule } from './auth/auth.module';
import { UsersModule } from './users/users.module';
import { LaboratoriesModule } from './laboratories/laboratories.module';
import { ClientsModule } from './clients/clients.module';
import { ProductsModule } from './products/products.module';
import { SamplesModule } from './samples/samples.module';
import { AnalysesModule } from './analyses/analyses.module';

@Module({
  imports: [
    PrismaModule,
    CacheModule,
    StorageModule,
    AuthModule,
    UsersModule,
    LaboratoriesModule,
    ClientsModule,
    ProductsModule,
    SamplesModule,
    AnalysesModule,
  ],
})
export class AppModule {}
