import dotenv from "dotenv";

// Load environment variables from .env file
dotenv.config();

// import { AnthropicLanguageModel } from "@effect/ai-anthropic"
import { OpenAiLanguageModel, OpenAiClient } from "@effect/ai-openai";
import { LanguageModel } from "@effect/ai";
import { NodeHttpClient } from "@effect/platform-node";
import { Config, Effect, Layer } from "effect";

const generateDadJoke = Effect.gen(function* () {
  const response = yield* LanguageModel.generateText({
    prompt: "Generate a dad joke",
  });
  console.log(">>>", response.text);
  return response;
});

const Gpt4o = OpenAiLanguageModel.model("gpt-4o");
// const Claude37 = AnthropicLanguageModel.model("claude-3-7-sonnet-latest")

//      ┌─── Effect<void, AiError, AnthropicClient | OpenAiClient>
//      ▼
const main = Effect.gen(function* () {
  const res1 = yield* generateDadJoke;
  //   const res2 = yield* generateDadJoke;
  //   const res3 = yield* Effect.provide(generateDadJoke, Claude37)
}).pipe(Effect.provide(Gpt4o));

// Create a `Layer` which produces an `OpenAiClient` and requires
// an `HttpClient`
//
//      ┌─── Layer<OpenAiClient, ConfigError, HttpClient>
//      ▼
const OpenAi = OpenAiClient.layerConfig({
  apiKey: Config.redacted("OPENAI_API_KEY"),
});

// Provide a platform-specific implementation of `HttpClient` to our
// OpenAi layer
//
//        ┌─── Layer<OpenAiClient, ConfigError, never>
//        ▼
const OpenAiWithHttp = Layer.provide(OpenAi, NodeHttpClient.layerUndici);

main.pipe(Effect.provide(OpenAiWithHttp), Effect.runPromise);
