import { test, expect } from '@playwright/test';
import { TextEditor } from '../test/pages/text-editor/text-editor';
import { TextFormat } from '../test/types/text-format';

test.describe('Automate online html editor', () => {
    test('should type and format text', async ({ page }) => {
        const onlineTextEditor = new TextEditor(page);
        await onlineTextEditor.goto();
        await onlineTextEditor.typeTextWithFormatting(
            'Automation',
            TextFormat.Bold,
        );
        await onlineTextEditor.textbox.pressSequentially(' ');
        await onlineTextEditor.typeTextWithFormatting(
            'Test',
            TextFormat.Underline,
        );
        await onlineTextEditor.textbox.pressSequentially(' Example');
        await expect(onlineTextEditor.placeholder).toHaveJSProperty(
            'innerHTML',
            '<strong>Automation</strong> <u>Test</u>⁠⁠⁠⁠⁠⁠⁠ Example',
        );
    });
});
