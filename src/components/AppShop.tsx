import { ArrowUpRight, Download, ShieldCheck, Smartphone } from 'lucide-react';
import { apps, type AppItem } from '../data/apps';
import { soundManager } from '../utils/sound';
import Section, { Em } from './ui/Section';
import Reveal from './ui/Reveal';

function AppCard({ app }: { app: AppItem }) {
  const meta = [app.platform, `v${app.version}`, app.size, app.requirements];

  return (
    <article className="overflow-hidden rounded-2xl border border-line bg-surface">
      <div className="grid grid-cols-1 lg:grid-cols-2">
        {/* Listing */}
        <div className="flex flex-col p-6 sm:p-8">
          <div className="flex items-center gap-4">
            <img
              src={app.icon}
              alt=""
              width={64}
              height={64}
              className="h-16 w-16 shrink-0 rounded-2xl border border-line"
            />
            <div className="min-w-0">
              <h3 className="text-2xl font-semibold tracking-[-0.02em] text-fg">{app.name}</h3>
              <p className="mt-0.5 text-sm text-muted">{app.tagline}</p>
            </div>
          </div>

          <p className="mt-6 text-pretty text-[15px] leading-relaxed text-fg/80">{app.description}</p>

          <ul className="mt-5 flex flex-wrap gap-x-4 gap-y-1 font-mono text-[11px] text-muted" aria-label="App details">
            {meta.map((m) => (
              <li key={m}>{m}</li>
            ))}
          </ul>

          <div className="mt-8 flex flex-wrap items-center gap-3">
            <a
              href={app.downloadUrl}
              onClick={() => soundManager.playSuccess()}
              className="group inline-flex h-11 items-center gap-2 rounded-full bg-accent px-5 text-sm font-medium text-on-accent transition-transform hover:-translate-y-0.5"
            >
              <Download className="h-4 w-4" />
              Download APK
            </a>
            {app.websiteUrl && (
              <a
                href={app.websiteUrl}
                target="_blank"
                rel="noopener noreferrer"
                onClick={() => soundManager.playTick(1000)}
                className="inline-flex h-11 items-center gap-2 rounded-full border border-line-strong px-5 text-sm font-medium text-fg transition-colors hover:border-fg"
              >
                Website
                <ArrowUpRight className="h-4 w-4" />
              </a>
            )}
          </div>

          <p className="mt-auto flex items-start gap-2 pt-8 text-xs leading-relaxed text-muted">
            <Smartphone className="mt-0.5 h-3.5 w-3.5 shrink-0" />
            <span>
              Android may ask you to allow installs from your browser the first time.
              {app.installGuideUrl && (
                <>
                  {' '}
                  <a
                    href={app.installGuideUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="underline decoration-line-strong underline-offset-2 transition-colors hover:text-fg"
                  >
                    Install guide
                  </a>
                </>
              )}
            </span>
          </p>
        </div>

        {/* Details */}
        <div className="border-t border-line bg-bg/40 p-6 sm:p-8 lg:border-l lg:border-t-0">
          <h4 className="eyebrow">What's inside</h4>
          <ul className="mt-4 space-y-2.5">
            {app.features.map((f) => (
              <li key={f} className="flex gap-3 text-sm leading-relaxed text-fg/85">
                <span className="mt-[0.6rem] h-px w-3 shrink-0 bg-accent" aria-hidden="true" />
                {f}
              </li>
            ))}
          </ul>

          {app.plans && app.plans.length > 0 && (
            <>
          <h4 className="eyebrow mt-8">Pricing</h4>
          <div className={`mt-4 grid gap-3 ${app.plans.length > 1 ? 'grid-cols-2' : 'grid-cols-1'}`}>
            {app.plans.map((plan) => (
              <div key={plan.name} className="rounded-xl border border-line bg-surface p-4">
                <div className="flex items-baseline justify-between gap-2">
                  <span className="text-sm font-medium text-fg">{plan.name}</span>
                  <span className="text-lg font-semibold tracking-tight text-fg">{plan.price}</span>
                </div>
                <p className="mt-1.5 text-xs leading-relaxed text-muted">{plan.note}</p>
              </div>
            ))}
          </div>
            </>
          )}

          <div className="mt-8 flex flex-wrap items-center gap-2">
            {app.stack.map((t) => (
              <span key={t} className="rounded-full border border-line px-2.5 py-1 font-mono text-[11px] text-muted">
                {t}
              </span>
            ))}
            {app.sourceUrl && (
              <a
                href={app.sourceUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="ml-auto inline-flex items-center gap-1 font-mono text-[11px] text-muted transition-colors hover:text-accent"
              >
                Source <ArrowUpRight className="h-3 w-3" />
              </a>
            )}
          </div>
        </div>
      </div>
    </article>
  );
}

export default function AppShop() {
  if (apps.length === 0) return null;

  return (
    <Section
      id="shop"
      index="02"
      label="Shop"
      title={
        <>
          Apps you can <Em>download</Em>
        </>
      }
      intro="Software I've built and shipped. Download it, install it, and use it today."
      aside={
        <span className="inline-flex items-center gap-1.5 font-mono text-xs text-muted">
          <ShieldCheck className="h-3.5 w-3.5 text-emerald-500" />
          Free to download
        </span>
      }
    >
      <div className="space-y-5">
        {apps.map((app) => (
          <Reveal key={app.id}>
            <AppCard app={app} />
          </Reveal>
        ))}
      </div>
    </Section>
  );
}
