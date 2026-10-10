import { ArrowUpRight, Download } from 'lucide-react';
import { apps, type AppItem } from '../data/apps';
import { soundManager } from '../utils/sound';
import Section from './ui/Section';

function AppListing({ app }: { app: AppItem }) {
  const meta = [app.platform, `Version ${app.version}`, app.size, `Needs ${app.requirements}`];

  return (
    <article className="border-t border-line py-9 first:border-t-0 first:pt-0 last:pb-0">
      <div className="grid grid-cols-1 gap-x-10 gap-y-6 md:grid-cols-[minmax(0,5fr)_minmax(0,6fr)]">
        <div>
          <div className="flex items-center gap-4">
            <img
              src={app.icon}
              alt=""
              width={56}
              height={56}
              className="h-14 w-14 shrink-0 rounded-[10px] border border-line"
            />
            <div className="min-w-0">
              <h3 className="text-[1.75rem] font-extrabold leading-[1.1] tracking-[-0.025em] text-fg">{app.name}</h3>
              <p className="mt-1 text-[15px] leading-snug text-muted">{app.tagline}</p>
            </div>
          </div>

          <p className="mt-5 text-pretty text-[15px] leading-relaxed text-fg">{app.description}</p>

          <div className="mt-6 flex flex-wrap items-center gap-3">
            <a href={app.downloadUrl} onClick={() => soundManager.playSuccess()} className="btn btn-primary">
              <Download className="h-4 w-4" aria-hidden="true" />
              Download the APK
            </a>
          </div>
          <p className="mt-3 text-sm text-muted">{meta.join(', ')}</p>

          <ul className="mt-5 flex flex-wrap items-center gap-x-5 gap-y-2 text-[15px]">
            {app.websiteUrl && (
              <li>
                <a href={app.websiteUrl} target="_blank" rel="noopener noreferrer" className="link inline-flex items-center gap-1">
                  Website
                  <ArrowUpRight className="h-3.5 w-3.5" aria-hidden="true" />
                </a>
              </li>
            )}
            {app.installGuideUrl && (
              <li>
                <a href={app.installGuideUrl} target="_blank" rel="noopener noreferrer" className="link inline-flex items-center gap-1">
                  Install guide
                  <ArrowUpRight className="h-3.5 w-3.5" aria-hidden="true" />
                </a>
              </li>
            )}
            {app.sourceUrl && (
              <li>
                <a href={app.sourceUrl} target="_blank" rel="noopener noreferrer" className="link inline-flex items-center gap-1">
                  Source code
                  <ArrowUpRight className="h-3.5 w-3.5" aria-hidden="true" />
                </a>
              </li>
            )}
          </ul>
        </div>

        <div>
          <h4 className="text-sm font-semibold text-fg">What it does</h4>
          <ul className="mt-3 space-y-2.5">
            {app.features.map((f) => (
              <li key={f} className="flex gap-3 text-[15px] leading-relaxed text-fg">
                <span className="mt-[0.7em] h-px w-3 shrink-0 bg-fg" aria-hidden="true" />
                {f}
              </li>
            ))}
          </ul>

          {app.plans && app.plans.length > 0 && (
            <>
              <h4 className="mt-6 text-sm font-semibold text-fg">Pricing</h4>
              <dl className="mt-2 divide-y divide-line border-y border-line">
                {app.plans.map((plan) => (
                  <div key={plan.name} className="flex items-baseline justify-between gap-4 py-3">
                    <dt className="text-[15px] text-fg">
                      {plan.name}
                      <span className="block text-sm text-muted">{plan.note}</span>
                    </dt>
                    <dd className="text-[15px] font-semibold text-fg">{plan.price}</dd>
                  </div>
                ))}
              </dl>
            </>
          )}

          <ul className="mt-5 flex flex-wrap gap-1.5" aria-label="Built with">
            {app.stack.map((t) => (
              <li key={t} className="tag">
                {t}
              </li>
            ))}
          </ul>
        </div>
      </div>
    </article>
  );
}

export default function AppShop() {
  if (apps.length === 0) return null;

  return (
    <Section
      id="apps"
      title={apps.length === 1 ? 'Shipped app' : 'Shipped apps'}
      note="Released software you can install and use today. Free to download."
    >
      {apps.map((app) => (
        <AppListing key={app.id} app={app} />
      ))}
    </Section>
  );
}
