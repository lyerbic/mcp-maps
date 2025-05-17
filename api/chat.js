export default async function handler(req, res) {
  const userMessage = req.body.message;

  // Check if the message is asking about project sites or maps
  if (userMessage.toLowerCase().includes("project site") || userMessage.toLowerCase().includes("map")) {
    try {
      const mcpRes = await fetch('https://your-vercel-app.vercel.app/api/sites');
      const sites = await mcpRes.json();
      const summary = sites.map(site => `• ${site.name} (${site.lat}, ${site.lng})`).join('\n');
      return res.status(200).json({
        reply: `Here are the current project sites near London:\n\n${summary}`
      });
    } catch (error) {
      return res.status(500).json({ reply: "Sorry, I couldn't fetch the project sites right now." });
    }
  }

  const response = await fetch('https://api.anthropic.com/v1/messages', {
    method: 'POST',
    headers: {
      'x-api-key': process.env.ANTHROPIC_API_KEY,
      'content-type': 'application/json',
      'anthropic-version': '2023-06-01',
    },
    body: JSON.stringify({
      model: "claude-3-opus-20240229",
      max_tokens: 1024,
      messages: [
        { role: "user", content: userMessage }
      ]
    })
  });

  const data = await response.json();
  res.status(200).json({ reply: data.content[0].text });
}
