
const {Builder, By, Key, until} = require('selenium-webdriver');
const fs = require("fs");
const chrome = require('selenium-webdriver/chrome');
let opts = new chrome.Options();
const loginURL = 'https://www.tenjin.com/login';
const dataURL = 'https://www.tenjin.com/dashboard/data_exporter?utf8=%E2%9C%93&start_date=2021-01-09&end_date=2021-02-08&granularity=daily&group_by=app_id&metrics%5B%5D=spend&metrics%5B%5D=installs&metrics%5B%5D=clicks&metrics%5B%5D=impressions&metrics%5B%5D=cpi&metrics%5B%5D=ctr&metrics%5B%5D=cvr&metrics%5B%5D=tcpi&report_type=user_acquisition&button=';



const parseTenjin = async function() {
    opts
        .addArguments(['--ignore-certificate-errors', '--ignore-ssl-errors'])
        .setUserPreferences({ 'download.default_directory': './' })
    let driver = await new Builder().forBrowser('chrome')
    .setChromeOptions(new chrome.Options().setUserPreferences({ "download.default_directory": './' }))
    .build();
    
    try {
        await driver.get(dataURL);

        let form = await driver.findElement(By.css('form#login-form'));
        console.log(form);

        let email = await form.findElement(By.css('input#login-input-email'));
        await email.sendKeys('archstar1227@gmail.com');

        let paasword = await form.findElement(By.css('input#login-input-password'));
        await paasword.sendKeys('bizzy2712');

        let submit = await driver.findElement(By.xpath(`//*[@type='submit']`));
        await submit.click();

        let dropdown = await driver.wait(until.elementLocated(By.css('div.datepicker-range')),10000);
        await dropdown.click();

        let elements = await driver.findElements(By.css('div.ranges ul li'));
        elements[1].click();

        let updateDataBtn = await driver.findElement(By.css('button.btn-success'));
        await updateDataBtn.click();

        let download = await driver.findElement(By.css('div.pull-right'));
        await download.click();

        

        driver.sleep(10000);
        
    } catch (e) {
        console.log(e);
    } finally {
        // driver.quit();
    }
}

parseTenjin();
