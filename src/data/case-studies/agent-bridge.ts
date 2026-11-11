import type { CaseStudy } from './types';

const agentBridge: CaseStudy = {
  slug: 'agent-bridge',
  title: 'agent-bridge',
  tagline: 'Live messaging between agent CLI sessions, as named peers',
  year: 2026,
  role: 'Sole author and maintainer',
  status: 'shipped',
  tech: ['TypeScript', 'Node.js', 'MCP', 'Unix sockets', 'zod'],
  links: [
    { label: 'GitHub', href: 'https://github.com/logickoder/agent-bridge' },
    { label: 'npm', href: 'https://www.npmjs.com/package/@logickoder/agent-bridge' }
  ],
  summary:
    'A local daemon that lets Claude Code, Antigravity and opencode sessions message each other by name. Each message wakes the receiving session in place, even when it is idle. No polling, no headless calls, no tmux.',
  sections: [
    { type: 'heading', level: 2, text: 'Problem' },
    {
      type: 'prose',
      content:
        "I wanted a Claude Code session and an Antigravity session to talk to each other the way Claude's own sessions can. Without that, the go-between is me, copying text from one terminal to the other. The rules I set: no polling, no headless runs per message, no tmux, and the receiving agent must never stall waiting."
    },
    { type: 'heading', level: 2, text: 'Approach' },
    {
      type: 'prose',
      content:
        'One local daemon routes messages between peers over a Unix socket, with disk-backed queues in `~/.agent-bridge`. Delivery is at least once: a message leaves the queue only when the receiver acks it. Each session joins under a name, `<folder>-<kind>` by default, so `myapp-claude` can send to `myapp-opencode`.'
    },
    {
      type: 'code',
      language: 'bash',
      code: `npm install -g @logickoder/agent-bridge
agent-bridge install

# inside each session
/bridge planner

agent-bridge peers
agent-bridge send --as planner myapp-opencode "tests pass, take the PR"`
    },
    { type: 'heading', level: 2, text: 'Design decisions' },
    { type: 'heading', level: 3, text: 'Wake each agent through its own door' },
    {
      type: 'prose',
      content:
        "There's no shared push interface across agent CLIs, so each one gets woken its own way: Claude Code through its inbox socket, Antigravity with `agy agentapi send-message`, opencode through a plugin that prompts the session. Each wake path lives in an adapter behind one `Adapter` interface. The core never branches on which agent it's talking to."
    },
    { type: 'heading', level: 3, text: 'What I ruled out' },
    {
      type: 'list',
      items: [
        'MCP push: Antigravity only pulls, so a pushed message never arrives',
        'Holding a turn open with a Stop hook: it blocks the agent and runs into its continuation cap'
      ]
    },
    { type: 'heading', level: 3, text: 'One daemon, verified senders' },
    {
      type: 'prose',
      content:
        'A single-instance lock keeps one daemon per machine. I added it after finding three prototype daemons running at once. Senders inside an agent session are checked against it; anything sent from a plain shell is marked `(unverified)`.'
    },
    { type: 'heading', level: 2, text: 'Outcome' },
    {
      type: 'list',
      items: [
        'Published to npm as `@logickoder/agent-bridge` (0.1.0, Node 22+); CI publishes on version change',
        'Adapters for Claude Code, Antigravity and opencode',
        'Strict TypeScript with zod at every boundary; 150 unit tests and 43 end-to-end cases against an isolated daemon'
      ]
    },
    { type: 'heading', level: 2, text: "What I'd do next" },
    {
      type: 'list',
      items: [
        'More adapters as other agent CLIs expose a way to wake a session',
        'Long-running listener behaviour: re-arming and timeouts after hours idle'
      ]
    }
  ]
};

export default agentBridge;
