// Google Sheets Fetching Service
// Allows using Google Sheets as a free database.

// Instructions for the user to set up their Google Sheet:
// 1. Create a Google Sheet.
// 2. Add headers in the first row: Title, Type (Video or Note), URL, Category, Description, Date, SecondaryURL
// 3. Click 'Share' -> Set to 'Anyone with the link can view' (Viewer permission).
// 4. Copy the Sheet ID from the URL (the long string between /d/ and /edit).
// 5. Replace the SHEET_ID below.

const SHEET_ID = '1r4Rz0t-C1Yg_R-h4aBqU2J5_w-NvxRPh1EEXK8Qh_sM'; // Placeholder: User can put their sheet ID here
const SHEET_NAME = 'Sheet1';

import youtubeData from '../data/youtubeData.json';

// Flatten the YouTube playlists JSON into the mockLectures array
const mockLectures = [];
Object.keys(youtubeData).forEach(playlistName => {
  youtubeData[playlistName].forEach(video => {
    mockLectures.push({
      id: video.id,
      title: video.title,
      type: 'video',
      url: video.url,
      youtubeId: video.youtubeId,
      category: playlistName,
      description: video.description || 'No description available.',
      date: video.date || '2026-06-01',
      secondaryUrl: ''
    });
  });
});

const mockNotes = [
  {
    id: 'nt-1',
    title: 'Handwritten Notes - Integration Complete Chapter Formula Sheet',
    type: 'note',
    url: 'https://drive.google.com/file/d/1_yZ_w8G_A1B2C3D4E5F6G7H8I9J0K1/view?usp=sharing', // Google Drive Share URL
    category: 'Differential Equations',
    description: 'A comprehensive quick-revision formula sheet for Integration. Includes indefinite and definite integrals.',
    date: '2026-06-01',
    secondaryUrl: 'https://t.me/TrigTechMath/5' // Telegram Link
  },
  {
    id: 'nt-2',
    title: 'Matrices & Determinants - Practice Sheet & PYQs PDF',
    type: 'note',
    url: 'https://drive.google.com/file/d/1_yZ_w8G_A1B2C3D4E5F6G7H8I9J0K2/view?usp=sharing',
    category: 'Matrices',
    description: 'Contains 50 selected questions for practice on matrices with detailed step-by-step solutions.',
    date: '2026-05-28',
    secondaryUrl: 'https://t.me/TrigTechMath/4'
  },
  {
    id: 'nt-3',
    title: 'Probability Class 12 - NCERT Solutions & Important Concepts',
    type: 'note',
    url: 'https://drive.google.com/file/d/1_yZ_w8G_A1B2C3D4E5F6G7H8I9J0K3/view?usp=sharing',
    category: 'Random Variables',
    description: 'Detailed NCERT Solutions and concept breakdown of Conditional Probability and Independent Events.',
    date: '2026-05-25',
    secondaryUrl: 'https://t.me/TrigTechMath/3'
  },
  {
    id: 'nt-4',
    title: 'Limits & Derivatives - Class 11 Handwritten Notes',
    type: 'note',
    url: 'https://drive.google.com/file/d/1_yZ_w8G_A1B2C3D4E5F6G7H8I9J0K4/view?usp=sharing',
    category: 'Partial Differentiation',
    description: 'Beautifully compiled handwritten classroom notes for limits and basic derivatives.',
    date: '2026-05-20',
    secondaryUrl: 'https://t.me/TrigTechMath/2'
  }
];

// Helper to extract YouTube video ID
export function extractYoutubeId(url) {
  if (!url) return '';
  const regExp = /^.*(youtu.be\/|v\/|u\/\w\/|embed\/|watch\?v=|\&v=)([^#\&\?]*).*/;
  const match = url.match(regExp);
  return (match && match[2].length === 11) ? match[2] : '';
}

// Helper to convert Google Drive share links to direct download links
export function getDirectDownloadUrl(url) {
  if (!url) return '';
  if (url.includes('drive.google.com')) {
    const match = url.match(/\/file\/d\/([a-zA-Z0-9_-]+)/) || url.match(/[?&]id=([a-zA-Z0-9_-]+)/);
    if (match && match[1]) {
      return `https://docs.google.com/uc?export=download&id=${match[1]}`;
    }
  }
  return url;
}

/**
 * Fetches data from Google Sheets visualization API and parses it
 * Columns expected: Title, Type (video/note), URL, Category, Description, Date, SecondaryURL
 */
export async function fetchDataFromSheet(customSheetId = '') {
  const activeSheetId = customSheetId || SHEET_ID;
  
  if (!activeSheetId || activeSheetId.includes('placeholder') || activeSheetId === '1r4Rz0t-C1Yg_R-h4aBqU2J5_w-NvxRPh1EEXK8Qh_sM') {
    console.log('Using mock data: Google Sheet ID is placeholder or not configured.');
    return { videos: mockLectures, notes: mockNotes };
  }
  
  try {
    const url = `https://docs.google.com/spreadsheets/d/${activeSheetId}/gviz/tq?tqx=out:json&sheet=${SHEET_NAME}`;
    const response = await fetch(url);
    
    if (!response.ok) {
      throw new Error('Network response was not ok');
    }
    
    const text = await response.text();
    // Parse Google visualization JSONP response
    const jsonString = text.substring(text.indexOf('{'), text.lastIndexOf('}') + 1);
    const data = JSON.parse(jsonString);
    
    const rows = data.table.rows;
    const cols = data.table.cols.map(col => col.label || '');
    
    // Parse rows into objects mapping columns dynamically
    const parsedData = rows.map((row, idx) => {
      const rowData = {};
      row.c.forEach((cell, cellIdx) => {
        const columnName = cols[cellIdx] || `col_${cellIdx}`;
        rowData[columnName.toLowerCase()] = cell ? cell.v : '';
      });
      return {
        id: `sheet-${idx}`,
        title: rowData.title || 'Untitled',
        type: (rowData.type || 'video').toLowerCase(),
        url: rowData.url || '',
        youtubeId: rowData.type === 'video' ? extractYoutubeId(rowData.url) : '',
        category: rowData.category || 'General',
        description: rowData.description || '',
        date: rowData.date || '',
        secondaryUrl: rowData.secondaryurl || ''
      };
    });
    
    const videos = parsedData.filter(item => item.type === 'video' || item.type === 'lecture');
    const notes = parsedData.filter(item => item.type === 'note' || item.type === 'pdf');
    
    return { videos, notes };
  } catch (error) {
    console.error('Failed to fetch from Google Sheet, falling back to mock data', error);
    return { videos: mockLectures, notes: mockNotes };
  }
}
