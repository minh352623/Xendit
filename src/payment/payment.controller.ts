import { Controller, Get, Post, Req, Res } from '@nestjs/common';
import { log } from 'console';
import { config } from 'src/config';
import { PaymentService } from './payment.service';

@Controller('payment')
export class PaymentController {
  constructor(private readonly paymentService: PaymentService) {}

  @Post('invoice')
  async createInvoice(@Req() req: any) {
    try {
      const data = {
        ...config.invoiceData,
        externalID: `checkout-demo-${+new Date()}`,
        currency: req.body.currency,
        amount: req.body.amount,
        failure_redirect_url: req.body.redirect_url,
        success_redirect_url: req.body.redirect_url,
      };
      const result = await this.paymentService.createInvoice(data);
      console.log({ result });
      return result;
    } catch (err) {
      console.log(err);
      return err;
    }
  }
  //
  @Post('disbursements')
  async createDisbursements(@Req() req: any) {
    try {
      const data = {
        externalID: 'disb-1475459775872',
        amount: 9000,
        bankCode: 'BCA',
        accountHolderName: 'MICHAEL CHEN',
        accountNumber: '1234567890',
        description: 'Reimbursement for shoes',
      };
      const result = await this.paymentService.createWithdrawal(data);
      console.log({ result });
      return result;
    } catch (err) {
      console.log(err);
      return err;
    }
  }

  //
  @Get('virtual-account-list')
  getVirtualAccountList() {
    try {
      return this.paymentService.getVirtualAccountList();
    } catch (err) {
      console.log(err);
    }
  }
}
