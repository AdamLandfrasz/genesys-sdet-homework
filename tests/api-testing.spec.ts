import { test, expect } from '@playwright/test';
import { JsonPlaceholder } from '../test/api/json-placeholder';

test.describe('Test a REST api', () => {
    let jsonPlaceholder: JsonPlaceholder;

    test.beforeEach(async ({ request }) => {
        jsonPlaceholder = new JsonPlaceholder(request);
    });

    test('should send GET request and validate data', async () => {
        const users = await jsonPlaceholder.getUsers();
        users.forEach((user) => {
            console.log(
                `${user.name.padEnd(Math.max(...users.map((u) => u.name.length)))} | ${user.email}`,
            );
        });
        expect(users[0].email).toContain('@');
    });
});
