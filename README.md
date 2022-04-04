# simple-web-test-automation

This project is useful not only as an example of WebdriverIO v5 and integration with Cucumber BDD Framework, but it includes examples of the PageObject pattern, and some practical examples for using WebdriverIO to build an automated test suite with Cucumber (v 5.x) BDD framework.

Project Structure


# Main Project Dependencies
/JDK                         // Java Development Kit Version: 1.8.0_201
/nodejs                      // JavaScript engine Version: 14.17.4
/Cucumber-Framework          // Framework structure Version: 7.19.2
/selenium-standalone-service // Selenium Standalone Service: 7.19.1
/webdriverio                 // Selenium WebDriverIO: 5.12.4
/Chromedriver                // For Chrome browser Version: 94.0.0
/wdio-chromedriver-service   // For Framework service: Version: 7.2.2

Prerequisites
1. Install VSCode in system
2. Download the code from the repository using the  URL:'https://github.com/Revanth-Munirathinam/simple-web-test-automation'
Open project in VSCode
4. Open Terminal

Or 
1. Open Terminal and type 'git clone https://github.com/Revanth-Munirathinam/simple-web-test-automation.git'
2. cd simple-web-test-automation
3. npm install

Run Some Sample Tests
To execute the entire test suite in local development, you can use any one of the options mentioned below

Option 1: npx wdio run wdio.conf.js. You can also run in SauceLabs and BrowserStack by updating the wdio.conf.js file with the required parameters.

Tests are place in *.feature files in the ./features/*.feature directory. A typical test will look similar to this:

Feature: As a wholesale customer, I should be able to place order 

1. 
Scenario: As a wholesale customer, I should be able to order 50 Harry Potter fiction books at a rate of $35.80 each so that I can sell them to my customers.

  Given I launch web application
  
  When I place order for 50 quantity of "Harry Potter" "book" at 50 dollars with a discount of 28.4
  
    And I wait for order details section to load
    
  Then I validate order details for 50 quantity of "Harry Potter" book at 50 dollars with a discount of 28.4

2. 
Scenario: s a book lover, I should be able to order a drama called “The Rainbow” for no more than $125.00 I also want to use my 10% discount voucher so that I can send this book to my mum.

 Given I refresh the page
 
 When I place order for 1 quantity of "The Rainbow" "drama" at 124 dollars with a discount of 10

    And I wait for order details section to load
  Then I validate order details for 1 quantity of "The Rainbow" book at 124 dollars with a discount of 10
  When I delete the existing record
  Then I validate the record is successfully deleted
