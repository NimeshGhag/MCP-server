# MCP Server

A minimal **Model Context Protocol (MCP)** server + client example using the `@modelcontextprotocol/sdk` and Google Gemini (GenAI) to demonstrate tool calling.

## ✅ What this project includes

- `mcp.server.js`: MCP server that registers a single tool (`CalculateBMI`) and exposes it over stdio.
- `mcp.client.js`: MCP client that connects to the server, lists available tools, then uses Google Gemini to decide which tool to call.
- `ai.service.js`: A tiny service that calls the Gemini API (`@google/genai`) and returns function call responses.

## 🧩 Prerequisites

- Node.js 18+ (recommended)
- A Google Gemini API key stored in `.env` as `GEMINI_API_KEY`.

## ⚙️ Setup

1. Clone the repo (if not already):

```bash
git clone https://github.com/NimeshGhag/MCP-server.git
cd MCP-server
```

2. Install dependencies:

```bash
npm install
```

3. Create a `.env` file in the project root with:

```env
GEMINI_API_KEY=your_api_key_here
```

## ▶️ Running the example

### 1) Start the MCP server

```bash
node mcp.server.js
```

### 2) Run the MCP client (in a separate terminal)

```bash
node mcp.client.js
```

The client launches the server via `StdioClientTransport`, reads the tool metadata, then calls Gemini to determine which tool to invoke.

## 🛠️ How it works

### Server

The server registers a single tool:

- **CalculateBMI**: Accepts `weightKg` and `heightM`, computes BMI, and returns a structured response.

It uses `StdioServerTransport` so it can communicate over stdin/stdout with a client.

### Client

The client uses `StdioClientTransport` to launch the server as a child process. It:

1. Lists available tools.
2. Constructs tool metadata for Gemini.
3. Calls `generateContentWithTools()` to ask Gemini what to do.
4. Executes any function calls returned by the model via `client.callTool()`.

## 🚀 Extending

- Add more tools in `mcp.server.js` using `server.registerTool(...)`.
- Update `generateContentWithTools()` in `ai.service.js` to prompt Gemini differently.

## 📌 Notes

- This is an educational sample; do not expose your API key publicly.
- The client assumes the model response includes `functionCalls`.

---

Happy building! 🎉
