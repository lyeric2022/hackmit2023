import { createServer } from 'cors-anywhere';

const PORT = process.env.PORT || 8080;

const server = createServer({
  originWhitelist: [], // Allow all origins, or specify specific domains if needed
  requireHeaders: [], // Specify required headers if necessary
  removeHeaders: [], // Remove unnecessary headers if necessary
});

server.listen(PORT, () => {
  console.log(`CORS Anywhere server is running on port ${PORT}`);
});
