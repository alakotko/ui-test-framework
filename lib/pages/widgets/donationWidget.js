import { StripeCardInfo } from "../stripe/cardInfoComponent";

const { expect } = require("@playwright/test");

export class DonationWidget {
  /**
   * @param {import('@playwright/test').Page} page
   */
  constructor(page) {
    this.frameLocator = page.frameLocator("[title='Donation Widget']");

    this.stripeCardInfo = new StripeCardInfo(this.frameLocator);
  }

  async displayed() {
    const companyNameWrapper = await this.frameLocator.getByTestId(
      "ask-company-name"
    );
    await expect(companyNameWrapper).toBeVisible();
  }

  async choiceMonthlyPayments() {
    const monthlyButton = await this.frameLocator.getByTestId(
      "more-frequent-button"
    );

    await monthlyButton.click();

    await expect(monthlyButton).toHaveAttribute("aria-current", "true");
  }

  async addAmountAndCurrency(amount, currency, currencySymbol) {
    const amountInput = await this.frameLocator.getByTestId("amount");
    const currencySelector = await this.frameLocator.getByTestId(
      "currency-selector"
    );
    const currencySymbolSelector = await this.frameLocator.getByTestId(
      "currency-symbol"
    );

    // Check default amount, get from config?
    await amountInput.clear();
    await amountInput.type(amount.toString(), { delay: 100 });
    await expect(amountInput).toHaveValue(amount.toString());

    await currencySelector.selectOption(currency);
    await expect(currencySymbolSelector).toHaveText(currencySymbol);
  }

  async donateButtonClick() {
    const donateButton = await this.frameLocator.getByTestId("donate-button");

    await donateButton.click();
  }

  async deselectCoverTransaction() {
    const coverTransactionsCostButton = await this.frameLocator.getByTestId(
      "cover-fee-checkbox"
    );

    if (await coverTransactionsCostButton.isChecked()) {
      await coverTransactionsCostButton.click();
    }

    await expect(coverTransactionsCostButton).not.toBeChecked();
  }

  async clickCreditCard() {
    const creditCardButton = await this.frameLocator.getByTestId("cc-button");

    await creditCardButton.click();
  }

  async fillCardData(cardNum, expDate, cvv) {
    const cardNumInput = await this.stripeCardInfo.cardNumInput();
    const expDateInput = await this.stripeCardInfo.expDateInput();
    const cardCvvInput = await this.stripeCardInfo.CVVInput();
    const continueButton = await this.frameLocator.getByTestId("card-continue");

    await cardNumInput.click();
    await cardNumInput.type(cardNum, { delay: 100 });
    await expect(cardNumInput).toHaveValue(cardNum);

    await expDateInput.type(expDate, { delay: 100 });
    await expect(expDateInput).toHaveValue(expDate);

    await cardCvvInput.type(cvv, { delay: 100 });
    await expect(cardCvvInput).toHaveValue(cvv);

    await continueButton.click();
  }

  async fillPersonalData(firstName, lastName, email) {
    const firstNameInput = await this.frameLocator.getByTestId(
      "personal-first-name"
    );
    const lastNameInput = await this.frameLocator.getByTestId(
      "personal-last-name"
    );
    const personalEmailInput = await this.frameLocator.getByTestId(
      "personal-email"
    );

    await firstNameInput.type(firstName);
    await expect(firstNameInput).toHaveValue(firstName);
    await lastNameInput.type(lastName);
    await expect(lastNameInput).toHaveValue(lastName);
    await personalEmailInput.type(email);
    await expect(personalEmailInput).toHaveValue(email);
  }

  async privacyContinueClick() {
    const privacyContinueButton = await this.frameLocator.getByTestId(
      "privacy-continue"
    );

    await privacyContinueButton.click();
  }

  async checkErrorAppears() {
    const errorTooltip = await this.frameLocator.locator(
      "[data-testid='tooltip-desktop-error-alert']"
    );
    const errorTitle = await errorTooltip.getByTestId(
      "card-continue-error-title"
    );
    const errorMessage = await errorTooltip.getByTestId(
      "card-continue-error-message"
    );

    await expect(errorTooltip).toBeVisible();
    await expect(errorTitle).toBeVisible();
    await expect(errorMessage).toBeVisible();
  }
}
