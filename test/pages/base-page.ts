import { promises as fs } from 'fs';
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

    protected async readJSONFile(filename: string): Promise<any> {
        return JSON.parse(await fs.readFile(filename, 'utf-8'));
    }
}
