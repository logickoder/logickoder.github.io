import type { CaseStudy } from './types';

const walletImporter: CaseStudy = {
  slug: 'wallet-importer',
  title: 'Wallet importer',
  tagline: 'Bank transactions into BudgetBakers Wallet, with the time of day intact',
  year: 2026,
  role: 'Sole author',
  status: 'shipped',
  tech: ['TypeScript', 'Node.js', 'CLI', 'bankstract'],
  links: [{ label: 'GitHub', href: 'https://github.com/logickoder/budgetbakers-wallet-importer' }],
  summary:
    'A Node CLI that imports transactions into BudgetBakers Wallet from a CSV or straight from bankstract output. It keeps the time of each transaction, handles several accounts in one run, pairs transfers, and can roll a batch back.',
  sections: [
    { type: 'heading', level: 2, text: 'Problem' },
    {
      type: 'prose',
      content:
        "Wallet's own import drops the time of day and takes one account per file. With statements from several banks, that meant many files and a history where every transaction sits at midnight."
    },
    { type: 'heading', level: 2, text: 'Approach' },
    {
      type: 'prose',
      content:
        'The CLI signs in with your own Wallet account, the same way the app does, and writes records directly. It reads a simple six-column CSV, or bankstract JSON or CSV with a map from bank to Wallet account and a default category. `--convert-only` writes the CSV so you can fix rows by hand first.'
    },
    {
      type: 'code',
      language: 'bash',
      code: `bankstract auto statement.pdf -o statement.csv
budgetbakers-wallet-importer --from-bankstract statement.csv --bank-map banks.json --default-category Other --dry-run`
    },
    { type: 'heading', level: 2, text: 'Design decisions' },
    { type: 'heading', level: 3, text: 'Safe to re-run' },
    {
      type: 'prose',
      content:
        "Each record's ID is derived from the batch ID and the row itself, so running the same batch twice is rejected instead of duplicating transactions. Rows that fail go to a CSV you can fix and run again."
    },
    { type: 'heading', level: 3, text: 'Undo' },
    {
      type: 'prose',
      content: 'A batch can be rolled back by its ID, or by the last N records. Transfers between your own accounts are paired automatically.'
    },
    { type: 'heading', level: 2, text: 'Outcome' },
    {
      type: 'list',
      items: [
        'On npm (1.6.0), MIT, public on GitHub',
        '46 tests',
        'Closes the loop with bankstract: statement → transactions → your budget'
      ]
    }
  ]
};

export default walletImporter;
