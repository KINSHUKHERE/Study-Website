import https from 'https';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);


// Playlists defined by the user
const PLAYLISTS = [
  {
    name: 'Printing Tools / Softwares – Trigtech Solutions',
    id: 'PLPb0UUqAz-9MblE46zSXl8UuMaZGo6eSg'
  },
  {
    name: 'NEET Shorts',
    id: 'PLPb0UUqAz-9NaZCQEuY-pljQqMcpm1M7Q'
  },
  {
    name: 'Excel Shorts 🔥 | Daily Excel Tricks & Shortcuts',
    id: 'PLPb0UUqAz-9NAw-WHR0w1ecEVWVqHUemG'
  },
  {
    name: 'Automation Shorts 🤖 | Python, Excel & Web Automation',
    id: 'PLPb0UUqAz-9Ng3ycnLecuIbWl8y45kttM'
  },
  {
    name: 'Multivariable Calculus (Differentiation) || RTU Kota || 1st Year',
    id: 'PLPb0UUqAz-9N4CAk29RpWOhWniWYgWl0T'
  },
  {
    name: 'Random Variables | 2nd Year | RTU Kota',
    id: 'PLPb0UUqAz-9P5v03JMJel4CGTuJR0FQ9z'
  },
  {
    name: 'LDE of Higher order with const. coeff. RTU Kota',
    id: 'PLPb0UUqAz-9Oly_WzB8ubJDDZOcXyhrla'
  },
  {
    name: 'Differential Equations RTU Kota',
    id: 'PLPb0UUqAz-9MFBSaE4shtNDgamPULOl3x'
  },
  {
    name: 'Unit-1 MATRIX RTU Kota',
    id: 'PLPb0UUqAz-9NOrIj2Q-l-_lR6jQ9s80mT'
  }
];

const OUTPUT_FILE = path.join(__dirname, '..', 'src', 'data', 'youtubeData.json');

// Helper to make https GET requests
function fetchPage(url) {
  return new Promise((resolve, reject) => {
    https.get(url, {
      headers: {
        'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/91.0.4472.124 Safari/537.36',
        'Accept-Language': 'en-US,en;q=0.9'
      }
    }, (res) => {
      let html = '';
      res.on('data', (chunk) => html += chunk);
      res.on('end', () => resolve(html));
    }).on('error', (err) => reject(err));
  });
}

// Scrape videos of a single playlist
async function scrapePlaylist(playlist) {
  const url = `https://www.youtube.com/playlist?list=${playlist.id}`;
  
  try {
    const html = await fetchPage(url);
    const match = html.match(/var ytInitialData = ({.*?});<\/script>/);
    
    if (match && match[1]) {
      const data = JSON.parse(match[1]);
      
      // 1. Try traditional playlist video list
      const listContainer = data.contents?.twoColumnBrowseResultsRenderer?.tabs?.[0]
        ?.tabRenderer?.content?.sectionListRenderer?.contents?.[0]
        ?.itemSectionRenderer?.contents?.[0]
        ?.playlistVideoListRenderer;
        
      const videoItems = listContainer?.contents;
      
      if (videoItems && videoItems.length > 0) {
        const videos = [];
        videoItems.forEach((item, idx) => {
          const videoRenderer = item.playlistVideoRenderer;
          if (videoRenderer) {
            videos.push({
              id: videoRenderer.videoId,
              title: videoRenderer.title?.runs?.[0]?.text || videoRenderer.title?.simpleText || 'Untitled',
              youtubeId: videoRenderer.videoId,
              url: `https://www.youtube.com/watch?v=${videoRenderer.videoId}`,
              description: `Lecture video in ${playlist.name}. Watch the full concept on our YouTube channel.`,
              date: new Date(Date.now() - (idx * 24 * 60 * 60 * 1000)).toISOString().split('T')[0]
            });
          }
        });
        return videos;
      }
      
      // 2. Try rich grid renderer (Shorts playlists)
      const richGridContainer = data.contents?.twoColumnBrowseResultsRenderer?.tabs?.[0]
        ?.tabRenderer?.content?.sectionListRenderer?.contents?.[0]
        ?.itemSectionRenderer?.contents?.[0]
        ?.richGridRenderer;
        
      const richItems = richGridContainer?.contents;
      
      if (richItems && richItems.length > 0) {
        const videos = [];
        richItems.forEach((item, idx) => {
          const richItem = item.richItemRenderer;
          if (richItem) {
            const content = richItem.content;
            const shorts = content?.shortsLockupViewModel;
            if (shorts) {
              const videoId = shorts.onTap?.innertubeCommand?.reelWatchEndpoint?.videoId || shorts.entityId?.replace('shorts-shelf-item-', '');
              if (videoId) {
                const cleanTitle = shorts.overlayMetadata?.primaryText?.content || shorts.accessibilityText?.replace(/,\s*\d[\d,.]*[KMBkmb]?\s+views?\s+-\s+play\s+Shorts?$/i, '').trim() || 'Untitled Shorts';
                videos.push({
                  id: videoId,
                  title: cleanTitle,
                  youtubeId: videoId,
                  url: `https://www.youtube.com/watch?v=${videoId}`,
                  description: `Shorts video in ${playlist.name}. Watch on our YouTube channel.`,
                  date: new Date(Date.now() - (idx * 24 * 60 * 60 * 1000)).toISOString().split('T')[0]
                });
              }
            }
          }
        });
        return videos;
      }

      // Debugging output when both fail
      console.log(`  [Debug] Could not parse videos. Top level keys: ${Object.keys(data).join(', ')}`);
      if (data.alerts) {
        console.log(`  [Debug] Alerts: ${JSON.stringify(data.alerts)}`);
      }
    } else {
      console.log('  [Debug] Could not find ytInitialData in HTML.');
    }
  } catch (err) {
    console.error(`Error scraping playlist ${playlist.name}:`, err.message);
  }
  
  return [];
}

// Scrape videos of a single playlist with retry logic
async function scrapePlaylistWithRetry(playlist, retries = 3, delay = 2500) {
  for (let attempt = 1; attempt <= retries; attempt++) {
    const videos = await scrapePlaylist(playlist);
    if (videos.length > 0) {
      return videos;
    }
    if (attempt < retries) {
      console.log(`  [Attempt ${attempt} returned 0 videos] Retrying in ${delay}ms...`);
      await new Promise(resolve => setTimeout(resolve, delay));
    }
  }
  return [];
}

// Main Runner
async function run() {
  console.log('\n\x1b[33mScraping all 9 playlists from YouTube (Keyless)...\x1b[0m');
  const allData = {};
  
  for (const playlist of PLAYLISTS) {
    console.log(`- Fetching playlist: \x1b[36m"${playlist.name}"\x1b[0m...`);
    const videos = await scrapePlaylistWithRetry(playlist);
    console.log(`  Scraped ${videos.length} videos.`);
    allData[playlist.name] = videos;
    
    // Add delay to avoid rate limiting
    await new Promise(resolve => setTimeout(resolve, 1500));
  }
  
  // Write to output file
  const dir = path.dirname(OUTPUT_FILE);
  if (!fs.existsSync(dir)) {
    fs.mkdirSync(dir, { recursive: true });
  }
  
  fs.writeFileSync(OUTPUT_FILE, JSON.stringify(allData, null, 2), 'utf-8');
  console.log(`\n\x1b[32mSuccess! Scraped data saved to: ${OUTPUT_FILE}\x1b[0m`);
}

run();
