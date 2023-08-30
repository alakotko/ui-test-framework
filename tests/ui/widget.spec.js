import { test } from "@playwright/test";
import { DonationWidget } from "../../lib/pages/widgets/donationWidget";
import { DonationPage } from "../../lib/pages/donationPage";

test("Payment / Widget / Card '4242 4242 4242 4242' / Should throw a error ", async ({
  page,
}) => {
  const paymentData = {
    amount: "100",
    currency: "USD",
    currencySymbol: "$",
  };
  const cardData = {
    cardNum: "4242 4242 4242 4242",
    expDate: "04 / 24",
    cvv: "000",
  };
  const personalData = {
    firstName: "First Name",
    lastName: "Last Name",
    email: "alakotko@gmail.com",
  };

  const donationPage = new DonationPage(page);
  const donationWidget = new DonationWidget(page);

  await donationPage.goto();
  await donationPage.giveNowButtonClick();

  await donationWidget.fiatDonateScreenActive();
  await donationWidget.choiceMonthlyPayments();
  await donationWidget.addAmountAndCurrency(
    paymentData.amount,
    paymentData.currency,
    paymentData.currencySymbol
  );
  await donationWidget.donateButtonClick();

  await donationWidget.paymentMethodScreenActive();
  await donationWidget.deselectCoverTransaction();
  await donationWidget.clickCreditCard();

  await donationWidget.creditCardScreenActive();
  await donationWidget.fillCardData(
    cardData.cardNum,
    cardData.expDate,
    cardData.cvv
  );

  await donationWidget.privacyScreenActive();
  await donationWidget.fillPersonalData(
    personalData.firstName,
    personalData.lastName,
    personalData.email
  );
  await donationWidget.privacyContinueClick();

  await donationWidget.creditCardScreenActive();
  await donationWidget.checkErrorAppears();
});
