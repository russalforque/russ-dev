import { useState, useEffect, useCallback, useRef } from 'react';

export interface ActiveViewer {
  id: string;
  name: string;
  role?: string;
  avatarId: string;
  location: string;
  countryCode: string;
  flag: string;
  device: string;
  currentSection: string;
  isSelf?: boolean;
  joinedAt?: number;
  lastSeen: number;
  note?: string;
  linkedin?: string;
}

export interface VisitorRecord {
  id: string;
  name: string;
  role?: string;
  avatarId: string;
  location: string;
  countryCode: string;
  flag: string;
  device: string;
  currentSection: string;
  firstSeen: number;
  lastSeen: number;
  pageViews: number;
  note?: string;
  linkedin?: string;
}

export interface PresenceData {
  onlineCount: number;
  activeViewers: ActiveViewer[];
  totalViews: number;
  uniqueVisitors: number;
}

// Generate persistent unique session ID
function getOrCreateSessionId(): string {
  if (typeof window === 'undefined') return 'sess-temp';
  let id = localStorage.getItem('rhazel_portfolio_session_id');
  if (!id) {
    id = 'v-' + Math.random().toString(36).substring(2, 9) + '-' + Date.now().toString(36).slice(-4);
    localStorage.setItem('rhazel_portfolio_session_id', id);
  }
  return id;
}

// Stored custom visitor profile
export function getSavedVisitorProfile(): {
  name: string;
  role: string;
  avatarId: string;
  note: string;
  linkedin: string;
} {
  if (typeof window === 'undefined') {
    return { name: '', role: '', avatarId: 'sketch-1', note: '', linkedin: '' };
  }
  const saved = localStorage.getItem('rhazel_visitor_profile');
  if (saved) {
    try {
      return JSON.parse(saved);
    } catch {
      // fallback
    }
  }

  // Default initial alias based on session
  const randomAvatars = ['sketch-1', 'sketch-2', 'sketch-3', 'sketch-4', 'sketch-5', 'sketch-6'];
  const defaultAvatar = randomAvatars[Math.floor(Math.random() * randomAvatars.length)];
  return {
    name: '',
    role: 'Visiting Engineer / Recruiter',
    avatarId: defaultAvatar,
    note: '',
    linkedin: '',
  };
}

export function saveVisitorProfileLocal(profile: {
  name: string;
  role: string;
  avatarId: string;
  note: string;
  linkedin: string;
}) {
  if (typeof window === 'undefined') return;
  localStorage.setItem('rhazel_visitor_profile', JSON.stringify(profile));
}

// Helper to deduce browser & OS
function getDeviceInfo(): string {
  if (typeof navigator === 'undefined') return 'Desktop Browser';
  const ua = navigator.userAgent;
  let os = 'OS';
  if (/Macintosh|Mac OS X/i.test(ua)) os = 'macOS';
  else if (/Windows/i.test(ua)) os = 'Windows';
  else if (/Linux/i.test(ua)) os = 'Linux';
  else if (/Android/i.test(ua)) os = 'Android';
  else if (/iPhone|iPad|iPod/i.test(ua)) os = 'iOS';

  let browser = 'Chrome';
  if (/Firefox/i.test(ua)) browser = 'Firefox';
  else if (/Safari/i.test(ua) && !/Chrome/i.test(ua)) browser = 'Safari';
  else if (/Edg/i.test(ua)) browser = 'Edge';
  else if (/Opera|OPR/i.test(ua)) browser = 'Opera';

  return `${os} · ${browser}`;
}

// Helper to deduce location / country hint from timezone
function getLocationHint(): { location: string; countryCode: string } {
  try {
    const tz = Intl.DateTimeFormat().resolvedOptions().timeZone || '';
    if (tz.includes('Manila') || tz.includes('Asia/Manila')) {
      return { location: 'Philippines', countryCode: 'PH' };
    }
    if (tz.includes('New_York') || tz.includes('Los_Angeles') || tz.includes('Chicago') || tz.includes('Denver')) {
      return { location: 'United States', countryCode: 'US' };
    }
    if (tz.includes('London')) {
      return { location: 'London, UK', countryCode: 'GB' };
    }
    if (tz.includes('Singapore')) {
      return { location: 'Singapore', countryCode: 'SG' };
    }
    if (tz.includes('Tokyo')) {
      return { location: 'Tokyo, Japan', countryCode: 'JP' };
    }
    if (tz.includes('Sydney') || tz.includes('Melbourne')) {
      return { location: 'Australia', countryCode: 'AU' };
    }
    if (tz.includes('Toronto') || tz.includes('Vancouver')) {
      return { location: 'Canada', countryCode: 'CA' };
    }
    if (tz.includes('Berlin') || tz.includes('Paris') || tz.includes('Amsterdam')) {
      return { location: 'Europe', countryCode: 'DE' };
    }

    // Default clean display from timezone city
    const parts = tz.split('/');
    const city = parts[parts.length - 1].replace(/_/g, ' ');
    return { location: city || 'Global Visitor', countryCode: 'PH' };
  } catch {
    return { location: 'Global Visitor', countryCode: 'PH' };
  }
}

export function usePresence(activeSection: string = 'overview') {
  const [presence, setPresence] = useState<PresenceData>({
    onlineCount: 9, // matching user's requested initial aesthetic
    activeViewers: [],
    totalViews: 184,
    uniqueVisitors: 8,
  });

  const [isLoading, setIsLoading] = useState(true);
  const [visitorProfile, setVisitorProfile] = useState(getSavedVisitorProfile);
  const sessionIdRef = useRef<string>('');

  useEffect(() => {
    sessionIdRef.current = getOrCreateSessionId();
  }, []);

  const sendHeartbeat = useCallback(async () => {
    if (!sessionIdRef.current) return;
    const { location, countryCode } = getLocationHint();
    const device = getDeviceInfo();

    try {
      const res = await fetch('/api/presence/heartbeat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          sessionId: sessionIdRef.current,
          name: visitorProfile.name.trim() || undefined,
          role: visitorProfile.role.trim() || undefined,
          avatarId: visitorProfile.avatarId,
          location,
          countryCode,
          device,
          currentSection: activeSection,
          note: visitorProfile.note.trim() || undefined,
          linkedin: visitorProfile.linkedin.trim() || undefined,
        }),
      });

      if (res.ok) {
        const data = await res.json();
        setPresence({
          onlineCount: data.onlineCount || 9,
          activeViewers: data.activeViewers || [],
          totalViews: data.totalViews || 184,
          uniqueVisitors: data.uniqueVisitors || 8,
        });
        setIsLoading(false);
      }
    } catch {
      // Fallback offline simulation if server unreachable
      setIsLoading(false);
    }
  }, [activeSection, visitorProfile]);

  // Initial heartbeat and recurring poll
  useEffect(() => {
    sendHeartbeat();
    const interval = setInterval(sendHeartbeat, 14000);
    return () => clearInterval(interval);
  }, [sendHeartbeat]);

  // Save profile and notify server immediately
  const updateProfile = useCallback(
    async (newProfile: {
      name: string;
      role: string;
      avatarId: string;
      note: string;
      linkedin: string;
    }) => {
      saveVisitorProfileLocal(newProfile);
      setVisitorProfile(newProfile);

      try {
        await fetch('/api/visitors/note', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            sessionId: sessionIdRef.current,
            name: newProfile.name,
            role: newProfile.role,
            note: newProfile.note,
            linkedin: newProfile.linkedin,
          }),
        });
        sendHeartbeat();
      } catch (err) {
        console.error('Failed to submit visitor note:', err);
      }
    },
    [sendHeartbeat]
  );

  return {
    presence,
    isLoading,
    visitorProfile,
    updateProfile,
    sessionId: sessionIdRef.current,
    refreshPresence: sendHeartbeat,
  };
}
