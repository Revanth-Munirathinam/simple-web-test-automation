const chai = require('chai');
chai.Assertion.addProperty('visible', require('chai-visible'));
const expect = chai.expect;

class BasePage {

    // Fiction Radio Button
    get fictionRadioButton() {
        return $('#radioselect1')
    }
    // Book Radio Button
    get bookRadioButton() {
        return $('//div[@id="radioselect2"]//input[@value="Drama"]')
    }
    // Submit Button
    get submitButton() {
        return $('input[type="submit"]')
    }
    // Discount CheckBox Button
    get discountCheckBox() {
        return $('input[type="checkbox"]')
    }
    // Book DropDown
    get selectBook() {
        return $('select[class="bookoptions"]')
    }
    // Quantity TextBox
    get units() {
        return $('input[name="units"]')
    }
    // Price TextBox
    get price() {
        return $('input[name="price"]')
    }
    // OrderDetails Table
    get orderDetails() {
        return $('//td[text()="1"]')
    }
    // Discount CheckBox
    get discountValue() {
        return $('input[name="discountvalue"]')
    }
    // OrderDetails Sl No
    get orderDetailsSlNo() {
        return $('//table[@id="transactionsection"]/tr/td[1]')
    }
    // OrderDetails Book Name
    get orderDetailsBookName() {
        return $('//table[@id="transactionsection"]/tr/td[2]')
    }
    // OrderDetails Quantity
    get orderDetailsUnit() {
        return $('//table[@id="transactionsection"]/tr/td[3]')
    }
    // OrderDetails Total Price
    get orderDetailsPrice() {
        return $('//table[@id="transactionsection"]/tr/td[4]')
    }
    // OrderDetails Remove Record Button
    get orderDetailsRemoveRecord() {
        return $('span[class="removeRecord"]')
    }
    // OrderDetails Total Price Before Discount
    get orderDetailsTotalValue() {
        return $('//table[@id="transactionsection"]/tr/td[5]')
    }
    // OrderDetails Total Discount Price 
    get orderDetailsDiscountValue() {
        return $('//table[@id="transactionsection"]/tr/td[6]')
    }
    // OrderDetails Total Final Price 
    get orderDetailsFinalValue() {
        return $('//table[@id="transactionsection"]/tr/td[7]')
    }
    // Delete Record Pop Up
    get deleteRecordPopUp() {
        return $('#deletedialog')
    }
    // Delete Record Pop Up Yes Button
    get deleteRecordYesButton() {
        return $('//div[@id="deletedialog"]//button[text()="Yes, Delete it!"]')
    }
    // Delete Record Pop Up No Button
    get deleteRecordNoButton() {
        return $('//div[@id="deletedialog"]//button[text()="No"]')
    }

    /* Place Order for Book Or Drama
    parameters BookName, Price, Quantity, Discount, Type
    */
    async bookOrDrama(bookName, price, quantity, discount, type) {
        if (type === 'book') {
            await (await this.fictionRadioButton).click();
        } else {
            await (await this.bookRadioButton).click();
        }
        browser.pause (700000);
        await (await this.selectBook).waitForExist();
        await (await this.selectBook).selectByVisibleText(bookName);
        await (await this.units).setValue(quantity);
        await (await this.price).setValue(price);
        await (await this.discountCheckBox).click();
        await (await this.discountValue).setValue(discount);
        await (await this.submitButton).click();
    }

    /* Wait for Order Details Section to Display
    */
    async waitForOrderDetails() {
        await (await this.orderDetails).waitForExist();
        expect(await this.orderDetails).to.exist;
    }

    /* Validate Order Details for Book Or Drama
    parameters BookName, Price, Quantity, Discount
    */
    async validateOrderDetails(bookName, price, quantity, discount) {
        let discountAmount = price * discount/100
        let totalDiscountAmount = discountAmount*quantity;
        let totalValue =quantity*price;
        let totalFinalAmount = totalValue - totalDiscountAmount;
        console.log('Discount ' + discountAmount);
        console.log('Total Value ' + totalValue);
        console.log('Total Discount ' + totalDiscountAmount);
        console.log('Total Final Amount ' + totalFinalAmount);
        expect(await (await this.orderDetailsSlNo).getText()).to.include('1');
        expect(await (await this.orderDetailsBookName).getText()).to.equals(bookName);
        expect(await (await this.orderDetailsPrice).getText()).to.include(price);
        expect(await (await this.orderDetailsUnit).getText()).to.equal(quantity);
        expect(await (await this.orderDetailsTotalValue).getText()).to.include(totalValue);
        expect(await (await this.orderDetailsDiscountValue).getText()).to.include(totalDiscountAmount);
        expect(await (await this.orderDetailsFinalValue).getText()).to.include(totalFinalAmount);
    }

    /* I refresh the page and validate the url
    */
    async refreshPage() {
        await browser.refresh();
        await (await this.selectBook).waitForExist();
        expect(await browser.getUrl()).to.equal('https://react.simprocloud.com/build/index.html');
    }

    /* I delete record in the table
    */
    async deleteRecord() {
        await (await this.orderDetailsRemoveRecord).waitForExist();
        expect(await this.orderDetailsRemoveRecord).to.exist;
        await (await this.orderDetailsRemoveRecord).click();
        await (await this.deleteRecordYesButton).waitForExist();
        expect(await this.deleteRecordPopUp).to.exist;
        expect(await this.deleteRecordYesButton).to.exist;
        expect(await this.deleteRecordNoButton).to.exist;
        await (await this.deleteRecordYesButton).click();
    }

    /* I Validate record is successfully deleted
    */
    async validateRecordDeleted() {
        browser.pause (80000);
        expect(await this.orderDetailsRemoveRecord).to.exist;
        expect(await this.orderDetailsSlNo).to.exist;
        expect(await this.orderDetailsBookName).to.exist;
        expect(await this.orderDetailsPrice).to.exist;
        expect(await this.orderDetailsUnit).to.exist;
        expect(await this.orderDetailsTotalValue).to.exist;
        expect(await this.orderDetailsDiscountValue).to.exist;
        expect(await this.orderDetailsFinalValue).to.exist;
    }
}

module.exports = new BasePage();