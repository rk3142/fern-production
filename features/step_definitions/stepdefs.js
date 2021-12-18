const assert = require('assert');
const { Given, When, Then } = require('@cucumber/cucumber');
const { By, Key, Builder } = require("selenium-webdriver");
const auth_token = 'eyJhbGciOiJSUzI1NiIsImtpZCI6IjQ3OTg5ZTU4ZWU1ODM4OTgzZDhhNDQwNWRlOTVkYTllZTZmNWVlYjgiLCJ0eXAiOiJKV1QifQ.eyJuYW1lIjoiQXVtIERpdnlhbmcgVXBhZGh5YXkiLCJwaWN0dXJlIjoiaHR0cHM6Ly9saDMuZ29vZ2xldXNlcmNvbnRlbnQuY29tL2EvQUFUWEFKem5DMTVVMG9MYklqTDkzVGg1Q3NYYXRBbXJSUUVMd1NUR282a0c9czk2LWMiLCJpc3MiOiJodHRwczovL3NlY3VyZXRva2VuLmdvb2dsZS5jb20vZmVybi1kZWE0ZCIsImF1ZCI6ImZlcm4tZGVhNGQiLCJhdXRoX3RpbWUiOjE2MzkzNzEzMzksInVzZXJfaWQiOiJ4NFZvRnJMUENsUE53dmx3N1FVYjdlSlE0TWkxIiwic3ViIjoieDRWb0ZyTFBDbFBOd3ZsdzdRVWI3ZUpRNE1pMSIsImlhdCI6MTYzOTM3MTMzOSwiZXhwIjoxNjM5Mzc0OTM5LCJlbWFpbCI6ImFkdTIxMDRAY29sdW1iaWEuZWR1IiwiZW1haWxfdmVyaWZpZWQiOnRydWUsImZpcmViYXNlIjp7ImlkZW50aXRpZXMiOnsiZ29vZ2xlLmNvbSI6WyIxMTUyMjk5NjUwOTcwNzkzMTQzMzciXSwiZW1haWwiOlsiYWR1MjEwNEBjb2x1bWJpYS5lZHUiXX0sInNpZ25faW5fcHJvdmlkZXIiOiJnb29nbGUuY29tIn19.HVmg_YlygoLH9Wca96WjQffJblcJTRVC6qzZ7_bJjjjK07rYyzutkciPBC5oz4fNjDTaeLeCOu8Lu2DxK6iintEganIHzBvem3VUu426wzmoC54zyOywmWhH2UWLmPV4EBPWGnq9_8OC3YG-ivnEnMNDL1DdMMsVAoWT19FCkaxuWDTX4Am-iKNtuVilb9SHAK56FKcDNQYFCGumUU60PRyj2SQFTmbDfdlQY7RS6GrEt8gHHjCzkHmqvJa4wr0yn0uCVoT1VY0IRdEcvlaMcwqJ3vyba0x5yShFTBBbm31HmieDfBOehJVi6J4WKCWXNnVQ8DTtXGx7dmYKb6Xpjg';
let driver = require("chromedriver");

driver = new Builder().forBrowser("chrome").build();

Given('I am on the login page', async function () {
    driver.executeScript(`localStorage.setItem('auth_token', '${auth_token}' );`);
    await driver.get("http://localhost:3000/");
    let text = await driver.findElements(By.className("entry-text"))
    assert.equal(text != null, true)
})

Given('I am on the catalog page', async function () {
    setTimeout(async function () {
        await driver.get("http://localhost:3000/catalog");
        let filters = await driver.findElements(By.className("MuiFormGroup-root css-dmmspl-MuiFormGroup-root"))
        assert.equal(await filters[0].getText(), "Price")
    }, 6000);
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

Given('I am on the user profile page', async function () {
    setTimeout(async function () {
        await driver.get("http://localhost:3000/profile");
    }, 5000);
})

Given('I am on the bookmark page', async function () {
    setTimeout(async function () {
        await driver.get("http://localhost:3000/saved");
    }, 6000);
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
})

When('I go to the user profile page', async function () {
    await driver.get("http://localhost:3000/profile");
})

When('I click on verify image button', async function () {
    setTimeout(async function () {
        let add_buttons = await driver.findElements(By.className("Verify_Text"))
        add_buttons[0].click()
    }, 5000);
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
        assert.equal(await shirts.length != 0, true)
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

When('I click on plant a tree button', async function () {
    setTimeout(async function () {
        let button = await driver.findElements(By.className("MuiButton-root MuiButton-contained MuiButton-containedPrimary MuiButton-sizeMedium MuiButton-containedSizeMedium MuiButtonBase-root details__info__more__actions__buttons-spend css-sghohy-MuiButtonBase-root-MuiButton-root"))
        button[0].click()
    }, 3000);
})

When('I click on collect trash button', async function () {
    setTimeout(async function () {
        let button = await driver.findElements(By.className("MuiButton-root MuiButton-contained MuiButton-containedPrimary MuiButton-sizeMedium MuiButton-containedSizeMedium MuiButtonBase-root details__info__more__actions__buttons-spend css-sghohy-MuiButtonBase-root-MuiButton-root"))
        button[1].click()
    }, 3000);
})

When('I click on capture carbon button', async function () {
    setTimeout(async function () {
        let button = await driver.findElements(By.className("MuiButton-root MuiButton-contained MuiButton-containedPrimary MuiButton-sizeMedium MuiButton-containedSizeMedium MuiButtonBase-root details__info__more__actions__buttons-spend css-sghohy-MuiButtonBase-root-MuiButton-root"))
        button[2].click()
    }, 3000);
})

When('I click on bookmarks', async function () {
    setTimeout(async function () {
        let button = await driver.findElements(By.className("MuiSvgIcon-root MuiSvgIcon-fontSizeMedium css-i4bv87-MuiSvgIcon-root"))
        button[0].click()
    }, 3000);
})

When('I click on logo', async function () {
    setTimeout(async function () {
        let button = await driver.findElements(By.className("page__header__logo"))
        button[0].click()
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

Then('I should see similar products', async function () {
    setTimeout(async function () {
        let shirts = await driver.findElements(By.className("similar_products__title"))
        let text = await shirts[0].getText()
        assert.equal(text.includes("Similar Products", true))
    }, 5000);
})

Then('I should be on user profile page', async function () {
    setTimeout(async function () {
        let filters = await driver.findElements(By.className("User_Subtitle"))
        let text = await filters[0].getText()
        assert.equal(text.includes("spores"), true)
    }, 5000);
})

Then('I should see my spore count', async function () {
    setTimeout(async function () {
        let spores = await driver.findElements(By.className("User_Subtitle"))
        let text = await spores[0].getText()
        assert.equal(text.includes("spores"), true)
    }, 5000);
})

Then('I should see 200 spores', async function () {
    setTimeout(async function () {
        let spores = await driver.findElements(By.className("User_Subtitle"))
        let text = await spores[0].getText()
        assert.equal(text.includes("200"), true)
    }, 5000);
})

Then('I should see 100 spores', async function () {
    setTimeout(async function () {
        let spores = await driver.findElements(By.className("User_Subtitle"))
        let text = await spores[0].getText()
        assert.equal(text.includes("100"), true)
    }, 5000);
})

Then('I should see 450 spores', async function () {
    setTimeout(async function () {
        let spores = await driver.findElements(By.className("User_Subtitle"))
        let text = await spores[0].getText()
        assert.equal(text.includes("100"), true)
    }, 5000);
})

Then('I should see upload', async function () {
    setTimeout(async function () {
        let spores = await driver.findElements(By.className("MuiButton-root MuiButton-text MuiButton-textPrimary MuiButton-sizeMedium MuiButton-textSizeMedium MuiButtonBase-root  css-1e6y48t-MuiButtonBase-root-MuiButton-root"))
        let text = await spores[0].getText()
        assert.equal(text.includes("Upload"), true)
    }, 5000);
})

Then('I should be on the bookmarks page', async function () {
    setTimeout(async function () {
        let bookmarks = await driver.findElements(By.className("saved__list__empty"))
        let text = await bookmarks[0].getText()
        assert.equal(text.includes("saved"), true)
    }, 5000);
})

Then('I should be on the catalog page', async function () {
    setTimeout(async function () {
        let filters = await driver.findElements(By.className("MuiFormGroup-root css-dmmspl-MuiFormGroup-root"))
        let text = await filters[0].getText()
        assert.equal(text.includes("Price"), true)
    }, 5000);
})