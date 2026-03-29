export async function POST(req) {
  try {
    const body = await req.json();

    if (body.password === process.env.SITE_PASSWORD) {
      return Response.json({ success: true });
    }

    return Response.json({ success: false });
  } catch (err) {
    return Response.json({ success: false });
  }
}
