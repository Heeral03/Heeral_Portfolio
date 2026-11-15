import { Reveal } from "./Reveal";

export function Section({
  id,
  index,
  title,
  children,
}: {
  id: string;
  index: string;
  title: string;
  children: React.ReactNode;
}) {
  return (
    <section id={id} className="py-20 md:py-28">
      <div className="wrap">
        <Reveal className="mb-10 md:mb-14">
          <p className="label mb-3">{index} / {id}</p>
          <h2 className="serif text-4xl md:text-5xl leading-[1.1]">{title}</h2>
        </Reveal>
        {children}
      </div>
    </section>
  );
}
