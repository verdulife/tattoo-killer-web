/* import puppeteer from "puppeteer";
import { writeFileSync } from "node:fs";

const URL = "https://www.picuki.com/profile/aitor_tattookiller";
const browser = await puppeteer.launch({ headless: "new" });
const page = await browser.newPage();

await page.goto(URL);
await page.waitForSelector("div.content");

const posts = await page.evaluate(() => {
  const maxPosts = 9;
  const images = document.querySelectorAll('ul.box-photos img[src]');
  return [].slice
    .call(images, 0, maxPosts)
    .map((img) => ({ url: img.src, alt: img.alt }));
});

console.log(posts);

const viewportSize = 400;

for (let i = 0; i < posts.length; i++) {
  const { alt } = posts[i];
  const filename = `post-${i + 1}.jpg`;

  await page.setViewport({ width: viewportSize, height: viewportSize });

  await page.goto(posts[i].url);
  await page.screenshot({ path: `./public/posts/${filename}`, type: "jpeg" });

  posts[i] = { alt, src: `./posts/${filename}` };

  console.log(`${i + 1}/${posts.length}`);
}

const json = JSON.stringify(posts, null, 2);
writeFileSync("./src/lib/posts.json", json, "utf-8");

await browser.close(); */

const res = await fetch("https://gramsnap.com/api/convert", {
  "headers": {
    "accept": "application/json, text/plain, */*",
    "accept-language": "es-ES,es;q=0.7",
    "content-type": "application/json",
    "priority": "u=1, i",
    "sec-ch-ua": "\"Not)A;Brand\";v=\"99\", \"Brave\";v=\"127\", \"Chromium\";v=\"127\"",
    "sec-ch-ua-mobile": "?0",
    "sec-ch-ua-platform": "\"Windows\"",
    "sec-fetch-dest": "empty",
    "sec-fetch-mode": "cors",
    "sec-fetch-site": "same-origin",
    "sec-gpc": "1",
    "x-xsrf-token": "eyJpdiI6ImlpcEZjZHdtV1BvOGU4VUdqYnRwVlE9PSIsInZhbHVlIjoiUzM2WWR1bG9pdEpCY2ZCMlVcL2RoWkxMUEMyelpIVktIVTZ6VDA0MGt2NVFZcktEVTQ3N0VKQUNESktGVDd6T0lDUVVYU1JSV3VSYmJcL3lZN0l3T3NCalpydkNJXC82azJnSlBxTUFKT1RCZHlOa3l4VHllQWx1ZThJSFZtRTB4UGIiLCJtYWMiOiIwZTc1Y2IyYjZjN2EyMGFlNThlM2JhNzIyNjkwZWVkNGIyNWUzMmUwYzZmZjRkYzA0NjIzZjUzOWFkNTU1NzM5In0=",
    "cookie": "uid=5e691796e473268d; XSRF-TOKEN=eyJpdiI6ImlpcEZjZHdtV1BvOGU4VUdqYnRwVlE9PSIsInZhbHVlIjoiUzM2WWR1bG9pdEpCY2ZCMlVcL2RoWkxMUEMyelpIVktIVTZ6VDA0MGt2NVFZcktEVTQ3N0VKQUNESktGVDd6T0lDUVVYU1JSV3VSYmJcL3lZN0l3T3NCalpydkNJXC82azJnSlBxTUFKT1RCZHlOa3l4VHllQWx1ZThJSFZtRTB4UGIiLCJtYWMiOiIwZTc1Y2IyYjZjN2EyMGFlNThlM2JhNzIyNjkwZWVkNGIyNWUzMmUwYzZmZjRkYzA0NjIzZjUzOWFkNTU1NzM5In0%3D; gramsnap_session=eyJpdiI6InBGRTlyUXJPYW9Razd0M1hLRlRKWHc9PSIsInZhbHVlIjoiSlZHSlJCRFwvZFlCVkRiUFd5NVVyZ1NaTlVMYzBzN2hMY2JOK2t6cUMrZlwvNU5ZTnlKd2dtWDkwMFZ4M2xPcysyZU5KdFlGdHBRbGJMdFZzVzlxdkNZQmpaSkdhVEpJSGl4UjBBQ3FKakh2dVNcL0FDRldhRkFRSXFLT2ZJTllOVEMiLCJtYWMiOiJkNGMxYTk5ODk2NTEyYTAxM2Q2NzMwNjkwOGE5YWEyMzBmMWU0MmRiMjcyYTQ4ZTNiMTExMGZjYzliMjc1Njc3In0%3D",
    "Referer": "https://gramsnap.com/en/",
    "Referrer-Policy": "strict-origin-when-cross-origin"
  },
  "body": "{\"url\":\"https://www.instagram.com/aitor_tattookiller/\",\"ts\":1723506555556,\"_ts\":1722509794177,\"_tsc\":0,\"_s\":\"35ee0db012ec2984d913f75fe327c194a2fbed850848a14c785a73231016037f\"}",
  "method": "POST"
});

const json = await res.json();
console.log(json);