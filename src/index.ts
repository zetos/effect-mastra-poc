import * as dotenv from 'dotenv';

// Load environment variables from .env file
dotenv.config();

import { Effect } from 'effect';
import { FileSystem } from '@effect/platform';
import { NodeFileSystem } from '@effect/platform-node';
import { effectPlan } from './agents/effectPlan';
import basicAgentInteraction from './agents/mastraAgent';

const writeReadingToFile = (lib: 'effect' | 'mastra', response: string) =>
  Effect.gen(function* () {
    const fs = yield* FileSystem.FileSystem;
    const filename = `reading-${lib}-${Date.now()}.txt`;
    yield* fs.writeFileString(filename, response);

    console.log(`Tarot reading written to ${filename}`);
  });

const main = Effect.gen(function* () {
  // Effect
  const effectResult = yield* effectPlan;
  yield* writeReadingToFile('effect', effectResult);

  // Mastra
  const mastraResult = yield* Effect.tryPromise(basicAgentInteraction);
  yield* writeReadingToFile('mastra', mastraResult);
});

main.pipe(Effect.provide([NodeFileSystem.layer]), Effect.runPromise);
