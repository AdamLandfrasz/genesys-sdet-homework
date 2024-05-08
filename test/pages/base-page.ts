import { type Page } from '@playwright/test';

export class BasePage {
    protected page: Page;
    protected url: string;

    constructor(page: Page, url: string) {
        this.page = page;
        this.url = url;
    }

    async goto() {
        await this.page.goto(this.url);
    }
}
