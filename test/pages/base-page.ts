import { promises as fs } from 'fs';
import { type BrowserContext, type Page } from '@playwright/test';

export class BasePage {
    protected readonly page: Page;
    protected readonly url: string;

    constructor(page: Page, url: string) {
        this.page = page;
        this.url = url;
    }

    async goto() {
        await this.page.goto(this.url);
    }

    async waitForNewPage(
        context: BrowserContext,
        action: () => Promise<any>,
    ): Promise<Page> {
        const pagePromise = context.waitForEvent('page');
        await action();
        return await pagePromise;
    }

    protected async readJSONFile(filename: string): Promise<any> {
        return JSON.parse(await fs.readFile(filename, 'utf-8'));
    }
}
