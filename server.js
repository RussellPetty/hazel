const express = require('express');
const app = express();
const port = process.env.PORT || 3000;

// Middleware to parse JSON bodies
app.use(express.json());

// Endpoint that waits 5 seconds then responds
app.all('/check-availability', async (req, res) => {
  // Extract agent parameter from either query params or body
  const agent = req.body?.agent || req.query?.agent;

  console.log(`[${new Date().toISOString()}] Request received${agent ? ` from agent: ${agent}` : ''}`);

  // Wait 3 seconds
  await new Promise(resolve => setTimeout(resolve, 3000));

  console.log(`[${new Date().toISOString()}] Responding after 3 seconds`);
  res.json({
    message: "they're not available",
    agent: agent || "unknown"
  });
});

// Health check endpoint
app.get('/health', (req, res) => {
  res.json({ status: 'ok' });
});

app.listen(port, () => {
  console.log(`Server running on http://localhost:${port}`);
  console.log(`Availability endpoint: http://localhost:${port}/check-availability`);
});