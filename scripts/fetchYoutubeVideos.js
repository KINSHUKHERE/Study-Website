const fs = require('fs');
const path = require('path');
const https = require('https');

// Config
const CHANNEL_ID = 'UC78T-eqUy_VTqgQO-4JWtbg'; // TrigTech Solutions Channel ID
const OUTPUT_FILE = path.join(__dirname, '..', 'src', 'data', 'youtubeData.json');

// Get API Key from command line arguments
const args = process.argv.slice(2);
const apiKeyArg = args.find(arg => arg.startsWith('--key='));
const API_KEY = apiKeyArg ? apiKeyArg.split('=')[1] : process.env.YOUTUBE_API_KEY;

if (!API_KEY) {
  console.error('\x1b[31mError: YouTube API Key is missing!\x1b[0m');
  console.log('Please run the script with your API Key:');
  console.log('  \x1b[36mnode scripts/fetchYoutubeVideos.js --key=YOUR_API_KEY\x1b[0m\n');
  process.exit(1);
}

// Helper to make https GET requests
function makeRequest(url) {
  return new Promise((resolve, reject) => {
    https.get(url, (res) => {
      let data = '';
      res.on('data', (chunk) => data += chunk);
      res.on('end', () => {
        try {
          const json = JSON.parse(data);
          if (json.error) {
            reject(new Error(json.error.message));
          } else {
            resolve(json);
          }
        } catch (e) {
          reject(e);
        }
      });
    }).on('error', (err) => reject(err));
  });
}

// Fetch all playlist items (paginated)
async function fetchPlaylistItems(playlistId) {
  let videos = [];
  let nextPageToken = '';
  
  do {
    const url = `https://www.googleapis.com/youtube/v3/playlistItems?part=snippet,contentDetails&playlistId=${playlistId}&maxResults=50&key=${API_KEY}${nextPageToken ? `&pageToken=${nextPageToken}` : ''}`;
    try {
      const data = await makeRequest(url);
      if (data.items) {
        data.items.forEach(item => {
          const snippet = item.snippet;
          const contentDetails = item.contentDetails;
          
          if (snippet && snippet.resourceId && snippet.resourceId.videoId) {
            videos.push({
              id: snippet.resourceId.videoId,
              title: snippet.title || 'Untitled',
              description: snippet.description || '',
              date: (snippet.publishedAt || '').split('T')[0] || '',
              youtubeId: snippet.resourceId.videoId,
              url: `https://www.youtube.com/watch?v=${snippet.resourceId.videoId}`
            });
          }
        });
      }
      nextPageToken = data.nextPageToken || '';
    } catch (e) {
      console.error(`Error fetching items for playlist ${playlistId}:`, e.message);
      nextPageToken = '';
    }
  } while (nextPageToken);
  
  return videos;
}

// Main Runner
async function run() {
  console.log(`\n\x1b[33mFetching playlists for channel ID: ${CHANNEL_ID}...\x1b[0m`);
  
  try {
    // 1. Fetch all playlists
    const playlistsUrl = `https://www.googleapis.com/youtube/v3/playlists?part=snippet&channelId=${CHANNEL_ID}&maxResults=50&key=${API_KEY}`;
    const playlistData = await makeRequest(playlistsUrl);
    
    if (!playlistData.items || playlistData.items.length === 0) {
      console.log('No public playlists found for this channel.');
      return;
    }
    
    console.log(`Found ${playlistData.items.length} playlists. Fetching videos for each...`);
    
    const formattedData = {};
    
    // 2. Loop through each playlist and fetch its videos
    for (const playlist of playlistData.items) {
      const title = playlist.snippet.title;
      const playlistId = playlist.id;
      
      console.log(`- Fetching videos from playlist: \x1b[36m"${title}"\x1b[0m...`);
      const playlistVideos = await fetchPlaylistItems(playlistId);
      console.log(`  Received ${playlistVideos.length} videos.`);
      
      formattedData[title] = playlistVideos;
    }
    
    // 3. Write structured JSON to file
    // Ensure output folder directory exists
    const dir = path.dirname(OUTPUT_FILE);
    if (!fs.existsSync(dir)) {
      fs.mkdirSync(dir, { recursive: true });
    }
    
    fs.writeFileSync(OUTPUT_FILE, JSON.stringify(formattedData, null, 2), 'utf-8');
    
    console.log(`\n\x1b[32mSuccess! Data saved to: ${OUTPUT_FILE}\x1b[0m`);
    console.log(`Now the website has exactly the client's playlists and videos!`);
  } catch (error) {
    console.error('\n\x1b[31mFatal Error during fetching:\x1b[0m', error.message);
  }
}

run();
