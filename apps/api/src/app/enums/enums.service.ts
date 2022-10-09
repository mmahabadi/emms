import {Injectable} from "@nestjs/common";

@Injectable()
export class EnumsService {
  async getImportanceType() {
    return [
      {name: 'P01', id: 'P01'},
      {name: 'P02', id: 'P02'},
      {name: 'P03', id: 'P03'},
      {name: 'P04', id: 'P04'},
      {name: 'P05', id: 'P05'},
      {name: 'P06', id: 'P06'},
      {name: 'P07', id: 'P07'},
      {name: 'P08', id: 'P08'},
    ];
  }
  async getRequestType() {
    return [{name: 'TW3CM', id: 'TW3CM'}, {name: 'W1EM', id: 'W1EM'}, {name: 'W2CM', id: 'W2CM'}, {name: 'W3PM', id: 'W3PM'}, {name: 'W4IM', id: 'W4IM'}];
  }
}
