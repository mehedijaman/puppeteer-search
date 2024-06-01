const puppeteer = require('puppeteer');

(async () => {
  // Launch the browser
  const browser = await puppeteer.launch({ headless: true });
  const page = await browser.newPage();

  // Go to Google
  await page.goto('https://www.google.com');

  // Type the search query
  const searchQuery = 'Mehedi Jaman';
  await page.type('textarea[name="q"]', searchQuery);

  // Submit the search form
  await Promise.all([
    page.waitForNavigation(),
    page.keyboard.press('Enter')
  ]);

  // Wait for the results to load and display the results
  await page.waitForSelector('h3');

  // Extract the results
  const results = await page.evaluate(() => {
    let items = [];
    let elements = document.querySelectorAll('h3');
    for (let element of elements) {
      items.push({
        title: element.innerText,
        link: element.parentElement.href
      });
    }
    return items;
  });

  // Display the results in console
  console.log(results);

  // Close the browser
  await browser.close();
})();
