/**
 * finance-mcp pilot library.
 *
 * Upstream: `finance-mcp` (#7 DL/mo, ~585), owned by the
 * `mcp-tools-lab` GitHub org. Market data, portfolio reporting,
 * personal finance calculators.
 *
 * IMPORTANT: finance-mcp NEVER executes trades, moves money, or
 * offers investment advice. All dispatchers stay read-only by
 * contract — see the "Financial actions" rule in the harness system
 * prompt. Any tool that looks like a trade or transfer must be
 * rejected in the handler, not just documented.
 */

import type {
  DispatchContext,
  ToolDefinition,
  ToolResult,
} from "../mcp/types.js";

export const TOOL_DEFINITIONS: readonly ToolDefinition[] = [
  {
    name: "finance__market_quote",
    description:
      "Look up the latest market quote for a ticker symbol across equities, ETFs, and crypto. Read-only.",
    inputSchema: {
      type: "object",
      properties: {
        symbol: { type: "string", description: "Ticker symbol (e.g. AAPL, BTC-USD)." },
        exchange: { type: "string" },
      },
      required: ["symbol"],
      additionalProperties: false,
    },
  },
  {
    name: "finance__portfolio_summary",
    description:
      "Summarize a portfolio from a list of holdings (symbol + quantity + cost basis). Returns mark-to-market value, unrealized P/L, allocation by asset class. NEVER places orders.",
    inputSchema: {
      type: "object",
      properties: {
        holdings: {
          type: "array",
          description: "List of {symbol, quantity, costBasis} objects.",
        },
        currency: { type: "string", description: "Display currency (USD, EUR, GBP)." },
      },
      required: ["holdings"],
      additionalProperties: false,
    },
  },
  {
    name: "finance__compound_interest",
    description:
      "Compute the future value of a savings plan with periodic contributions and a target annual rate.",
    inputSchema: {
      type: "object",
      properties: {
        principal: { type: "number" },
        monthlyContribution: { type: "number" },
        annualRatePercent: { type: "number" },
        years: { type: "number" },
      },
      required: ["principal", "annualRatePercent", "years"],
      additionalProperties: false,
    },
  },
  // ── New market data bridge-API tools (v2.0, was @thomasgorisse/finance-mcp) ──
  {
    name: "finance__get_stock_quote",
    description:
      "Get a real-time stock quote (price, change, volume, market cap) for a ticker symbol via a market data API. Read-only, NEVER places orders.",
    inputSchema: {
      type: "object",
      properties: {
        symbol: { type: "string", description: "Ticker symbol (e.g. AAPL, MSFT)." },
        exchange: { type: "string" },
      },
      required: ["symbol"],
      additionalProperties: false,
    },
  },
  {
    name: "finance__get_crypto_price",
    description:
      "Get current cryptocurrency price, 24h change, and market cap for a coin ID (bitcoin, ethereum, etc.) via CoinGecko API. Read-only.",
    inputSchema: {
      type: "object",
      properties: {
        coinId: { type: "string", description: "CoinGecko coin ID (e.g. bitcoin, ethereum)." },
        vsCurrency: { type: "string", description: "USD, EUR, GBP (default: USD)." },
      },
      required: ["coinId"],
      additionalProperties: false,
    },
  },
  {
    name: "finance__get_exchange_rates",
    description:
      "Get current exchange rates for a base currency against one or more target currencies via ECB/forex data. Read-only.",
    inputSchema: {
      type: "object",
      properties: {
        baseCurrency: { type: "string", description: "ISO 4217 code (e.g. USD, EUR, GBP)." },
        targetCurrencies: { type: "array", description: "List of ISO 4217 codes." },
      },
      required: ["baseCurrency"],
      additionalProperties: false,
    },
  },
];

export async function dispatchTool(
  toolName: string,
  _args: Record<string, unknown> | undefined,
  _ctx: DispatchContext = {},
): Promise<ToolResult> {
  return {
    content: [
      {
        type: "text",
        text:
          `finance-mcp pilot stub: ${toolName} is registered on the hub ` +
          `gateway but the upstream implementation is not yet vendored. ` +
          `finance-mcp is READ-ONLY by contract — no trades, no transfers. ` +
          `See hub-gateway/src/libraries/finance.ts for the wiring checklist.`,
      },
    ],
  };
}
