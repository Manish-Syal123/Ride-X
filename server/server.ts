import http from "http";
import { app } from "./app";
const server = http.createServer(app);

// creating server
server.listen(process.env.PORT || 3000, () => {
  console.log(`Server is running on port ${process.env.PORT || 3000}`);
});
