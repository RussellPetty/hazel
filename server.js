const express = require('express');
const app = express();
const port = process.env.PORT || 3000;

// Middleware to parse JSON bodies
app.use(express.json());

// Endpoint that waits 5 seconds then responds
app.all('/check-availability', async (req, res) => {
  console.log(`[${new Date().toISOString()}] Request received`);

  // Wait 5 seconds
  await new Promise(resolve => setTimeout(resolve, 5000));

  console.log(`[${new Date().toISOString()}] Responding after 5 seconds`);
  res.json({ message: "they're not available" });
});

// Health check endpoint
app.get('/health', (req, res) => {
  res.json({ status: 'ok' });
});

app.listen(port, () => {
  console.log(`Server running on http://localhost:${port}`);
  console.log(`Availability endpoint: http://localhost:${port}/check-availability`);
});