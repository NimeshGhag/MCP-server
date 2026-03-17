import { Client } from "@modelcontextprotocol/sdk/client";
import { StdioClientTransport } from "@modelcontextprotocol/sdk/client/stdio.js";
import { generateContentWithTools } from "./ai.service.js";

const transport = new StdioClientTransport({
  command: "node",
  args: ["mcp.server.js"],
});

const client = new Client({
  name: "my-client",
  version: "1.0.0",
});

const tools = [];

async function main() {
  try {
    await client.connect(transport);
    console.log("MCP client connected");
  } catch (err) {
    console.error("Error starting MCP client:", err);
  }
}

main();

client.listTools().then(async (response) => {
  response.tools.forEach((tool) => {
    tools.push({
      name: tool.name,
      description: tool.description,
      parameters: {
        type: "OBJECT",
        properties: tool.inputSchema.properties,
        required: tool.inputSchema.required || [],
      },
    });
  });

  const aiResponse = await generateContentWithTools(tools);

  // ⚠️ depends on SDK structure
  const calls = aiResponse.functionCalls || [];

  // ✅ Step 4: execute tools
  for (const call of calls) {
    const toolResult = await client.callTool({
      name: call.name,
      arguments: call.args,
    });

    console.log(`Tool ${call.name} response:`, toolResult);
  }
});
