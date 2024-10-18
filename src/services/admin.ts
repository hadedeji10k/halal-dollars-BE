import { Service } from "typedi";
import { Config } from "../database/repository";

@Service()
export class AdminService {
  constructor(private readonly config: Config) {}

  public async getConfig(keys: string) {
    const keys_spl = keys.split(",");

    if (keys_spl.length < 1) return null;
    if (keys_spl.length > 1) {
      return this.config.getMany(keys_spl.map((key) => key.trim()));
    }

    return (await this.config.get(keys_spl[0])) || null;
  }

  public async setConfig(data: { key: string; value: string }[]) {
    if (data.length > 1) {
      return this.config.setMany(data);
    }

    return await this.config.set(data[0].key, data[0].value);
  }
}
