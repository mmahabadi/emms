
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
import {Department} from "./department/department.entity";
import {JobRequest} from "./jobRequest/jobRequest.entity";
import {JobOrder} from "./jobOrder/jobOrder.entity";
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
import {DepartmentModule} from "./department/department.module";
import {JobRequestModule} from "./jobRequest/jobRequest.module";
import {JobOrderModule} from "./jobOrder/jobOrder.module";
import {SkillModule} from "./skill/skill.module";
// import {JwtModule} from "@nestjs/jwt";
import {OperModule} from "./oper/oper.module";
import {Damage} from "./damage/damage.entity";
import {DamageModule} from "./damage/damage.module";
import {EnumsModule} from "./enums/enums.module";

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
       logging: true,
       entities: [
         Activity,
         Asset,
         AssetCat,
         AssetIdentity,
         Currency,
         Goods,
         Department,
         JobRequest,
         JobOrder,
         Damage,
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
     DepartmentModule,
     EnumsModule,
     JobRequestModule,
     JobOrderModule,
     DamageModule,
     SkillModule,
     OperModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
