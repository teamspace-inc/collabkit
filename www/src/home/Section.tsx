import { useRef } from 'react';

export function Section(props: { className: string; children: React.ReactNode }) {
  const ref = useRef(null);

  return (
    <section ref={ref} className={props.className}>
      {props.children}
    </section>
  );
}
