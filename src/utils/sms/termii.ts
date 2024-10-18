import axios, { AxiosInstance } from "axios";
import { environment } from "../../config/environment";

export class Termii {
  private request: AxiosInstance;

  constructor() {
    this.request = axios.create({ baseURL: environment.termii.baseUrl });
  }

  async sendSms(body: string, to: string) {
    try {
      const data = {
        to,
        sms: body,
        from: "N-Alert",
        type: "plain",
        channel: "dnd",
        api_key: environment.termii.apiKey,
      };

      const response = await this.request.post("/api/sms/send", data);
      return response.data;
    } catch (e: any) {
      throw (e.response && e.response.data) || e;
    }
  }
}
