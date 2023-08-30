import config from "config";
import { BasePage } from "./basePage";

export class DonationPage extends BasePage {
  /**
   * @param {import('@playwright/test').Page} page
   */
  constructor(page) {
    super(page, config.get("url.paths.donationWiget"));

    this.donateFrame = page.frameLocator("[title='Donate Button']");
  }

  async giveNowButtonClick() {
    const giveNowButton = await this.donateFrame.getByText("Give Now");

    await giveNowButton.click();
  }
}
