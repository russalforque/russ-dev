import Section from './ui/Section';

export default function AboutSection() {
  return (
    <Section id="about" title="About me">
      <div className="max-w-[40rem] space-y-4 text-pretty text-[17px] leading-[1.65] text-fg">
        <p>
          I graduated with a BS in Information Technology from Asian College of Technology in Cebu. Through my studies,
          an internship and my first job, I found that I enjoy both sides of development: designing interfaces that are
          simple to use, and building the logic and databases that make an application reliable.
        </p>
        <p>
          Most of my projects are for small businesses that still keep track of things in notebooks and chat threads. I
          recently completed cloud support training at Accenture, where I was introduced to Docker and Kubernetes. Now
          I am looking for a supportive team to grow with as a junior .NET or full-stack developer.
        </p>
      </div>
    </Section>
  );
}
