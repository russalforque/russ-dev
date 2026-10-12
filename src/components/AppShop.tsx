import { Download } from 'lucide-react';
import { QRCodeSVG } from 'qrcode.react';
import { apps, type AppItem } from '../data/apps';
import { soundManager } from '../utils/sound';
import Section from './ui/Section';
import Reveal from './ui/Reveal';

function Chip({ children, solid = false }: { children: string; solid?: boolean }) {
  return (
    <span
      className={`inline-flex items-center rounded-full px-2.5 py-0.5 font-mono text-[9px] uppercase tracking-wider ${
        solid ? 'bg-accent text-on-accent' : 'border border-line text-muted'
      }`}
    >
      {children}
    </span>
  );
}

function AppCard({ app }: { app: AppItem }) {
  const plans = app.plans ?? [];
  const isFree = plans.length === 0;
  // Desktop visitors can't install an APK, so give them a way onto their phone.
  const qrTarget = app.websiteUrl ?? app.downloadUrl;
  const links = [
    { label: 'website', href: app.websiteUrl },
    { label: 'install guide', href: app.installGuideUrl },
    { label: 'source', href: app.sourceUrl },
  ].filter((l): l is { label: string; href: string } => Boolean(l.href));

  return (
    <article className="rounded-2xl border border-line bg-surface p-5 sm:p-6">
      <div className="flex flex-wrap items-center gap-1.5">
        {isFree && <Chip solid>free</Chip>}
        <Chip>{app.platform}</Chip>
        <Chip>{`v${app.version}`}</Chip>
        <Chip>{app.requirements}</Chip>
      </div>

      <div className="mt-5 flex gap-6">
        <div className="min-w-0 flex-1">
          <div className="flex items-center gap-3.5">
            <img
              src={app.icon}
              alt={`${app.name} app icon`}
              width={48}
              height={48}
              loading="lazy"
              className="h-12 w-12 shrink-0 rounded-xl border border-line"
            />
            <div className="min-w-0">
              <h3 className="text-[15px] font-medium text-fg">{app.name}</h3>
              <p className="mt-0.5 truncate text-sm text-muted">{app.tagline}</p>
            </div>
          </div>

          <p className="mt-5 text-pretty text-sm leading-relaxed text-muted">{app.description}</p>

          <ul className="mt-5 space-y-1.5">
            {app.features.map((f) => (
              <li key={f} className="flex gap-3 text-[13px] leading-relaxed text-muted">
                <span className="font-mono text-faint" aria-hidden="true">
                  —
                </span>
                {f}
              </li>
            ))}
          </ul>
        </div>

        {/* Desktop only: scan to continue on a phone */}
        <div className="hidden shrink-0 flex-col items-center gap-2 sm:flex">
          <div className="rounded-xl border border-line bg-white p-2.5">
            <QRCodeSVG value={qrTarget} size={88} level="M" aria-hidden="true" />
          </div>
          <span className="max-w-28 text-center font-mono text-[10px] leading-snug text-faint">scan to install on android</span>
        </div>
      </div>

      {!isFree && (
        <div className={`mt-6 grid gap-3 ${plans.length > 1 ? 'grid-cols-2' : 'grid-cols-1'}`}>
          {plans.map((plan) => (
            <div key={plan.name} className="rounded-xl border border-line p-4">
              <div className="flex items-baseline justify-between gap-2">
                <span className="text-sm font-medium text-fg">{plan.name}</span>
                <span className="font-serif text-xl italic text-fg">{plan.price}</span>
              </div>
              <p className="mt-1.5 text-xs leading-relaxed text-muted">{plan.note}</p>
            </div>
          ))}
        </div>
      )}

      <div className="mt-6 flex flex-wrap items-center gap-x-4 gap-y-3 border-t border-line pt-5">
        <a
          href={app.downloadUrl}
          onClick={() => soundManager.playSuccess()}
          aria-label={`Download ${app.name} ${app.version} APK, ${app.size}`}
          className="inline-flex h-9 items-center gap-2 rounded-full bg-fg px-4 text-[13px] font-medium text-bg transition-opacity hover:opacity-80"
        >
          <Download className="h-3.5 w-3.5" />
          Download APK
          <span className="font-mono text-[11px] opacity-60">{app.size}</span>
        </a>
        {links.map((l) => (
          <a
            key={l.label}
            href={l.href}
            target="_blank"
            rel="noopener noreferrer"
            onClick={() => soundManager.playTick(1000)}
            className="font-mono text-[12px] text-muted transition-colors hover:text-fg"
          >
            {l.label} ↗
          </a>
        ))}
      </div>

      <p className="mt-4 font-mono text-[11px] leading-relaxed text-faint">
        Android may ask you to allow installs from your browser the first time.
      </p>
    </article>
  );
}

export default function AppShop() {
  if (apps.length === 0) return null;

  return (
    <Section id="shop" index="02" label="shop" aside="free to download">
      <div className="space-y-4">
        {apps.map((app) => (
          <Reveal key={app.id}>
            <AppCard app={app} />
          </Reveal>
        ))}
      </div>
    </Section>
  );
}
