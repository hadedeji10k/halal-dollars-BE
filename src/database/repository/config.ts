import { prisma } from "..";
import { Service } from "typedi";

@Service()
export class Config {
  async set(key: string, value: string) {
    const result = await prisma.adminConfig.upsert({
      where: { key },
      create: { key, value },
      update: { key, value },
    });

    return { key: result.key, value: result.value };
  }

  public async setMany(data: { key: string; value: string }[]) {
    const output: { key: string; value: string }[] = [];

    for (let index = 0; index < data.length; index++) {
      const result = await this.set(data[index].key, data[index].value);
      output.push(result);
    }

    return output;
  }

  async get(key: string) {
    const result = await prisma.adminConfig.findUnique({ where: { key } });
    if (result)
      return {
        key: result.key,
        value: result.value,
      };
  }

  public async getMany(keys: string[]) {
    const results = [];

    for (let i = 0; i < keys.length; i++) {
      const data = await prisma.adminConfig.findUnique({ where: { key: keys[i] } });
      if (data) {
        results.push({ key: data.key, value: data.value });
      }
    }

    return results;
  }
}
