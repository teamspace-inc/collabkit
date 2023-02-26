export function ComponentLink(props: { name: string; path: string }) {
  return (
    <a href={`/docs/${props.path}`}>
      <code className="ReactNode">{`<${props.name}>`}</code>
    </a>
  );
}
