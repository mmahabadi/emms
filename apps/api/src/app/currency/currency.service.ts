import {Injectable} from "@nestjs/common";
import {from, Observable} from "rxjs";
import {InjectRepository} from "@nestjs/typeorm";
import {Repository} from "typeorm";
import {Currency} from "./currency.entity";

@Injectable()
export class CurrencyService {
    constructor(
        @InjectRepository(Currency)
        private readonly currencyRepository: Repository<Currency>,
    ) {}


    async getCurrency(id: number): Promise<Currency> {
        // from(this.checkForSave(asset));
        try {
            const currency = await this.currencyRepository.findOne(id);
            return currency;
        } catch (e) {
            console.log(e)

        }
    }

}
