export async function GET(request: Request) {
  const query = new URL(request.url).searchParams.get('query');
  console.log(query);
  if (typeof query !== 'string') {
    return new Response('Invalid query', { status: 400 });
  }
  const url = new URL('https://runsqlagent-vpyt2vheeq-nw.a.run.app/');
  url.searchParams.set('query', query);
  try {
    const response = await fetch(url);
    const json = await response.json();
    console.log(json);
    return new Response(JSON.stringify(json), {
      status: 200,
      headers: { 'Content-Type': 'application/json' },
    });
  } catch (e) {
    console.error(e);
    return new Response('Failed to run query', { status: 500 });
  }
}
