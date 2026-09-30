import { chromium } from 'playwright';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const BASE_URL = 'https://choyon.dev';
const ASSETS_DIR = path.join(__dirname, 'assets');

async function capture() {
  console.log('🚀 Launching Chromium to capture retina screenshots of ' + BASE_URL);
  const browser = await chromium.launch();

  // Desktop Context (1440x900, 2x Retina scale)
  const desktopContext = await browser.newContext({
    viewport: { width: 1440, height: 900 },
    deviceScaleFactor: 2,
  });
  const desktopPage = await desktopContext.newPage();

  console.log('📸 Navigating to Home...');
  await desktopPage.goto(BASE_URL, { waitUntil: 'networkidle' });
  await desktopPage.waitForTimeout(2000); // Allow animations to settle

  // 1. Hero / Banner
  console.log('📸 Capturing Banner & Hero...');
  await desktopPage.screenshot({
    path: path.join(ASSETS_DIR, 'banner.png'),
    clip: { x: 0, y: 0, width: 1440, height: 850 },
  });

  await desktopPage.screenshot({
    path: path.join(ASSETS_DIR, '01-hero-section.png'),
    clip: { x: 0, y: 0, width: 1440, height: 900 },
  });

  // 2. Full Home Page
  console.log('📸 Capturing Full Homepage...');
  await desktopPage.screenshot({
    path: path.join(ASSETS_DIR, '02-homepage-full.png'),
    fullPage: true,
  });

  // 3. Work / Projects page
  console.log('📸 Capturing Work page...');
  await desktopPage.goto(`${BASE_URL}/work`, { waitUntil: 'networkidle' });
  await desktopPage.waitForTimeout(1500);
  await desktopPage.screenshot({
    path: path.join(ASSETS_DIR, '03-work-projects.png'),
    clip: { x: 0, y: 0, width: 1440, height: 950 },
  });

  // 4. Services page
  console.log('📸 Capturing Services page...');
  await desktopPage.goto(`${BASE_URL}/services`, { waitUntil: 'networkidle' });
  await desktopPage.waitForTimeout(1500);
  await desktopPage.screenshot({
    path: path.join(ASSETS_DIR, '04-services-pricing.png'),
    clip: { x: 0, y: 0, width: 1440, height: 950 },
  });

  // 5. Interactive Tools: Speed & SEO Doctor
  console.log('📸 Capturing Speed & SEO Doctor tool...');
  await desktopPage.goto(`${BASE_URL}/tools/website-speed-seo-ai-doctor`, { waitUntil: 'networkidle' });
  await desktopPage.waitForTimeout(1500);
  await desktopPage.screenshot({
    path: path.join(ASSETS_DIR, '05-tool-speed-seo-doctor.png'),
    clip: { x: 0, y: 0, width: 1440, height: 900 },
  });

  // 6. Interactive Tools: CMS Tech Matchmaker
  console.log('📸 Capturing CMS Tech Matchmaker tool...');
  await desktopPage.goto(`${BASE_URL}/tools/cms-tech-stack-matchmaker`, { waitUntil: 'networkidle' });
  await desktopPage.waitForTimeout(1500);
  await desktopPage.screenshot({
    path: path.join(ASSETS_DIR, '06-tool-cms-matchmaker.png'),
    clip: { x: 0, y: 0, width: 1440, height: 900 },
  });

  // 7. Contact & Booking
  console.log('📸 Capturing Contact page...');
  await desktopPage.goto(`${BASE_URL}/contact`, { waitUntil: 'networkidle' });
  await desktopPage.waitForTimeout(1500);
  await desktopPage.screenshot({
    path: path.join(ASSETS_DIR, '07-contact-booking.png'),
    clip: { x: 0, y: 0, width: 1440, height: 950 },
  });

  // 8. Mobile Viewport (iPhone 14 / 390x844 @ 3x)
  console.log('📱 Capturing Mobile responsive view...');
  const mobileContext = await browser.newContext({
    viewport: { width: 390, height: 844 },
    deviceScaleFactor: 3,
    isMobile: true,
  });
  const mobilePage = await mobileContext.newPage();
  await mobilePage.goto(BASE_URL, { waitUntil: 'networkidle' });
  await mobilePage.waitForTimeout(2000);
  await mobilePage.screenshot({
    path: path.join(ASSETS_DIR, '08-mobile-view.png'),
    clip: { x: 0, y: 0, width: 390, height: 844 },
  });

  await browser.close();
  console.log('🎉 All high-resolution screenshots successfully saved in ./assets !');
}

capture().catch((err) => {
  console.error('Error during capture:', err);
  process.exit(1);
});
