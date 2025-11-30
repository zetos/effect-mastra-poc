import { LanguageModel } from '@effect/ai';
import { OpenAiClient, OpenAiLanguageModel } from '@effect/ai-openai';
import { NodeHttpClient } from '@effect/platform-node';
import { Config, Data, Effect, ExecutionPlan, Layer, Schedule } from 'effect';
import promptString from '../prompt';

class NetworkError extends Data.TaggedError('NetworkError')<{
  readonly message: string;
}> {}

class ProviderOutage extends Data.TaggedError('ProviderOutage')<{
  readonly message: string;
}> {}

const generateTarotReading: Effect.Effect<
  LanguageModel.GenerateTextResponse<{}>,
  NetworkError | ProviderOutage,
  LanguageModel.LanguageModel
> = Effect.gen(function* () {
  const response = yield* LanguageModel.generateText({
    prompt: promptString,
  }).pipe(
    Effect.mapError((error) => {
      if (error._tag === 'HttpRequestError') {
        return new NetworkError({ message: `Network issue: ${error.message}` });
      }
      if (error._tag === 'HttpResponseError') {
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

const TarotReadingPlan = ExecutionPlan.make({
  provide: OpenAiLanguageModel.model('gpt-5-2025-08-07'),
  attempts: 3,
  schedule: Schedule.exponential('100 millis', 1.5),
  while: (error: NetworkError | ProviderOutage) =>
    error._tag === 'NetworkError',
});

const OpenAi = OpenAiClient.layerConfig({
  apiKey: Config.redacted('OPENAI_API_KEY'),
}).pipe(Layer.provide(NodeHttpClient.layerUndici));

const effectPlan = Effect.gen(function* () {
  const response = yield* generateTarotReading;
  return response;
}).pipe(Effect.withExecutionPlan(TarotReadingPlan), Effect.provide([OpenAi]));

export { effectPlan };
