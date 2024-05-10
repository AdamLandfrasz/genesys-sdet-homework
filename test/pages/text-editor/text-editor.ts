import { type Locator, type Page } from '@playwright/test';
import { BasePage } from '../base-page';
import { TextFormat } from '../../types/text-format';

export class TextEditor extends BasePage {
    readonly textbox: Locator;
    readonly placeholder: Locator;

    constructor(page: Page) {
        super(page, 'https://onlinehtmleditor.dev/');
        this.textbox = this.page.getByRole('textbox');
        this.placeholder = this.page.getByRole('textbox').locator('p');
    }

    async typeTextWithFormatting(text: string, format: TextFormat) {
        await this.textbox.press(format);
        await this.textbox.pressSequentially(text);
        await this.textbox.press(format);
    }
}
