import lighthouse, { generateReport } from "lighthouse";
import puppeteer from "puppeteer";
import fs from "fs";

function delayTime(ms) {
  return new Promise(function (resolve) {
    setTimeout(resolve, ms);
  });
}

(async () => {
  const browser = await puppeteer.launch({
    args: ["--show-paint-rects"],
  });
  const page = await browser.newPage();

  await page.setViewport({ width: 390, height: 844 });

  console.log("open dev.m.pet-friends.co.kr/my");

  await page.goto("https://dev.m.pet-friends.co.kr/my");

  await delayTime(1500);

  // 로그인 화면 렌딩이 되어야 함.
  const isLoginPage = await page.locator(".login-type-img");

  if (!isLoginPage) return false;

  console.log("login page interactive start");

  await page.click("div.devider-or > span:first-child");

  await delayTime(500);

  await page.locator('input[type="email"]').fill("brazeTest@test.com");
  await page.locator('input[type="password"]').fill("92@tkddl");

  await Promise.all([
    page.click("button.login-button"),
    page.waitForNavigation(),
  ]);

  console.log("login page interactive end");

  await page.screenshot({
    path: "./test2.png",
  });

  const result = await lighthouse(
    "https://dev.m.pet-friends.co.kr/my",
    { output: "json", disableStorageReset: true },
    undefined,
    page
  );

  console.log(
    `Lighthouse scores: ${Object.values(result.lhr.categories)
      .map((c) => c.score)
      .join(", ")}`
  );

  const reportHtml = generateReport(result.lhr, "html");
  const reportJson = generateReport(result.lhr, "json");

  fs.writeFileSync("./lhreportHtml.html", reportHtml);
  fs.writeFileSync("./lhreportJson.json", reportJson);

  await page.screenshot({
    path: "./test1.png",
  });

  await browser.close();

  console.log("close dev.m.pet-friends.co.kr/my");
})()
  .then(() => {
    console.log("puppeteer is done");
  })
  .catch(console.error);
