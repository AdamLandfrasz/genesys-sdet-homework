import { type APIRequestContext, expect } from '@playwright/test';
import { type User } from '../types/user';

export class JsonPlaceholder {
    private readonly requestContext: APIRequestContext;
    private readonly apiHost: string;

    constructor(requestContext: APIRequestContext) {
        this.requestContext = requestContext;
        this.apiHost = 'https://jsonplaceholder.typicode.com';
    }

    async getUsers(): Promise<User[]> {
        const apiResponse = await this.requestContext.get(
            `${this.apiHost}/users`,
        );
        expect(apiResponse.ok()).toBeTruthy();
        return await apiResponse.json();
    }
}
