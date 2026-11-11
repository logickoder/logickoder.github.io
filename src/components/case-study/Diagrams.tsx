// One header diagram per case study, drawn from the case-study text.
// Boxes and arrows (.dg-* classes in globals.css), so each reflows and themes.

function Panel({ title, sub, aside, children, note }: { title: string; sub: string; aside: string; children: React.ReactNode; note?: string }) {
  return (
    <figure className="m-0 flex flex-col gap-6 rounded-[20px] border border-line bg-surface p-7" aria-label={`${title}: ${sub}`}>
      <div className="flex flex-wrap justify-between gap-x-6 gap-y-2 font-mono text-xs text-fg3">
        <span>
          <b className="font-medium text-acc">{title}</b> · {sub}
        </span>
        <span>{aside}</span>
      </div>
      {children}
      {note ? <figcaption className="font-mono text-[11px] text-fg3">{note}</figcaption> : null}
    </figure>
  );
}

const N = ({ label, children, k, ghost }: { label: string; children: React.ReactNode; k?: boolean; ghost?: boolean }) => (
  <div className={`dg-n${k ? ' k' : ''}${ghost ? ' ghost' : ''}`}>
    <small>{label}</small>
    {children}
  </div>
);
const W = ({ a }: { a?: boolean }) => <div className={`dg-w${a ? ' a' : ''}`} aria-hidden="true" />;

function Retrostash() {
  return (
    <Panel title="Retrostash" sub="request flow" aside="@CacheQuery reads · @CacheMutate invalidates by tag" note="Store: in-memory today. Targets Android · JVM · iOS · wasmJs.">
      <div className="dg-row">
        <N label="your API">search(q)<small>@CacheQuery key &quot;search:{'{q}'}&quot; · tag search</small></N>
        <W />
        <N label="transport adapter">OkHttp · Retrofit · Ktor</N>
        <W a />
        <N label="retrostash-core" k>key resolver → &quot;search:kotlin&quot;<small>reads path, query, body · no serializer</small></N>
        <W a />
        <div className="dg-col">
          <N label="HIT">return cached · no network</N>
          <N label="MISS" ghost>network → store with tag search</N>
        </div>
      </div>
      <div className="dg-row">
        <N label="your API">createItem()<small>@CacheMutate invalidateTags = [search]</small></N>
        <W />
        <N label="network" ghost>201 success</N>
        <W a />
        <N label="engine" k>drop every entry tagged search<small>whichever endpoint stored it</small></N>
        <W />
        <N label="next search(q)">MISS → fresh data</N>
      </div>
    </Panel>
  );
}

function AppStorys() {
  return (
    <Panel title="AppStorys SDK" sub="one screen, two UI trees, one event" aside="no host-app instrumentation">
      <div className="dg-row">
        <N label="host screen">legacy Views + Compose<small>on the same screen</small></N>
        <W />
        <div className="dg-col" style={{ flex: '0 0 300px' }}>
          <N label="XML View tree">ViewGroup walk + reflection<small>private fields → text, image URI, a11y label</small></N>
          <N label="Compose tree">SemanticsNode walk<small>descriptions, test tags, roles</small></N>
        </div>
        <W a />
        <N label="normalize" k>same node shape<small>one event schema</small></N>
        <W a />
        <N label="backend">analytics events</N>
      </div>
      <div className="flex flex-wrap items-center gap-2 font-mono text-[11px] text-fg3">
        Same payload from the ports:
        {['Android (reference)', 'Flutter', 'React Native'].map((t) => (
          <span key={t} className="rounded-full border border-line2 px-2 py-0.5 text-fg2">{t}</span>
        ))}
      </div>
    </Panel>
  );
}

function Knock() {
  return (
    <Panel title="Knock" sub="calendar event → alarm that won't be missed" aside="mandate: never weaken alarm reliability" note="Compose Multiplatform · iOS targets compile from day one.">
      <div className="dg-row">
        <div className="dg-col" style={{ flex: '0 0 230px' }}>
          <N label="source">Android CalendarContract</N>
          <N label="source">Google Calendar · AppAuth OAuth</N>
          <N label="source">ICS subscription URL</N>
          <N label="source">Manual entry</N>
        </div>
        <W />
        <N label="on device only" k>Room KMP store<small>calendar data never leaves the phone</small></N>
        <W />
        <N label="scheduler">exact alarm per event<small>WorkManager (Android) · BGTaskScheduler stub (iOS)</small></N>
        <W a />
        <N label="T-0" k>full-screen alarm<small>over the lock screen · rings until dismissed</small></N>
      </div>
    </Panel>
  );
}

const ladder = [
  { t: 'T+0 · trigger', h: 40, fill: 0.15, items: ['Full-screen intent', 'Short, distinct ping', 'Double-pulse haptic'] },
  { t: 'T+1 min · ignored', h: 80, fill: 0.35, items: ['Heads-up again', 'Louder ping', 'Long vibration (~1s)'] },
  { t: 'T+3 min · still ignored', h: 130, fill: 0.7, items: ['Screen on, optional strobe', 'Continuous alarm (80%)', 'Heavy-click haptic'] }
];

function Nag() {
  return (
    <Panel title="Nag" sub="the escalation ladder" aside={'Active Until Done · only "I did it" stops it'} note="Entry in under a second: preset grid · Quick Settings tile · launcher shortcuts.">
      <div className="grid grid-cols-[repeat(auto-fit,minmax(220px,1fr))] items-end gap-3">
        {ladder.map((s, i) => (
          <div key={s.t} className="flex flex-col gap-2.5">
            <span className={`font-mono text-xs ${i === 2 ? 'text-acc' : i === 1 ? 'text-fg2' : 'text-fg3'}`}>{s.t}</span>
            <div
              aria-hidden="true"
              className={`rounded-t-[10px] border border-b-0 ${i === 0 ? 'border-line2' : 'border-accent'}`}
              style={{ height: s.h, background: `color-mix(in srgb, var(--accent) ${Math.round(s.fill * 100)}%, transparent)` }}
            />
            <div className="dg-n" style={{ borderRadius: '0 0 10px 10px' }}>
              {s.items.map((it) => <span key={it}>{it}</span>)}
            </div>
          </div>
        ))}
        <div className="dg-col self-stretch justify-end">
          <div className="dg-n k items-center text-center">
            <small>loop until</small>&quot;I did it&quot;<small>an explicit tap, nothing else</small>
          </div>
        </div>
      </div>
    </Panel>
  );
}

function FirebaseAction() {
  return (
    <Panel title="Firebase App Distribution Action" sub="CI delivery" aside="uses: logickoder/firebase-distribution@v1" note="Service-account file, not an API key · release notes from the commit message · reused across engagements.">
      <div className="dg-row">
        <N label="trigger">push to main</N>
        <W />
        <N label="GitHub Actions">build release APK</N>
        <W a />
        <N label="the action · TypeScript" k>firebase-distribution@v1<small>app-id · service-credentials-file · file · groups · release-notes</small></N>
        <W a />
        <N label="Firebase">App Distribution</N>
        <W />
        <div className="dg-col">
          <span className="rounded-full border border-accent px-2 py-0.5 font-mono text-[11px] text-acc">qa</span>
          <span className="rounded-full border border-accent px-2 py-0.5 font-mono text-[11px] text-acc">internal</span>
        </div>
      </div>
    </Panel>
  );
}

function Bankstract() {
  return (
    <Panel title="bankstract" sub="statement → reconciled transactions" aside="engine MIT · cloud AGPL-3.0" note="Every entry point takes isolate=True: child process, 60s time limit, 2048 MB memory limit on Linux.">
      <div className="dg-row">
        <N label="input">statement<small>PDF or XLSX · in memory</small></N>
        <W />
        <N label="detect()">which bank?<small>FBN · Opay · PalmPay · Zenith</small></N>
        <W a />
        <N label="parse()" k>bank parser<small>Decimal money · typed ParseError</small></N>
        <W a />
        <N label="reconcile" k>balance = prev ± amount<small>mismatch → row index</small></N>
        <W />
        <div className="dg-col">
          <N label="serialize">CSV · JSON</N>
          <N label="inspect()" ghost>tamper signals</N>
        </div>
      </div>
      <div className="dg-row">
        <N label="bankstract.logickoder.dev">Next.js web</N>
        <W />
        <N label="API">FastAPI → engine</N>
        <W />
        <N label="edge">caddy-docker-proxy<small>one Hetzner box</small></N>
        <W />
        <N label="accounts">Better Auth · Paystack</N>
      </div>
    </Panel>
  );
}

function AgentBridge() {
  return (
    <Panel title="agent-bridge" sub="one daemon, named peers" aside="at-least-once · acked before removal" note="Each wake path lives in an adapter behind one Adapter interface. The core never branches on agent kind.">
      <div className="dg-row">
        <N label="sender">myapp-claude<small>agent-bridge send</small></N>
        <W a />
        <N label="daemon · Unix socket" k>route by name<small>disk queue in ~/.agent-bridge</small></N>
        <W a />
        <div className="dg-col" style={{ flex: '0 0 300px' }}>
          <N label="Claude Code">inbox socket</N>
          <N label="Antigravity">agy agentapi send-message</N>
          <N label="opencode">plugin session.prompt</N>
        </div>
        <W />
        <N label="receiver">woken in place<small>acks → message leaves the queue</small></N>
      </div>
    </Panel>
  );
}

function Redactly() {
  return (
    <Panel title="Redactly" sub="chat export → safe to paste" aside="runs in the browser · no uploads" note="History in IndexedDB on the device · works offline · analytics opt-in and off by default.">
      <div className="dg-row">
        <N label="input">chat.txt<small>file or paste</small></N>
        <W />
        <N label="Web Worker" k>parse · find senders<small>off the main thread</small></N>
        <W a />
        <div className="dg-col" style={{ flex: '0 0 260px' }}>
          <N label="aliases">Participant 1, 2…<small>stable per contact</small></N>
          <N label="PII">[EMAIL] · [LINK] · [PHONE]</N>
          <N label="content filter">3 tiers · leetspeak-aware</N>
        </div>
        <W a />
        <N label="output" k>same chat, redacted<small>timestamps and line breaks kept</small></N>
        <W />
        <N label="to your model">copy · .txt</N>
      </div>
    </Panel>
  );
}

function Zedu() {
  return (
    <Panel title="Zedu review infrastructure" sub="fork PR → checks → device in the browser" aside="4 repos · workflows pinned by SHA" note="Sessions: reviewers team only, per-session token, read-only container, egress firewall, 30-minute cap.">
      <div className="dg-row">
        <N label="intern">fork PR</N>
        <W />
        <div className="dg-col" style={{ flex: '0 0 260px' }}>
          <N label="trusted · pull_request_target">rules · routing · approval<small>never checks out PR code</small></N>
          <N label="untrusted · read-only" ghost>Semgrep · ClamAV · Gitleaks · Trivy</N>
        </div>
        <W a />
        <N label="reviewer queue" k>/claim · /release<small>max 5 unclaimed per team</small></N>
        <W a />
        <N label="/test android · /test desktop" k>emulator or desktop<small>streamed over noVNC</small></N>
        <W />
        <N label="reviewer">tests in the browser</N>
      </div>
    </Panel>
  );
}

function WalletImporter() {
  return (
    <Panel title="Wallet importer" sub="statement → budget" aside="re-runs are safe · batches roll back">
      <div className="dg-row">
        <N label="bankstract">statement → CSV / JSON</N>
        <W />
        <N label="map">bank → Wallet account<small>default category</small></N>
        <W a />
        <N label="importer" k>record IDs from batch + row<small>duplicates rejected</small></N>
        <W a />
        <N label="Wallet">records with time of day<small>several accounts per run</small></N>
        <W />
        <div className="dg-col">
          <N label="failed rows" ghost>CSV to fix and re-run</N>
          <N label="undo" ghost>roll back a batch</N>
        </div>
      </div>
    </Panel>
  );
}

const bySlug: Record<string, () => React.ReactElement> = {
  'zedu-review-infra': Zedu,
  'wallet-importer': WalletImporter,
  redactly: Redactly,
  bankstract: Bankstract,
  'agent-bridge': AgentBridge,
  retrostash: Retrostash,
  'appstorys-sdk': AppStorys,
  knock: Knock,
  nag: Nag,
  'firebase-distribution-action': FirebaseAction
};

export default function CaseStudyDiagram({ slug }: { slug: string }) {
  const D = bySlug[slug];
  return D ? <D /> : null;
}
