import * as dotenv from 'dotenv';

// Load environment variables from .env file
dotenv.config();

import { LanguageModel } from '@effect/ai';
import { Effect } from 'effect';
import { FileSystem } from '@effect/platform';
import { NodeFileSystem } from '@effect/platform-node';
import { effectPlan } from './agents/effectPlan';

const writeReadingToFile = (response: LanguageModel.GenerateTextResponse<{}>) =>
  Effect.gen(function* () {
    const fs = yield* FileSystem.FileSystem;
    const filename = `reading-${Date.now()}.txt`;
    yield* fs.writeFileString(filename, response.text);
    console.log(
      'Token usage statistics for the generation request:',
      response.usage
    );
    console.log(`Tarot reading written to ${filename}`);
  });

const main = Effect.gen(function* () {
  const effectResult = yield* effectPlan;
  yield* writeReadingToFile(effectResult);
});

main.pipe(Effect.provide([NodeFileSystem.layer]), Effect.runPromise);
