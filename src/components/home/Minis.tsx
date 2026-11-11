import type { CSSProperties } from 'react';
import Reveal from '@/components/site/Reveal';
import type { MiniUi } from '@/data/projects';

// Animation order for .seq children (globals.css): index, gap between items, lead-in.
const at = (i: number, step = 200, d = 0) => ({ '--i': i, '--step': `${step}ms`, '--d': `${d}ms` }) as CSSProperties;

// Code-drawn project windows. Formats are real (bankstract schema, agent-bridge
// CLI, Retrostash annotations, Redactly aliases); data marked as sample.

const txns = [
  { d: '02 Oct', n: 'TRANSFER IN · SALARY', amt: '+450,000.00', inflow: true },
  { d: '03 Oct', n: 'POS · SUPERMARKET', amt: '−18,250.00', inflow: false },
  { d: '05 Oct', n: 'AIRTIME · MTN', amt: '−2,000.00', inflow: false },
  { d: '07 Oct', n: 'NIP TRANSFER OUT', amt: '−120,000.00', inflow: false },
  { d: '09 Oct', n: 'STAMP DUTY', amt: '−50.00', inflow: false },
  { d: '12 Oct', n: 'TRANSFER IN', amt: '+35,000.00', inflow: true }
];

function Bankstract() {
  return (
    <div className="flex grow flex-col gap-3.5 font-mono text-xs">
      <div className="flex flex-wrap items-center justify-between gap-2 rounded-[10px] border border-dashed border-line2 px-3 py-2.5 text-fg2">
        <span>
          statement.pdf → <span className="text-fg">Zenith</span> · parsed in memory
        </span>
        <span className="text-acc">✓ 6 transactions</span>
      </div>
      <table className="w-full border-collapse text-xs">
        <thead>
          <tr className="text-[10px] tracking-[0.05em] text-fg3 uppercase">
            <th scope="col" className="border-b border-line pr-2 pb-2 text-left font-medium">date</th>
            <th scope="col" className="border-b border-line pr-2 pb-2 text-left font-medium">narration</th>
            <th scope="col" className="border-b border-line pb-2 text-right font-medium">amount</th>
          </tr>
        </thead>
        <tbody className="seq">
          {txns.map((r, i) => (
            <tr key={r.d + r.n} className="text-fg2" style={at(i, 140, 150)}>
              <td className="border-b border-line py-[7px] pr-2 whitespace-nowrap">{r.d}</td>
              <td className="border-b border-line py-[7px] pr-2 text-fg">{r.n}</td>
              <td className={`border-b border-line py-[7px] text-right whitespace-nowrap ${r.inflow ? 'text-acc' : ''}`}>{r.amt}</td>
            </tr>
          ))}
        </tbody>
      </table>
      <div className="flex justify-between gap-4 text-[11px] text-fg3">
        <span>sample data · NGN · date, narration, debit, credit, balance</span>
        <span>→ CSV</span>
      </div>
    </div>
  );
}

const peers = [
  ['myapp-claude', 'claude-code'],
  ['myapp-agy', 'antigravity'],
  ['myapp-opencode', 'opencode']
] as const;

const hops = [
  ['claude code', 'sends'],
  ['daemon', 'disk queue'],
  ['opencode', 'woken in place']
] as const;

function AgentBridge() {
  return (
    <div className="flex grow flex-col gap-3.5 font-mono text-xs leading-[1.7]">
      {/* Peer rows use fixed ch columns so the table fits a 375px phone; the
          send line wraps with a hanging indent instead of scrolling sideways. */}
      <pre className="seq type m-0 rounded-[10px] border border-line bg-bg px-3.5 py-3 text-[11px] whitespace-pre-wrap text-fg2 sm:text-xs">
        <span className="block" style={at(0, 450)}>
          <span className="text-fg3">$</span> <span className="text-fg">agent-bridge peers</span>
        </span>
        {peers.map(([name, agent], i) => (
          <span key={name} className="grid grid-cols-[14ch_11ch_auto] gap-x-[1.5ch] pl-[2ch]" style={at(i + 1, 450)}>
            <span>{name}</span>
            <span>{agent}</span>
            <span>
              <span className="text-acc">●</span> online
            </span>
          </span>
        ))}
        <span className="block pl-[2ch] -indent-[2ch] [overflow-wrap:anywhere]" style={at(4, 450)}>
          <span className="text-fg3">$</span>{' '}
          <span className="text-fg">agent-bridge send --as myapp-claude myapp-opencode &quot;tests pass, take the PR&quot;</span>
        </span>
      </pre>
      {/* The message hops sender → daemon → receiver once the send line has typed. */}
      <div className="grid grid-cols-3 gap-2 text-center text-[11px]">
        {hops.map(([name, sub], i) => (
          <span
            key={name}
            className={`hop rounded-lg px-1 py-2 text-fg ${i === 1 ? 'border-[1.5px] border-accent' : 'border border-line2'}`}
            style={{ '--hop': `${2500 + i * 400}ms` } as CSSProperties}
          >
            {name}
            <br />
            <span className="text-fg3">{sub}</span>
          </span>
        ))}
      </div>
      <span className="text-[11px] text-fg3">queued → delivered → acked · leaves the queue only when acked · output illustrative</span>
    </div>
  );
}

const cacheLog = [
  { req: 'POST /graphql search:kotlin', res: 'MISS', note: 'network → stored · tag search', tone: 'plain' },
  { req: 'POST /graphql search:kotlin', res: 'HIT', note: 'served from cache · no network', tone: 'solid' },
  { req: 'POST /items createItem', res: 'MUTATE', note: 'success → invalidate tag search', tone: 'outline' },
  { req: 'POST /graphql search:kotlin', res: 'MISS', note: 'fresh data · stored again', tone: 'plain' }
] as const;

const pill = {
  plain: 'border-line2 text-fg2',
  solid: 'border-accent bg-accent text-on-accent',
  outline: 'border-accent text-acc'
};

function Retrostash() {
  return (
    <div className="flex grow flex-col gap-1.5 font-mono text-xs">
      <span className="mb-1.5 text-[11px] text-fg3">cache log · same request, four calls</span>
      <div className="seq flex flex-col gap-1.5">
      {cacheLog.map((c, i) => (
        <div key={i} style={at(i, 550, 200)} className="grid grid-cols-[22px_minmax(0,1.4fr)_64px_minmax(0,1.6fr)] items-center gap-2.5 border-b border-line py-[9px]">
          <span className="text-fg3">{i + 1}</span>
          <span className="truncate text-fg">{c.req}</span>
          <span className={`rounded-full border py-0.5 text-center text-[11px] font-medium ${pill[c.tone]}`}>{c.res}</span>
          <span className="text-fg2">{c.note}</span>
        </div>
      ))}
      </div>
      <span className="mt-2 text-[11px] text-fg3">
        @CacheQuery(key = &quot;search:{'{q}'}&quot;, tags = [&quot;search&quot;]) · @CacheMutate(invalidateTags = [&quot;search&quot;])
      </span>
    </div>
  );
}

// One row per message: the raw line and what Redactly turns it into.
const chat = [
  { right: false, before: ['10:42 · Ada Okafor', 'Call me on 0803 123 4567 before 6'], after: ['Participant 1', 'Call me on [PHONE] before 6'] },
  { right: true, before: ['10:44 · Tunde B.', 'Sent the contract to tunde.b@mail.com'], after: ['Participant 2', 'Sent the contract to [EMAIL]'] },
  { right: false, before: ['10:45 · Ada Okafor', 'Got it, signing tonight'], after: ['Participant 1', 'Got it, signing tonight'] }
] as const;

function Bubble({ who, text, right, accent, style }: { who: string; text: string; right: boolean; accent?: boolean; style?: CSSProperties }) {
  return (
    <div style={style} className={`flex max-w-[92%] flex-col gap-0.5 rounded-[10px] border border-line bg-bg px-2.5 py-2 ${right ? 'self-end' : 'self-start'}`}>
      <span className={`font-mono text-[10px] ${accent ? 'text-acc' : 'text-fg3'}`}>{who}</span>
      <span className="text-fg [overflow-wrap:anywhere]">{text}</span>
    </div>
  );
}

function Redactly() {
  return (
    <div className="grid grow grid-cols-1 gap-3.5 text-[13px] leading-normal sm:grid-cols-2">
      <div className="seq flex min-w-0 flex-col gap-2.5 border-b border-line pb-3.5 sm:border-r sm:border-b-0 sm:pr-3.5 sm:pb-0">
        <span className="font-mono text-[11px] tracking-[0.06em] text-fg3 uppercase">Before · chat.txt</span>
        {chat.map((m, i) => <Bubble key={i} who={m.before[0]} text={m.before[1]} right={m.right} style={at(i + 1, 180)} />)}
      </div>
      <div className="seq flex min-w-0 flex-col gap-2.5">
        <span className="font-mono text-[11px] tracking-[0.06em] text-fg3 uppercase" style={at(0, 0, 900)}>After · safe to paste</span>
        {chat.map((m, i) => <Bubble key={i} who={m.after[0]} text={m.after[1]} right={m.right} accent style={at(i + 1, 380, 900)} />)}
        <span className="font-mono text-[11px] text-fg3" style={at(4, 380, 900)}>names → aliases · PII masked · runs in browser</span>
      </div>
    </div>
  );
}

const titles: Record<MiniUi, string> = {
  bankstract: 'bankstract · statement → transactions',
  'agent-bridge': 'agent-bridge · terminal',
  retrostash: 'retrostash · cache log',
  redactly: 'redactly · chat before / after'
};

export default function MiniWindow({ kind }: { kind: MiniUi }) {
  return (
    <Reveal className="flex min-h-[300px] min-w-0 flex-[1_1_520px] flex-col gap-3.5 rounded-2xl border border-line bg-surface p-[18px]">
      <span className="flex items-center gap-1.5" aria-hidden="true">
        <span className="size-[9px] rounded-full bg-line2" />
        <span className="size-[9px] rounded-full bg-line2" />
        <span className="size-[9px] rounded-full bg-line2" />
        <span className="ml-2.5 font-mono text-xs text-fg3">{titles[kind]}</span>
      </span>
      {kind === 'bankstract' && <Bankstract />}
      {kind === 'agent-bridge' && <AgentBridge />}
      {kind === 'retrostash' && <Retrostash />}
      {kind === 'redactly' && <Redactly />}
    </Reveal>
  );
}
