import express from 'express';
import path from 'path';
import fs from 'fs';
import { promises as fsAsync } from 'fs';
import { createServer as createViteServer } from 'vite';

const app = express();
const PORT = Number(process.env.PORT) || 3000;

app.use(express.json());

// Persistent storage file path
const DATA_DIR = path.join(process.cwd(), 'data');
const VISITORS_FILE = path.join(DATA_DIR, 'visitors.json');

// Ensure data directory exists
try {
  if (!fs.existsSync(DATA_DIR)) {
    fs.mkdirSync(DATA_DIR, { recursive: true });
  }
} catch (err) {
  console.warn('Could not create data directory, using in-memory store:', err);
}

export interface ViewerSession {
  id: string;
  name: string;
  role?: string;
  avatarId: string;
  location: string;
  countryCode: string;
  flag: string;
  device: string;
  currentSection: string;
  pageViews: number;
  firstSeen: number;
  lastSeen: number;
  note?: string;
  linkedin?: string;
}

// In-memory active presence sessions (active within last 45s)
const activeSessions = new Map<string, ViewerSession>();

// Seed sample past visitors
const defaultPastVisitors: ViewerSession[] = [
  {
    id: 'seed-1',
    name: 'Tech Recruiter',
    role: 'Staff Talent Partner',
    avatarId: 'sketch-1',
    location: 'San Francisco, US',
    countryCode: 'US',
    flag: '🇺🇸',
    device: 'MacBook Pro · Chrome',
    currentSection: 'projects',
    pageViews: 4,
    firstSeen: Date.now() - 1000 * 60 * 12,
    lastSeen: Date.now() - 1000 * 5,
    note: 'Reviewing .NET and React architecture projects.',
  },
  {
    id: 'seed-2',
    name: 'Senior Systems Architect',
    role: 'Engineering Lead',
    avatarId: 'sketch-2',
    location: 'Singapore',
    countryCode: 'SG',
    flag: '🇸🇬',
    device: 'Linux · Chrome',
    currentSection: 'stack',
    pageViews: 7,
    firstSeen: Date.now() - 1000 * 60 * 25,
    lastSeen: Date.now() - 1000 * 15,
    note: 'Impressed by the Kubernetes & ASP.NET Core experience.',
  },
  {
    id: 'seed-3',
    name: 'DevOps Specialist',
    role: 'Cloud Engineer',
    avatarId: 'sketch-3',
    location: 'Sydney, AU',
    countryCode: 'AU',
    flag: '🇦🇺',
    device: 'macOS · Safari',
    currentSection: 'projects',
    pageViews: 3,
    firstSeen: Date.now() - 1000 * 60 * 40,
    lastSeen: Date.now() - 1000 * 20,
  },
  {
    id: 'seed-4',
    name: 'Frontend Lead',
    role: 'UI/UX Developer',
    avatarId: 'sketch-4',
    location: 'Tokyo, JP',
    countryCode: 'JP',
    flag: '🇯🇵',
    device: 'Windows · Edge',
    currentSection: 'experience',
    pageViews: 5,
    firstSeen: Date.now() - 1000 * 60 * 60,
    lastSeen: Date.now() - 1000 * 25,
  },
  {
    id: 'seed-5',
    name: 'Engineering Director',
    role: 'VP Technology',
    avatarId: 'sketch-5',
    location: 'London, UK',
    countryCode: 'GB',
    flag: '🇬🇧',
    device: 'MacBook Air · Chrome',
    currentSection: 'about',
    pageViews: 6,
    firstSeen: Date.now() - 1000 * 60 * 90,
    lastSeen: Date.now() - 1000 * 30,
    note: 'Looking for dependable full-stack talent in APAC.',
  },
  {
    id: 'seed-6',
    name: 'Full-Stack Developer',
    role: 'Peer Engineer',
    avatarId: 'sketch-6',
    location: 'Cebu, PH',
    countryCode: 'PH',
    flag: '🇵🇭',
    device: 'Windows · Chrome',
    currentSection: 'certifications',
    pageViews: 8,
    firstSeen: Date.now() - 1000 * 60 * 120,
    lastSeen: Date.now() - 1000 * 10,
    note: 'Padayon bai! Great portfolio layout.',
  },
  {
    id: 'seed-7',
    name: 'Startup Founder',
    role: 'Product Lead',
    avatarId: 'sketch-7',
    location: 'Toronto, CA',
    countryCode: 'CA',
    flag: '🇨🇦',
    device: 'iPad · Safari',
    currentSection: 'projects',
    pageViews: 2,
    firstSeen: Date.now() - 1000 * 60 * 180,
    lastSeen: Date.now() - 1000 * 35,
  },
  {
    id: 'seed-8',
    name: 'Recruiter from Austin',
    role: 'Tech Sourcing',
    avatarId: 'sketch-8',
    location: 'Austin, US',
    countryCode: 'US',
    flag: '🇺🇸',
    device: 'macOS · Arc',
    currentSection: 'contact',
    pageViews: 4,
    firstSeen: Date.now() - 1000 * 60 * 240,
    lastSeen: Date.now() - 1000 * 18,
  },
];

// Initialize active presence
defaultPastVisitors.forEach((v) => {
  activeSessions.set(v.id, { ...v, lastSeen: Date.now() - Math.floor(Math.random() * 20000) });
});

let visitorHistory: ViewerSession[] = [...defaultPastVisitors];
let totalPageViews = 184;

// Load persisted history from disk
try {
  if (fs.existsSync(VISITORS_FILE)) {
    const data = JSON.parse(fs.readFileSync(VISITORS_FILE, 'utf-8'));
    if (data && Array.isArray(data.visitors)) {
      visitorHistory = data.visitors;
    }
    if (typeof data.totalPageViews === 'number') {
      totalPageViews = data.totalPageViews;
    }
  }
} catch (e) {
  console.warn('Could not read existing visitors file:', e);
}

// Debounced file write (avoids rapid disk churn)
let saveTimeout: NodeJS.Timeout | null = null;
const saveVisitorsToDisk = () => {
  if (saveTimeout) return;
  saveTimeout = setTimeout(async () => {
    saveTimeout = null;
    try {
      await fsAsync.writeFile(
        VISITORS_FILE,
        JSON.stringify(
          {
            totalPageViews,
            visitors: visitorHistory.slice(0, 200),
            updatedAt: new Date().toISOString(),
          },
          null,
          2
        ),
        'utf-8'
      );
    } catch (err) {
      // Ignore write errors
    }
  }, 2000);
};

// Periodic cleanup of stale active viewers
setInterval(() => {
  const cutoff = Date.now() - 45000;
  for (const [id, session] of activeSessions.entries()) {
    if (id.startsWith('seed-')) {
      session.lastSeen = Date.now() - Math.floor(Math.random() * 20000);
    } else if (session.lastSeen < cutoff) {
      activeSessions.delete(id);
    }
  }
}, 15000);

const getFlagEmoji = (countryCode: string) => {
  if (!countryCode || countryCode.length !== 2) return '🌐';
  const codePoints = countryCode
    .toUpperCase()
    .split('')
    .map((char) => 127397 + char.charCodeAt(0));
  return String.fromCodePoint(...codePoints);
};

// API: Heartbeat & Presence
app.post('/api/presence/heartbeat', (req, res) => {
  try {
    const {
      sessionId,
      name,
      role,
      avatarId,
      location,
      countryCode,
      device,
      currentSection,
      note,
      linkedin,
    } = req.body;

    if (!sessionId) {
      return res.status(400).json({ error: 'sessionId required' });
    }

    const now = Date.now();
    totalPageViews += 1;

    const existing = activeSessions.get(sessionId);
    const resolvedCountryCode = countryCode || 'PH';
    const flag = getFlagEmoji(resolvedCountryCode);

    const session: ViewerSession = {
      id: sessionId,
      name: name || existing?.name || `Visitor #${sessionId.slice(-4).toUpperCase()}`,
      role: role || existing?.role || 'Website Visitor',
      avatarId: avatarId || existing?.avatarId || 'sketch-1',
      location: location || existing?.location || 'Direct Visitor',
      countryCode: resolvedCountryCode,
      flag,
      device: device || existing?.device || 'Browser',
      currentSection: currentSection || existing?.currentSection || 'overview',
      pageViews: (existing?.pageViews || 0) + 1,
      firstSeen: existing?.firstSeen || now,
      lastSeen: now,
      note: note || existing?.note,
      linkedin: linkedin || existing?.linkedin,
    };

    activeSessions.set(sessionId, session);

    const historyIndex = visitorHistory.findIndex((v) => v.id === sessionId);
    if (historyIndex >= 0) {
      visitorHistory[historyIndex] = { ...visitorHistory[historyIndex], ...session, lastSeen: now };
    } else {
      visitorHistory.unshift(session);
    }

    saveVisitorsToDisk();

    const activeList = Array.from(activeSessions.values()).map((s) => ({
      ...s,
      isSelf: s.id === sessionId,
    }));

    return res.json({
      success: true,
      onlineCount: activeSessions.size,
      activeViewers: activeList,
      totalViews: totalPageViews,
      uniqueVisitors: visitorHistory.length,
    });
  } catch (error) {
    console.error('Error in /api/presence/heartbeat:', error);
    return res.status(500).json({ error: 'Internal server error' });
  }
});

// API: Get presence status
app.get('/api/presence', (req, res) => {
  const sessionId = req.query.sessionId as string | undefined;
  const activeList = Array.from(activeSessions.values()).map((s) => ({
    ...s,
    isSelf: sessionId ? s.id === sessionId : false,
  }));

  res.json({
    onlineCount: activeSessions.size,
    activeViewers: activeList,
    totalViews: totalPageViews,
    uniqueVisitors: visitorHistory.length,
  });
});

// API: Get full visitor history
app.get('/api/visitors', (req, res) => {
  res.json({
    visitors: visitorHistory.slice(0, 100),
    totalCount: visitorHistory.length,
    totalPageViews,
    onlineCount: activeSessions.size,
  });
});

// API: Leave a guestbook note
app.post('/api/visitors/note', (req, res) => {
  try {
    const { sessionId, name, role, note, linkedin } = req.body;

    if (!sessionId) {
      return res.status(400).json({ error: 'sessionId is required' });
    }

    const active = activeSessions.get(sessionId);
    if (active) {
      if (name) active.name = name;
      if (role) active.role = role;
      if (note) active.note = note;
      if (linkedin) active.linkedin = linkedin;
      active.lastSeen = Date.now();
    }

    const historyIndex = visitorHistory.findIndex((v) => v.id === sessionId);
    if (historyIndex >= 0) {
      visitorHistory[historyIndex] = {
        ...visitorHistory[historyIndex],
        name: name || visitorHistory[historyIndex].name,
        role: role || visitorHistory[historyIndex].role,
        note: note || visitorHistory[historyIndex].note,
        linkedin: linkedin || visitorHistory[historyIndex].linkedin,
        lastSeen: Date.now(),
      };
    }

    saveVisitorsToDisk();

    return res.json({
      success: true,
      updated: visitorHistory[historyIndex] || active,
    });
  } catch (error) {
    console.error('Error in /api/visitors/note:', error);
    return res.status(500).json({ error: 'Failed to save note' });
  }
});

// API: Health check
app.get('/api/health', (req, res) => {
  res.json({ status: 'ok', uptime: process.uptime() });
});

async function startServer() {
  if (process.env.NODE_ENV !== 'production') {
    // Vite middleware for development
    const vite = await createViteServer({
      server: {
        middlewareMode: true,
        watch: {
          // Tell Vite not to watch data/ folder or JSON files
          ignored: ['**/data/**', '**/visitors.json'],
        },
      },
      appType: 'spa',
    });
    app.use(vite.middlewares);
  } else {
    const distPath = path.join(process.cwd(), 'dist');
    app.use(express.static(distPath));
    app.get('*', (req, res) => {
      res.sendFile(path.join(distPath, 'index.html'));
    });
  }

  app.listen(PORT, () => {
    console.log(`\n🚀 Portfolio server running:`);
    console.log(`   ➜ Local: http://localhost:${PORT}\n`);
  });
}

startServer();