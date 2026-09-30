import { chromium } from 'playwright';
import path from 'path';
import { fileURLToPath } from 'url';
import fs from 'fs';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const BASE_URL = 'https://choyon.dev';
const VIDEOS_TEMP_DIR = path.join(__dirname, 'videos-temp');
const VIDEOS_DIR = path.join(__dirname, 'videos');

if (!fs.existsSync(VIDEOS_TEMP_DIR)) fs.mkdirSync(VIDEOS_TEMP_DIR, { recursive: true });
if (!fs.existsSync(VIDEOS_DIR)) fs.mkdirSync(VIDEOS_DIR, { recursive: true });

async function record() {
  console.log('🎬 Starting automated browser video recording session for ' + BASE_URL);

  const browser = await chromium.launch();
  const context = await browser.newContext({
    viewport: { width: 1280, height: 720 },
    recordVideo: {
      dir: VIDEOS_TEMP_DIR,
      size: { width: 1280, height: 720 },
    },
  });

  const page = await context.newPage();

  console.log('🎥 Scene 1: Hero & Marquee...');
  await page.goto(BASE_URL, { waitUntil: 'networkidle' });
  await page.waitForTimeout(2500);

  // Smooth scroll down the hero
  await page.mouse.wheel(0, 400);
  await page.waitForTimeout(1500);
  await page.mouse.wheel(0, 400);
  await page.waitForTimeout(1500);

  console.log('🎥 Scene 2: Exploring Projects...');
  await page.goto(`${BASE_URL}/work`, { waitUntil: 'networkidle' });
  await page.waitForTimeout(2000);
  await page.mouse.wheel(0, 500);
  await page.waitForTimeout(1500);

  console.log('🎥 Scene 3: Client Acquisition Tools...');
  await page.goto(`${BASE_URL}/tools/website-speed-seo-ai-doctor`, { waitUntil: 'networkidle' });
  await page.waitForTimeout(2500);
  await page.mouse.wheel(0, 450);
  await page.waitForTimeout(1500);

  console.log('🎥 Scene 4: Services & Pricing Table...');
  await page.goto(`${BASE_URL}/services`, { waitUntil: 'networkidle' });
  await page.waitForTimeout(2000);
  await page.mouse.wheel(0, 500);
  await page.waitForTimeout(1500);

  console.log('🎥 Scene 5: Contact & Booking...');
  await page.goto(`${BASE_URL}/contact`, { waitUntil: 'networkidle' });
  await page.waitForTimeout(2000);
  await page.mouse.wheel(0, 400);
  await page.waitForTimeout(2000);

  // Close context to finalize the video file
  await page.close();
  await context.close();
  await browser.close();

  // Find generated video and rename it
  const files = fs.readdirSync(VIDEOS_TEMP_DIR);
  const recordedVideo = files.find((f) => f.endsWith('.webm'));
  if (recordedVideo) {
    const srcPath = path.join(VIDEOS_TEMP_DIR, recordedVideo);
    const destPath = path.join(VIDEOS_DIR, 'choyon-portfolio-walkthrough.webm');
    fs.renameSync(srcPath, destPath);
    fs.rmSync(VIDEOS_TEMP_DIR, { recursive: true, force: true });
    console.log(`✅ Demo video saved successfully to: ${destPath}`);
  } else {
    console.log('⚠️ Video file was not found in temp dir.');
  }
}

record().catch((err) => {
  console.error('Error recording video:', err);
  process.exit(1);
});
