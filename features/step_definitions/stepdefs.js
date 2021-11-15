const assert = require('assert');
const { Given, When, Then } = require('@cucumber/cucumber');
const { By, Key, Builder } = require("selenium-webdriver");
const auth_token = 'eyJhbGciOiJSUzI1NiIsImtpZCI6ImY1NWUyOTRlZWRjMTY3Y2Q5N2JiNWE4MTliYmY3OTA2MzZmMTIzN2UiLCJ0eXAiOiJKV1QifQ.eyJuYW1lIjoiQXVtIERpdnlhbmcgVXBhZGh5YXkiLCJwaWN0dXJlIjoiaHR0cHM6Ly9saDMuZ29vZ2xldXNlcmNvbnRlbnQuY29tL2EvQUFUWEFKem5DMTVVMG9MYklqTDkzVGg1Q3NYYXRBbXJSUUVMd1NUR282a0c9czk2LWMiLCJpc3MiOiJodHRwczovL3NlY3VyZXRva2VuLmdvb2dsZS5jb20vZmVybi1kZWE0ZCIsImF1ZCI6ImZlcm4tZGVhNGQiLCJhdXRoX3RpbWUiOjE2MzY5ODQ5MjksInVzZXJfaWQiOiJ4NFZvRnJMUENsUE53dmx3N1FVYjdlSlE0TWkxIiwic3ViIjoieDRWb0ZyTFBDbFBOd3ZsdzdRVWI3ZUpRNE1pMSIsImlhdCI6MTYzNjk4NDkyOSwiZXhwIjoxNjM2OTg4NTI5LCJlbWFpbCI6ImFkdTIxMDRAY29sdW1iaWEuZWR1IiwiZW1haWxfdmVyaWZpZWQiOnRydWUsImZpcmViYXNlIjp7ImlkZW50aXRpZXMiOnsiZ29vZ2xlLmNvbSI6WyIxMTUyMjk5NjUwOTcwNzkzMTQzMzciXSwiZW1haWwiOlsiYWR1MjEwNEBjb2x1bWJpYS5lZHUiXX0sInNpZ25faW5fcHJvdmlkZXIiOiJnb29nbGUuY29tIn19.C7_tjcLHcFyre4e2eloGCxPTAyhy7nSsi1B73PHmyderlUeyJm0hOqsWfyCbM-jQJP8w0HnVOUQll-g2dhEzhxdm5JSQVEyT8IzDf1-6Ys0IMj73l7UKQEdBV4eqo5WF90I1uqCkmWENUIaMcBCYlP9UEb1Vz_ErumUXjLR6EkwTjtygRcz6u_uSc9aV-se57pkCLqhDMLAm_5eMuEAtYlxzMNewwfj4BF6Zh001vgVQ4y4tUvjBWcEFNP8jb-2uhY7nGdyZ485MTBFw6727vCrVmuoZwvu-pzKGifH9VP84JZyKeiUgRXlVqcxzAbniNrYwA1fRkFfLRPfmbTNHlg';
let driver = require("chromedriver");

driver = new Builder().forBrowser("chrome").build();

Given('I am on the login page', async function () {
    driver.executeScript(`localStorage.setItem('auth_token', '${auth_token}' );`);
    await driver.get("http://localhost:3000/");
    let text = await driver.findElements(By.className("entry-text"))
    assert.equal(text != null, true)
})

Given('I am on the catalog page', async function () {
    await driver.get("http://localhost:3000/catalog");
    setTimeout(async function () {
        let filters = await driver.findElements(By.className("FilterTitle"))
        assert.equal(await filters[0].getText(), "Price")
        assert.equal(await filters[1].getText(), "Rating")
    }, 5000);

})

Given('I am on the catalog page with an item in my cart', async function () {

    setTimeout(async function () {
        await driver.get("http://localhost:3000/catalog");
        let filters = await driver.findElements(By.className("FilterTitle"))
        assert.equal(await filters[0].getText(), "Price")
        assert.equal(await filters[1].getText(), "Rating")
        let add_buttons = await driver.findElements(By.className("CartIcon"))
        add_buttons = await driver.findElements(By.className("CartIcon"))
        add_buttons[0].click()
    }, 6000);

})

Given('I am on the product details page', async function () {
    setTimeout(async function () {
        await driver.get("http://localhost:3000/productdetails");
        let shirts = await driver.findElements(By.className("ProductImage"))
        assert.equal(await shirts.length == 1, true)
    }, 3000);
})

When('I go to the website link', async function () {
    await driver.get("http://localhost:3000/");
})

When('I go to the auth link', async function () {
    await driver.get("http://localhost:3000/auth");
})

When('I go to the catalog', async function () {
    await driver.get("http://localhost:3000/catalog");
    let buttons = await driver.findElements(By.className("firebaseui-idp-button mdl-button mdl-js-button mdl-button--raised firebaseui-idp-google firebaseui-id-idp-button"))
    //buttons[0].click()
})

Then('I should see the welcome text', async function () {
    let text = await driver.findElements(By.className("entry-text"))
    assert.equal(text != null, true)
})

Then("I Login", async function () {
    let buttons = await driver.findElements(By.className("firebaseui-idp-button mdl-button mdl-js-button mdl-button--raised firebaseui-idp-google firebaseui-id-idp-button"))
    assert.equal(buttons != null, true)
})

Then('I should see the filters', async function () {
    setTimeout(async function () {
        let filters = await driver.findElements(By.className("FilterTitle"))
        assert.equal(await filters[0].getText(), "Price")
        assert.equal(await filters[1].getText(), "Rating")
    }, 5000);
})

Then('I should see all the shirts', async function () {
    setTimeout(async function () {
        let shirts = await driver.findElements(By.className("Item"))
        assert.equal(await shirts.length > 3, true)
    }, 3000);

})

Then('I should have an empty cart', async function () {
    setTimeout(async function () {
        assert.equal(await driver.findElement(By.className("CartCountText")).getText(), "0")
    }, 5000);
})

When('I add an item to the cart', async function () {
    setTimeout(async function () {
        let add_buttons = await driver.findElements(By.className("CartIcon"))
        add_buttons = await driver.findElements(By.className("CartIcon"))
        try {
            add_buttons[1].click()
        } catch (e) {
            add_buttons[0].click()
        }
    }, 7000);
})

When('I remove an item from the cart', async function () {
    setTimeout(async function () {
        let add_buttons = await driver.findElements(By.className("CartIcon"))
        add_buttons[0].click()
    }, 5000);
})

When('I filter by price', async function () {
    setTimeout(async function () {
        let filter_buttons = await driver.findElements(By.className("Check"))
        filter_buttons[0].click()
    }, 3000);
})

When('I filter by rating', async function () {
    setTimeout(async function () {
        let filter_buttons = await driver.findElements(By.className("Check"))
        filter_buttons[6].click()
    }, 3000);
})

When('I search for the brand Generic', async function () {
    setTimeout(async function () {
        let filter_buttons = await driver.findElements(By.className("SearchBar"))
        filter_buttons[1].sendKeys("Generic")
        let search_button = await driver.findElements(By.className("SearchIcon"))
        search_button[0].click()
    }, 3000);
})

When('I click on product image', async function () {
    setTimeout(async function () {
        let products = await driver.findElements(By.className("ProductImage"))
        products[1].click()
    }, 3000);
})

Then('I should have 1 item in the cart', async function () {
    setTimeout(async function () {
        let el = await driver.findElement(By.className("CartCountText"))
        assert.equal(el.getText(), "1")
    }, 5000);
})

Then('I should have results filtered by price', async function () {
    let shirts = await driver.findElements(By.className("Item"))
    assert.equal(await shirts.length < 20, true)
})

Then('I should have results filtered by rating', async function () {
    let shirts = await driver.findElements(By.className("Item"))
    assert.equal(await shirts.length < 15, true)
})

Then('I should see Generic shirts', async function () {
    setTimeout(async function () {
        let shirts = await driver.findElements(By.className("ProductName"))
        assert.equal(await shirts.length < 15, true)
    }, 5000);
})

Then('I should be on product details page', async function () {
    setTimeout(async function () {
        let shirts = await driver.findElements(By.className("ProductImage"))
        assert.equal(await shirts == null, true)
    }, 5000);
})

Then('I should see environmental details', async function () {
    setTimeout(async function () {
        let details = await driver.findElements(By.className("EcoStatsText"))
        assert.equal(details != null, true)
    }, 3000);
})

Then('I should see product description', async function () {
    setTimeout(async function () {
        let details = await driver.findElements(By.className("ProductDescription"))
        assert.equal(details != null, true)
    }, 3000);
})