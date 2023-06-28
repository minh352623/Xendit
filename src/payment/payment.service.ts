import { HttpService } from '@nestjs/axios';
import { Injectable } from '@nestjs/common';
const Xendit = require('xendit-node');
import 'dotenv/config';

@Injectable()
export class PaymentService {
  private xendit: any;
  constructor(private readonly httpService: HttpService) {
    this.xendit = new Xendit({
      secretKey: process.env.SECRET_KEY,
    });
  }

  async createInvoice(data: any): Promise<any> {
    try {
      const { Invoice } = this.xendit;
      const invoiceSpecificOptions = {};
      const i = new Invoice(invoiceSpecificOptions);

      const res = await i.createInvoice(data);
      return res;
    } catch (err) {
      console.log(err);
      return err;
    }
  }
  async getVirtualAccountList() {
    const { VirtualAcc } = this.xendit;
    const vaSpecificOptions = {};
    const va = new VirtualAcc(vaSpecificOptions);
    const resp = await va.getVABanks();
    console.log(resp);
    return resp;
  }
  async createWithdrawal(data: any): Promise<any> {
    const url = 'https://api.xendit.co/disbursements';

    const payload = {
      external_id: "disb-{{$timestamp}}",
      amount: 90000,
      bank_code: "BCA",
      account_holder_name: "MICHAEL CHEN",
      account_number: "1234567890",
      description:"Reimbursement for shoes"
    };

    try {
      const response = await this.httpService
        .post(url, payload, {
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${process.env.SECRET_KEY}`,
          },
        })
        .toPromise();

      return response.data;
    } catch (error) {
      console.error('An error occurred while creating the withdrawal:', error);
      throw error;
    }
   
    
   
  }
}
