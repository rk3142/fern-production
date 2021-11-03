const assert = require('assert');
const { Given, When, Then } = require('@cucumber/cucumber');
const {By,Key,Builder} = require("selenium-webdriver");
let driver = require("chromedriver");

driver = new Builder().forBrowser("chrome").build();

Given('I am on the login page', async function (){
    await driver.get("http://localhost:3000/");
    assert.equal(await driver.findElement(By.id("EntryText")).getText(), "Feeling Blue? Go GREEN")
})

Given('I am on the catalog page', async function (){
    await driver.get("http://localhost:3000/catalog");
    let filters = await driver.findElements(By.className("FilterTitle"))
    assert.equal(await filters[0].getText(), "Price")
    assert.equal(await filters[1].getText(), "Rating")
})

Given('I am on the catalog page with an item in my cart', async function (){
    await driver.get("http://localhost:3000/catalog");
    let filters = await driver.findElements(By.className("FilterTitle"))
    assert.equal(await filters[0].getText(), "Price")
    assert.equal(await filters[1].getText(), "Rating")
    let add_buttons = await driver.findElements(By.className("CartIcon"))
    add_buttons[0].click()
})

When('I go to the website link', async function (){
    await driver.get("http://localhost:3000/");
})

When('I go to the catalog', async function() {
    await driver.get("http://localhost:3000/catalog");
})

Then('I should see the welcome text', async function() {
    assert.equal(await driver.findElement(By.id("EntryText")).getText(), "Feeling Blue? Go GREEN")
})

Then('I should see the filters', async function() {
    let filters = await driver.findElements(By.className("FilterTitle"))
    assert.equal(await filters[0].getText(), "Price")
    assert.equal(await filters[1].getText(), "Rating")
})

Then('I should see all the shirts', async function() {
    let shirts = await driver.findElements(By.className("Item"))
    assert.equal(await shirts.length > 3, true)
})

Then('I should have an empty cart', async function() {
    assert.equal(await driver.findElement(By.className("CartCountText")).getText(), "0")
})

When('I add an item to the cart', async function() {
    let add_buttons = await driver.findElements(By.className("CartIcon"))
    add_buttons[0].click()
})

When('I remove an item from the cart', async function() {
    let add_buttons = await driver.findElements(By.className("CartIcon"))
    add_buttons[0].click()
})

Then('I should have 1 item in the cart', async function() {
    assert.equal(await driver.findElement(By.className("CartCountText")).getText(), "1")
})