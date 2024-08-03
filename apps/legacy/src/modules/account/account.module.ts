import { Module, forwardRef } from "@nestjs/common";
import { MongooseModule } from "@nestjs/mongoose";
import { AccountService } from "./account.service";
import { AccountController } from "./account.controller";
import { Account, AccountSchema } from "./account.schema";
import { AuthModule } from "../auth/auth.module";
@Module({
    imports: [
        MongooseModule.forFeature([{ name: Account.name, schema: AccountSchema }]),
        forwardRef(() => AuthModule)
    ],
    controllers: [
        AccountController,
    ],
    providers: [
        {
            provide: 'ACCOUNT_SERVICE',
            useClass: AccountService,
        }
    ],
    exports: [
        {
            provide: 'ACCOUNT_SERVICE',
            useClass: AccountService,
        }
    ],
})
export class AccountModule { }