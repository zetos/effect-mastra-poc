# AI Agent Comparison Project

A TypeScript project designed to test and compare the **@effect/ai** library with the **Mastra** library through a simple agent implementation that processes a single prompt.

## Project Overview

This project serves as a testing ground for evaluating different AI libraries in the TypeScript ecosystem. The project implements the same tarot reading functionality using both **@effect/ai** and **Mastra** libraries, with **TOON format integration** for efficient token usage in LLM prompts. Both implementations create agents that perform tarot readings using a detailed prompt with a character persona.

### Key Features

- **Dual Library Implementation**: Parallel implementations in Effect/AI and Mastra for direct comparison
- **TOON Format Integration**: Uses Token-Oriented Object Notation for 30-60% token reduction in LLM prompts while maintaining readability
- **Effect/AI Integration**: Demonstrates the Effect ecosystem's approach to AI integration
- **Multi-Provider Support**: Implements fallback strategy between OpenAI and Anthropic
- **Error Handling**: Comprehensive error handling with retry mechanisms
- **Character-Based AI**: Uses a detailed persona for consistent response generation
- **TypeScript**: Full type safety with Effect's powerful type system

## Installation

### Prerequisites

- Node.js (v18 or higher)
- pnpm package manager

### Setup

1. Clone the repository:

```bash
git clone <repository-url>
cd agent
```

2. Install dependencies:

```bash
pnpm install
```

3. Set up environment variables:

```bash
cp .env.example .env
```

4. Configure your API keys in the `.env` file:

```
OPENAI_API_KEY=your_openai_api_key_here
ANTHROPIC_API_KEY=your_anthropic_api_key_here
```

## Project Structure

```
src/
├── index.ts          # Main application logic running both Effect/AI and Mastra implementations
├── prompt.ts         # Tarot reading prompt with character definition and TOON encoding
├── agents/
│   ├── effectPlan.ts # Effect/AI implementation with execution plans
│   └── mastraAgent.ts # Mastra library implementation
.env.example          # Environment variables template
package.json          # Project dependencies and scripts
tsconfig.json         # TypeScript configuration
```

### Key Components

- **`src/index.ts`**: Main application that runs both implementations and compares outputs:

  - Executes Effect/AI and Mastra implementations in parallel
  - Saves results to timestamped files for comparison
  - Provides token usage statistics for each library

- **`src/prompt.ts`**: Comprehensive tarot reading prompt featuring:

  - Granny Weatherwax character persona
  - Celtic Cross spread configuration
  - Detailed card interpretations
  - TOON-encoded data structures for token efficiency

- **`src/agents/effectPlan.ts`**: Effect/AI implementation with:

  - Execution plans for retry and fallback strategies
  - Typed error handling (NetworkError, ProviderOutage)
  - Effect-based async flow control

- **`src/agents/mastraAgent.ts`**: Mastra implementation with:

  - Agent-based architecture
  - Simplified model integration
  - Built-in token usage tracking

## Usage

### Running the Application

Execute the agent with the following command:

```bash
pnpm start
```

### What It Does

1. **Runs both implementations** in parallel:
    - **Effect/AI**: Uses execution plans with fallback strategy (OpenAI GPT-4o with 3 retries, fallback to Anthropic Claude-4 Sonnet)
    - **Mastra**: Uses agent-based architecture with simplified model integration
2. **Processes the tarot prompt** using TOON-encoded data for token efficiency
3. **Generates tarot readings** based on the Celtic Cross spread for both libraries
4. **Saves responses** to timestamped files (`reading-effect-[timestamp].txt` and `reading-mastra-[timestamp].txt`)
5. **Displays token usage statistics** for performance comparison

### Output

The application generates two tarot readings (one from each library) and saves them to separate timestamped files. Both readings follow the Granny Weatherwax persona - straightforward, practical, with a hint of sarcasm and deep wisdom. Token usage statistics are displayed in the console for each implementation.

## Library Comparison: Effect/AI vs Mastra

### Current Implementation (Effect/AI)

**Advantages:**

- **Type Safety**: Full TypeScript integration with Effect's type system
- **Composable**: Effect's composable architecture for complex workflows
- **Error Handling**: Sophisticated error handling with typed errors
- **Retry Logic**: Built-in retry mechanisms with configurable schedules
- **Provider Abstraction**: Clean abstraction between different AI providers

**Features Demonstrated:**

- Execution plans for fallback strategies
- Typed error handling (NetworkError, ProviderOutage)
- Effect-based async flow control
- Layer-based dependency injection

### Mastra Implementation

This project now includes parallel implementations using both Effect/AI and Mastra libraries for direct comparison.

**Mastra Advantages:**

- **Simpler API**: Agent-based architecture with straightforward setup
- **Built-in Agent Abstraction**: Pre-built agent class handles model integration
- **Easier Configuration**: Less boilerplate code for basic use cases
- **Token Tracking**: Automatic token usage statistics

**Mastra Features Demonstrated:**

- Agent-based architecture with instruction-based agents
- Simplified model provider integration
- Built-in response generation and token counting

## Technical Details

### Error Handling Strategy

The application implements a robust error handling system:

- **NetworkError**: Retries with exponential backoff
- **ProviderOutage**: Switches to fallback provider
- **Typed Errors**: All errors are explicitly typed and handled

### Fallback Mechanism

```typescript
const DadJokePlan = ExecutionPlan.make(
  {
    provide: OpenAiLanguageModel.model('gpt-4o'),
    attempts: 3,
    schedule: Schedule.exponential('100 millis', 1.5),
    while: (error) => error._tag === 'NetworkError',
  },
  {
    provide: AnthropicLanguageModel.model('claude-4-sonnet-20250514'),
    attempts: 2,
    schedule: Schedule.exponential('100 millis', 1.5),
    while: (error) => error._tag === 'ProviderOutage',
  }
);
```

### TOON Format Integration

The project uses **Token-Oriented Object Notation (TOON)** for encoding structured data in prompts:

- **Token Efficiency**: 30-60% reduction in token usage compared to formatted JSON
- **Human Readability**: Maintains schema-aware structure while being readable
- **Applied To**: Tarot spread configuration and card data structures in prompts

### Dependencies

- `@effect/ai`: Core AI integration library
- `@effect/ai-openai`: OpenAI provider implementation
- `@effect/ai-anthropic`: Anthropic provider implementation
- `@mastra/core`: Mastra agent framework
- `@toon-format/toon`: Token-efficient data encoding
- `effect`: Effect ecosystem core library
- `dotenv`: Environment variable management

## Development

### Scripts

- `pnpm start`: Run both Effect/AI and Mastra implementations and generate comparison outputs
- `pnpm test`: Run tests (currently placeholder)

### TODO

- [x] **TOON Integration**: Implemented TOON (Token-Oriented Object Notation) format for more efficient token usage in LLM prompts. TOON provides 30-60% fewer tokens on large uniform arrays vs formatted JSON while maintaining human readability and schema-aware structure. This optimizes the tarot card data structure and prompt efficiency. [GitHub Repository](https://github.com/toon-format/toon)
- [x] **Mastra Implementation**: Created parallel implementation using the Mastra library to compare with the Effect/AI approach. This enables direct comparison of API design, error handling approaches, provider integration complexity, performance characteristics, and developer experience between the two libraries.

## Performance Comparison

The project generates timestamped output files for each implementation, allowing direct comparison of:

- **Token Usage**: Both libraries provide detailed token consumption statistics
- **Response Quality**: Comparative analysis of generated tarot readings
- **Execution Time**: Performance characteristics of each approach
- **Error Handling**: How each library manages API failures and retries

Example output files:
- `reading-effect-[timestamp].txt`: Effect/AI implementation results
- `reading-mastra-[timestamp].txt`: Mastra implementation results

## License

MIT License - see LICENSE file for details.
