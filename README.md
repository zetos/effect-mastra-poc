# AI Agent Comparison Project

A TypeScript project designed to test and compare the **@effect/ai** library with the **Mastra** library through a simple agent implementation that processes a single prompt.

## Project Overview

This project serves as a testing ground for evaluating different AI libraries in the TypeScript ecosystem. The current implementation uses **@effect/ai** to create an agent that performs tarot readings using a detailed prompt with a character persona.

### Key Features

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
├── index.ts          # Main application logic with Effect/AI implementation
├── prompt.ts         # Tarot reading prompt with character definition
.env.example          # Environment variables template
package.json          # Project dependencies and scripts
tsconfig.json         # TypeScript configuration
```

### Key Components

- **`src/index.ts`**: Core implementation using Effect/AI with:

  - Language model abstraction
  - Error handling and retry logic
  - Fallback strategy between providers
  - File output functionality

- **`src/prompt.ts`**: Comprehensive tarot reading prompt featuring:
  - Granny Weatherwax character persona
  - Celtic Cross spread configuration
  - Detailed card interpretations
  - Structured JSON data for cards and positions

## Usage

### Running the Application

Execute the agent with the following command:

```bash
pnpm start
```

### What It Does

1. **Processes the tarot prompt** using the configured AI provider
2. **Implements fallback strategy**:
   - First attempts: OpenAI GPT-4o (3 retries)
   - Fallback: Anthropic Claude-4 Sonnet (2 retries)
3. **Generates a tarot reading** based on the Celtic Cross spread
4. **Saves the response** to `dad-joke.txt` in the project root

### Output

The application generates a tarot reading and saves it to `dad-joke.txt`. The reading follows the Granny Weatherwax persona - straightforward, practical, with a hint of sarcasm and deep wisdom.

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

### Future Mastra Comparison

This project is designed to implement the same functionality using Mastra for direct comparison:

**Comparison Points:**

- API design and ergonomics
- Error handling approaches
- Provider integration complexity
- Performance characteristics
- Developer experience

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
    provide: OpenAiLanguageModel.model("gpt-4o"),
    attempts: 3,
    schedule: Schedule.exponential("100 millis", 1.5),
    while: (error) => error._tag === "NetworkError",
  },
  {
    provide: AnthropicLanguageModel.model("claude-4-sonnet-20250514"),
    attempts: 2,
    schedule: Schedule.exponential("100 millis", 1.5),
    while: (error) => error._tag === "ProviderOutage",
  }
);
```

### Dependencies

- `@effect/ai`: Core AI integration library
- `@effect/ai-openai`: OpenAI provider implementation
- `@effect/ai-anthropic`: Anthropic provider implementation
- `effect`: Effect ecosystem core library
- `dotenv`: Environment variable management

## Development

### Scripts

- `pnpm start`: Run the application
- `pnpm test`: Run tests (currently placeholder)

### TODO

- [ ] **TOON Integration**: Implement TOON (Token-Oriented Object Notation) format for more efficient token usage in LLM prompts. TOON provides 30-60% fewer tokens on large uniform arrays vs formatted JSON while maintaining human readability and schema-aware structure. This would be particularly useful for optimizing the tarot card data structure and prompt efficiency. [GitHub Repository](https://github.com/toon-format/toon)
- [ ] **Mastra Implementation**: Create a parallel implementation using the Mastra library to compare with the current Effect/AI approach. This will allow direct comparison of API design, error handling approaches, provider integration complexity, performance characteristics, and developer experience between the two libraries.

### Contributing

This project is primarily for library comparison and testing. When adding Mastra implementation:

1. Create a parallel implementation in a separate branch
2. Maintain the same prompt and functionality
3. Document differences in approach and developer experience
4. Update this README with comparison findings

## License

MIT License - see LICENSE file for details.
