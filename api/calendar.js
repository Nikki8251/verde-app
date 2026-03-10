// Vercel serverless function — proxies ICS to avoid CORS
export default async function handler(req, res) {
  const ICS_URL =
    'https://outlook.office365.com/owa/calendar/699a85bf79ea465e8c2738f436bc8bed@zeromarkets.com/3bf403186de74f74b640c706d568096f2314572492454383109/calendar.ics';

  try {
    const response = await fetch(ICS_URL, {
      headers: { 'User-Agent': 'Verde-App/1.0' },
    });

    if (!response.ok) {
      return res.status(502).json({ error: 'Failed to fetch calendar', status: response.status });
    }

    const icsText = await response.text();

    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Content-Type', 'text/calendar; charset=utf-8');
    res.setHeader('Cache-Control', 's-maxage=300, stale-while-revalidate'); // cache 5 min
    res.status(200).send(icsText);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
}
