import { type Page } from "@playwright/test";
import { BasePage } from "./base-page";

export class SwagLabs extends BasePage{
    constructor(page:Page){
        super(page, 'https://www.saucedemo.com/inventory.html')
    }
}