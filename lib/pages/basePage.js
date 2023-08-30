import config from "config";

export class BasePage {
  /**
   * @param {import('@playwright/test').Page} page
   */
  constructor(page, path = "") {
    if (!config.get("url.protocol") || !config.get("url.host")) {
      throw Error("No host or protocol in config.");
    }
    const domain = `${config.get("url.protocol")}${config.get("url.host")}`;

    this.page = page;
    this.url = `${domain}${path}`;
  }

  async goto() {
    await this.page.goto(this.url);
  }
}
