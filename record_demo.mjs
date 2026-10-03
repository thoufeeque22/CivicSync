import { chromium } from 'playwright';

(async () => {
  console.log('Launching browser...');
  const browser = await chromium.launch({ headless: true });
  
  // Set viewport to 1080p and enable video recording
  const context = await browser.newContext({
    viewport: { width: 1920, height: 1080 },
    recordVideo: { dir: './.hackathon/videos/', size: { width: 1920, height: 1080 } }
  });
  
  const page = await context.newPage();
  
  console.log('Navigating to CivicSync...');
  await page.goto('http://localhost:3000');
  
  // Wait for the page to load
  await page.waitForTimeout(2000);
  
  console.log('Typing observation naturally...');
  const textToType = "There's this huge abandoned dirt lot behind the old bakery on Dietla 42. It's just collecting trash and weeds. It would be really nice if we could clear it out and maybe plant some vegetables or flowers so the neighborhood has a green space to hang out in.";
  
  // Simulate human typing with a 40ms delay between keystrokes
  await page.type('textarea', textToType, { delay: 40 });
  await page.waitForTimeout(500);
  
  console.log('Clicking Generate...');
  // Click the generate button
  await page.click('button[type="submit"]');
  
  // Wait for the proposal to show up (simulate AI loading)
  console.log('Waiting for AI generation...');
  await page.waitForSelector('text=Action Plan', { timeout: 45000 });
  await page.waitForTimeout(2000);
  
  // Scroll down to show match details and verification
  console.log('Scrolling down...');
  await page.mouse.wheel(0, 500);
  await page.waitForTimeout(2000);
  
  console.log('Clicking Forward to NGO...');
  // Click the "Forward to NGO" button
  await page.click('text=Forward to NGO');
  
  // Wait to show the success state
  await page.waitForTimeout(2000);
  
  console.log('Closing browser and saving video...');
  await context.close();
  await browser.close();
  
  console.log('Done! Video saved in .hackathon/videos/ directory.');
})();
