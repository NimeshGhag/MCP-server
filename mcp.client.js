import { Client } from "@modelcontextprotocol/sdk/client";
import { StdioClientTransport } from "@modelcontextprotocol/sdk/client/stdio.js";

const transport = new StdioClientTransport({
  command: "node",
  args: ["mcp.server.js"],
});
const client = new Client({
  name: "my-client",
  version: "1.0.0",
});

async function startClient() {
  try {
    await client.connect(transport);
    console.log("MCP client connected");
  } catch (err) {
    console.error("Error starting MCP client:", err);
  }
}
startClient();

client.listTools().then((tools) => {
  console.log("Available tools:", tools);
});
