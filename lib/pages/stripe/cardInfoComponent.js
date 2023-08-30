export class StripeCardInfo {
  constructor(frame) {
    this.frame = frame;

    const cardNumLocator = 'iframe[title="Secure card number input frame"]';
    const expDateLocator = 'iframe[title="Secure expiration date input frame"]';
    const cvvLocator = 'iframe[title="Secure CVC input frame"]';

    this.cardNumberFrame = this.frame.frameLocator(cardNumLocator);
    this.expDateFrame = this.frame.frameLocator(expDateLocator);
    this.cvvFrame = this.frame.frameLocator(cvvLocator);
  }

  async cardNumInput() {
    const placeholder = "Card number";
    return await this.cardNumberFrame.getByPlaceholder(placeholder);
  }

  async expDateInput() {
    const placeholder = "MM / YY";
    return await this.expDateFrame.getByPlaceholder(placeholder);
  }

  async CVVInput() {
    const placeholder = "CVC";
    return await this.cvvFrame.getByPlaceholder(placeholder);
  }
}
