function delayTime(ms) {
  return new Promise(function (resolve) {
    setTimeout(resolve, ms);
  });
}

let counter = 1;

async function loginProcess(page, context) {
  const loginUrl = "http://localhost:3000/about";

  await page.goto(loginUrl);

  await page.screenshot({
    path: "./test3.png",
  });

  await delayTime(1500);

  // const isLoginPage = await page.locator(".login-type-img");

  // if (isLoginPage) {
  console.log("login page interactive start");

  // await page.click("div.devider-or > span:first-child");

  await delayTime(500);

  await page.locator('input[name="email"]').fill("brazeTest@test.com");
  await page.screenshot({
    path: "./test3.png",
  });

  await page.locator('input[name="password"]').fill("92@tkddl");
  await page.screenshot({
    path: "./test3.png",
  });

  await page.click("button.hello");

  await page.screenshot({
    path: "./test2.png",
  });

  await page.goto(context.url);
  // await page.waitForNavigation();

  console.log("login page interactive end");
  // }
}

async function setup(browser, context) {
  console.log(counter, context.url);

  const page = await browser.newPage();

  await page.setCacheEnabled(true);

  await page.setViewport({ width: 390, height: 844 });

  console.log("open localhost:3000");

  if (counter === 1) await loginProcess(page, context);
  else {
    await page.goto(context.url);
    console.log("counter", counter);
    await page.screenshot({
      path: "./page.png",
    });
  }

  await delayTime(1000);

  await page.screenshot({
    path: "./close.png",
  });

  await page.close().then(() => console.log("page close done"));

  counter++;
}

module.exports = setup;
