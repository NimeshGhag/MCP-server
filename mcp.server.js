import { McpServer } from "@modelcontextprotocol/sdk/server/mcp.js";
import { StdioServerTransport } from "@modelcontextprotocol/sdk/server/stdio.js";
import { z } from "zod";

const server = new McpServer({
  name: "my-server",
  version: "1.0.0",
});

server.registerTool(
  "CalculateBMI",
  {
    title: "CalculateBMI",
    description: "Calculate BMI based on weight and height",
    inputSchema: {
      weightKg: z.number().describe("Weight in kilograms"),
      heightM: z.number().describe("Height in meters"),
    },
    outputSchema: { bmi: z.number().describe("Calculated BMI") },
  },
  async ({ weightKg, heightM }) => {
    const bmi = weightKg / (heightM * heightM);
    return {
      content: [
        {
          type: "text",
          text: `Your BMI is ${bmi.toFixed(2)}`,
        },
      ],
      structuredContent: {
        bmi: Number(bmi.toFixed(2)),
      },
    };
  },
);

async function startServer() {
  const transport = new StdioServerTransport();

  try {
    await server.connect(transport);
    console.log("MCP server connected");
  } catch (err) {
    console.error("Error starting MCP server:", err);
  }
}

startServer();
