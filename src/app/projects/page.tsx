import type { Metadata } from 'next';
import ProjectIndex from '@/components/projects/ProjectIndex';
import { Eyebrow, Footer, Header, Page } from '@/components/site/Shell';
import projects, { grimaldiNote } from '@/data/projects';

export const metadata: Metadata = {
  title: 'Projects',
  description: 'Libraries, SDKs, apps and tools by Jeffery Orazulike. Most are open source.',
  alternates: { canonical: '/projects/' }
};

export default function ProjectsPage() {
  return (
    <Page>
      <Header current="work" />
      <section className="flex flex-col gap-7">
        <Eyebrow>~/work · {projects.length} projects</Eyebrow>
        <h1 className="m-0 font-display text-[clamp(64px,11cqi,160px)] leading-[0.9] font-normal uppercase">
          All <span className="font-serif text-acc normal-case italic">projects</span>
        </h1>
        <p className="m-0 max-w-[56ch] text-[19px] leading-[1.6] text-fg2">
          Libraries, SDKs, apps and tools. Most are open source. Client work stays in summary.
        </p>
        <ProjectIndex projects={projects} grimaldiNote={grimaldiNote} />
      </section>
      <Footer />
    </Page>
  );
}
