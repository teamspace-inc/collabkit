export default function Page({ params }: { params: { id: string } }) {
  return (
    <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
      <h1>Dashboard</h1>
      <div>
        <h1>Slack Key:</h1>
      </div>
    </div>
  );
}
