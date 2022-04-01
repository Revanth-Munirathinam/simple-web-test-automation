const {
    Given,
    When,
    Then
} = require('@cucumber/cucumber');
const {
    discountCheckBox
} = require('../pages/BasePage');
const BasePage = require('../pages/BasePage');
var config = require('./../../wdio.conf.js').config;

/* Launch Web Application*/
Given('I launch web application', async () => {
    await browser.url(config.baseUrl)
    browser.maximizeWindow();
    browser.pause(70000);
});

/* I refresh the Page*/
Given('I refresh the page', async () => {
    await BasePage.refreshPage();
});

/* I place order for "No" quantity of "Book Name" "drama/book" at "price" dollars with a discount of "Discount%"*/
When('I place order for {int} quantity of {string} {string} at {float} dollars with a discount of {float}', async (quantity, book, name, price, discount) => {
    await BasePage.bookOrDrama(book, price, quantity, discount, name);
});

/* I wait for order details section to load*/
When('I wait for order details section to load', async () => {
    await BasePage.waitForOrderDetails();
});

/* I delete the existing record*/
When('I delete the existing record', async () => {
    await BasePage.deleteRecord();
});

/*I validate order details for "No" quantity of "Book name" book at "price" dollars with a discount of "Discount %"e*/
Then('I validate order details for {int} quantity of {string} book at {int} dollars with a discount of {float}', async (quantity, name, price, discount) => {
    await BasePage.validateOrderDetails(name, price, quantity.toString(), discount);
});


/* I validate the record is successfully deleted*/
Then('I validate the record is successfully deleted', async () => {
    await BasePage.validateRecordDeleted()
});