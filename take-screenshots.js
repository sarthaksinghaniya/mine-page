import { chromium } from 'playwright';
import fs from 'fs';
import path from 'path';

(async () => {
  const browser = await chromium.launch();
  const page = await browser.newPage();
  
  const screenshotDir = path.join(process.cwd(), 'app preview');
  if (!fs.existsSync(screenshotDir)){
      fs.mkdirSync(screenshotDir);
  }

  page.on('console', msg => console.log(`BROWSER ${msg.type()}: ${msg.text()}`));
  page.on('pageerror', err => console.log(`BROWSER ERROR: ${err.message}`));
  
  try {
    console.log("Navigating to http://localhost:5173");
    await page.goto('http://localhost:5173', { waitUntil: 'networkidle' });
    
    // Wait for the game/canvas to load
    await page.waitForTimeout(3000);
    
    console.log("Taking initial screenshot");
    await page.screenshot({ path: path.join(screenshotDir, '1_initial_load.png') });
    
    // Attempt to move character (W, A, S, D)
    console.log("Pressing 'W' to move forward");
    await page.keyboard.down('W');
    await page.waitForTimeout(1000);
    await page.keyboard.up('W');
    
    console.log("Taking screenshot after moving forward");
    await page.screenshot({ path: path.join(screenshotDir, '2_after_move_W.png') });

    console.log("Pressing 'A' to move left");
    await page.keyboard.down('A');
    await page.waitForTimeout(1000);
    await page.keyboard.up('A');
    await page.screenshot({ path: path.join(screenshotDir, '3_after_move_A.png') });

    // Try clicking some UI elements if they exist (assuming buttons or nav exists)
    // We can click the canvas to make sure pointer lock or similar happens
    await page.mouse.click(500, 500);
    await page.waitForTimeout(1000);
    await page.screenshot({ path: path.join(screenshotDir, '4_after_click_canvas.png') });

    console.log("Screenshots saved to 'app preview' directory.");
    
  } catch(e) {
    console.log('Error during testing:', e.message);
  }
  
  await browser.close();
})();
