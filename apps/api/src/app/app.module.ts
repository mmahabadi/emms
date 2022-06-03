import {Module} from '@nestjs/common';

import {AppController} from './app.controller';
import {AppService} from './app.service';
import {ConfigModule} from "@nestjs/config";
import {TypeOrmModule} from "@nestjs/typeorm";
import {Activity} from "./activity/activity.entity";
import {Asset} from "./asset/asset.entity";
import {AssetCat} from "./assetCats/assetCat.entity";
import {AssetIdentity} from "./assetIdentity/assetIdentity.entity";
import {Currency} from "./currency/currency.entity";
import {Goods} from "./goods/goods.entity";
import {Location} from "./location/location.entity";
import {Org} from "./org/org.entity";
import {Skill} from "./skill/skill.entity";
import {AssetModule} from "./asset/asset.module";
import {CurrencyModule} from "./currency/currency.module";
import {OrgModule} from "./org/org.module";
import {LocationModule} from "./location/location.module";
import {ActivityModule} from "./activity/activity.module";
import {AssetCatsModule} from "./assetCats/assetCats.module";
import {AssetIdentityModule} from "./assetIdentity/assetIdentity.module";
import {GoodsModule} from "./goods/goods.module";
import {SkillModule} from "./skill/skill.module";

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),
     TypeOrmModule.forRoot({
       type: 'postgres',
       host: process.env.NX_API_DB_HOST,
       port: parseInt(<string>process.env.NX_API_DB_PORT),
       username: process.env.NX_API_DB_USER,
       password: process.env.NX_API_DB_PASS,
       database: process.env.NX_API_DB_DATABASE,
       autoLoadEntities: true,
       synchronize: false,
       "entities": [
         Activity,
         Asset,
         AssetCat,
         AssetIdentity,
         Currency,
         Goods,
         Location,
         Org,
         Skill
       ]
     }),
     AssetModule,
     CurrencyModule,
     OrgModule,
     LocationModule,
     ActivityModule,
     AssetCatsModule,
     AssetIdentityModule,
     GoodsModule,
     SkillModule
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
