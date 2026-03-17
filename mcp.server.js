import { McpServer } from "@modelcontextprotocol/sdk/server/mcp.js";
import { StdioServerTransport } from "@modelcontextprotocol/sdk/server/stdio.js";
import { z } from "zod";

const server = new McpServer({
  name: "my-server",
  version: "1.0.0",
});

const transport = new StdioServerTransport();
try {
  await server.connect(transport);
  console.log("Mcp server connected");
} catch (err) {
  console.error(err);
}
