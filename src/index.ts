import * as dotenv from "dotenv";
import promptString from "./prompt";

// Load environment variables from .env file
dotenv.config();

import { LanguageModel } from "@effect/ai";
import { AnthropicClient, AnthropicLanguageModel } from "@effect/ai-anthropic";
import { OpenAiClient, OpenAiLanguageModel } from "@effect/ai-openai";
import { NodeHttpClient } from "@effect/platform-node";
import { Config, Data, Effect, ExecutionPlan, Layer, Schedule } from "effect";
import { FileSystem } from "@effect/platform";
import { NodeFileSystem } from "@effect/platform-node";

class NetworkError extends Data.TaggedError("NetworkError")<{
  readonly message: string;
}> {}

class ProviderOutage extends Data.TaggedError("ProviderOutage")<{
  readonly message: string;
}> {}

// declare const generateDadJoke: Effect.Effect<
//   LanguageModel.GenerateTextResponse<{}>,
//   NetworkError | ProviderOutage,
//   LanguageModel.LanguageModel
// >;

const generateDadJoke: Effect.Effect<
  LanguageModel.GenerateTextResponse<{}>,
  NetworkError | ProviderOutage,
  LanguageModel.LanguageModel
> = Effect.gen(function* () {
  const response = yield* LanguageModel.generateText({
    prompt: promptString,
    // prompt: "Generate a dad joke",
  }).pipe(
    Effect.mapError((error) => {
      if (error._tag === "HttpRequestError") {
        return new NetworkError({ message: `Network issue: ${error.message}` });
      }
      if (error._tag === "HttpResponseError") {
        return new ProviderOutage({
          message: `Provider issue: ${error.message}`,
        });
      }
      return new ProviderOutage({
        message: `Unknown provider error: ${error.message}`,
      });
    })
  );
  return response;
});

const DadJokePlan = ExecutionPlan.make(
  {
    provide: OpenAiLanguageModel.model("gpt-4o"),
    attempts: 3,
    schedule: Schedule.exponential("100 millis", 1.5),
    while: (error: NetworkError | ProviderOutage) =>
      error._tag === "NetworkError",
  },
  {
    provide: AnthropicLanguageModel.model("claude-4-sonnet-20250514"),
    attempts: 2,
    schedule: Schedule.exponential("100 millis", 1.5),
    while: (error: NetworkError | ProviderOutage) =>
      error._tag === "ProviderOutage",
  }
);

const writeJokeToFile = (response: LanguageModel.GenerateTextResponse<{}>) =>
  Effect.gen(function* () {
    const fs = yield* FileSystem.FileSystem;
    yield* fs.writeFileString("dad-joke.txt", response.text);
    console.log("Dad joke written to dad-joke.txt");
  });

const main = Effect.gen(function* () {
  const response = yield* generateDadJoke;
  yield* writeJokeToFile(response);
}).pipe(Effect.withExecutionPlan(DadJokePlan));

const Anthropic = AnthropicClient.layerConfig({
  apiKey: Config.redacted("ANTHROPIC_API_KEY"),
}).pipe(Layer.provide(NodeHttpClient.layerUndici));

const OpenAi = OpenAiClient.layerConfig({
  apiKey: Config.redacted("OPENAI_API_KEY"),
}).pipe(Layer.provide(NodeHttpClient.layerUndici));

main.pipe(
  Effect.provide([Anthropic, OpenAi, NodeFileSystem.layer]),
  Effect.runPromise
);
