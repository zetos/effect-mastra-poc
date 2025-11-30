import { encode } from '@toon-format/toon';

const spreadData = {
  id: 'celtic-cross',
  name: 'The Celtic Cross',
  description:
    'A comprehensive 10-card spread offering deep insights into your question, covering past, present, and future influences',
  positions: [
    {
      position: 1,
      name: 'Present Situation',
      description:
        'The current state of affairs and the central theme of the reading',
    },
    {
      position: 2,
      name: 'Challenge',
      description: 'The immediate obstacle or challenge crossing your path',
    },
    {
      position: 3,
      name: 'Below',
      description:
        'Unconscious influences, hidden roots, and unknown factors that shape your current circumstances from beneath the surface',
    },
    {
      position: 4,
      name: 'Recent Past',
      description: 'Recent events that are passing or fading away',
    },
    {
      position: 5,
      name: 'Above',
      description:
        'Conscious thoughts, goals, and aspirations that occupy your mind',
    },
    {
      position: 6,
      name: 'Near Future',
      description: 'Events and influences that will manifest in the near term',
    },
    {
      position: 7,
      name: 'The Self',
      description:
        "Your inner landscape in this moment, and the personal approach you're bringing to navigate the situation",
    },
    {
      position: 8,
      name: 'External Influences',
      description:
        'How others see you and external factors affecting the situation',
    },
    {
      position: 9,
      name: 'Hopes and Fears',
      description: 'Your innermost hopes and fears regarding the situation',
    },
    {
      position: 10,
      name: 'Final Outcome',
      description: 'The culmination and final result of the reading',
    },
  ],
};

const drawnCardsData = {
  questionId: 'future',
  spreadId: 'celtic-cross',
  cards: [
    {
      id: 40,
      name: 'Five of Primordialism',
      arcana: 'minor',
      suit: {
        essence: 'primordialism',
        faction: 'nephandi',
        element: 'water',
        tarotSuit: 'cups',
      },
      imagePath: '/assets/mage/primordialism/5 of Primordialism.png',
      uprightMeaning:
        'Loss, grief, disappointment, regret, mourning, negative thinking',
      reversedMeaning: 'Recovery, acceptance, moving on, healing, forgiveness',
      keywords: ['loss', 'grief', 'regret', 'disappointment'],
      orientation: 'reversed',
      position: 1,
    },
    {
      id: 0,
      name: 'The Fool',
      arcana: 'major',
      imagePath: '/assets/mage/majorArcana/0 Fool.png',
      uprightMeaning:
        'New beginnings, innocence, spontaneity, free spirit, leap of faith',
      reversedMeaning:
        'Recklessness, taken advantage of, inconsideration, naivety',
      keywords: ['beginnings', 'innocence', 'spontaneity', 'free spirit'],
      orientation: 'reversed',
      position: 2,
    },
    {
      id: 18,
      name: 'The Moon',
      arcana: 'major',
      imagePath: '/assets/mage/majorArcana/18 Luna.png',
      uprightMeaning:
        'Illusion, fear, anxiety, subconscious, intuition, dreams',
      reversedMeaning:
        'Release of fear, repressed emotion, inner confusion clarity',
      keywords: ['illusion', 'intuition', 'dreams', 'subconscious'],
      orientation: 'reversed',
      position: 3,
    },
    {
      id: 21,
      name: 'The World',
      arcana: 'major',
      imagePath: '/assets/mage/majorArcana/21 Gaia.png',
      uprightMeaning:
        'Completion, integration, accomplishment, travel, fulfillment, unity',
      reversedMeaning:
        'Seeking personal closure, short-cuts, delays, incomplete',
      keywords: ['completion', 'accomplishment', 'travel', 'unity'],
      orientation: 'reversed',
      position: 4,
    },
    {
      id: 75,
      name: 'Knight of Pattern',
      arcana: 'minor',
      suit: {
        essence: 'pattern',
        faction: 'technocracy',
        element: 'earth',
        tarotSuit: 'pentacles',
      },
      imagePath: '/assets/mage/pattern/12 Knight of Pattern.png',
      uprightMeaning:
        'Efficiency, routine, conservatism, methodical, dedicated, reliable',
      reversedMeaning:
        'Laziness, obsessiveness, perfectionism, stuck in routine',
      keywords: ['efficiency', 'routine', 'dedication', 'reliability'],
      orientation: 'upright',
      position: 5,
    },
    {
      id: 37,
      name: 'Two of Primordialism',
      arcana: 'minor',
      suit: {
        essence: 'primordialism',
        faction: 'nephandi',
        element: 'water',
        tarotSuit: 'cups',
      },
      imagePath: '/assets/mage/primordialism/2 of Primordialism.png',
      uprightMeaning:
        'Partnership, unity, attraction, connection, mutual respect, love',
      reversedMeaning: 'Imbalance, broken communication, tension, disunion',
      keywords: ['partnership', 'unity', 'attraction', 'connection'],
      orientation: 'upright',
      position: 6,
    },
    {
      id: 5,
      name: 'The Hierophant',
      arcana: 'major',
      imagePath: '/assets/mage/majorArcana/5 The Heirophant.png',
      uprightMeaning:
        'Spiritual wisdom, religious beliefs, conformity, tradition, institutions',
      reversedMeaning:
        'Personal beliefs, freedom, challenging status quo, rebellion',
      keywords: ['tradition', 'conformity', 'spirituality', 'institutions'],
      orientation: 'reversed',
      position: 7,
    },
    {
      id: 39,
      name: 'Four of Primordialism',
      arcana: 'minor',
      suit: {
        essence: 'primordialism',
        faction: 'nephandi',
        element: 'water',
        tarotSuit: 'cups',
      },
      imagePath: '/assets/mage/primordialism/4 of Primordialism.png',
      uprightMeaning:
        'Meditation, contemplation, apathy, reevaluation, discontent',
      reversedMeaning:
        'Awareness, spiritual growth, sudden realization, breakthrough',
      keywords: ['contemplation', 'apathy', 'reevaluation', 'discontent'],
      orientation: 'upright',
      position: 8,
    },
    {
      id: 52,
      name: 'Three of Dynamism',
      arcana: 'minor',
      suit: {
        essence: 'dynamism',
        faction: 'marauders',
        element: 'air',
        tarotSuit: 'swords',
      },
      imagePath: '/assets/mage/dynamism/3 of Dynamism.png',
      uprightMeaning: 'Heartbreak, grief, sorrow, pain, betrayal, suffering',
      reversedMeaning: 'Recovery, forgiveness, moving on, releasing pain',
      keywords: ['heartbreak', 'sorrow', 'pain', 'loss'],
      orientation: 'reversed',
      position: 9,
    },
    {
      id: 12,
      name: 'The Hanged Man',
      arcana: 'major',
      imagePath: '/assets/mage/majorArcana/12 The Hanged Man.png',
      uprightMeaning:
        'Pause, surrender, letting go, new perspectives, sacrifice',
      reversedMeaning:
        'Delays, resistance, stalling, indecision, unable to let go',
      keywords: ['surrender', 'perspective', 'sacrifice', 'suspension'],
      orientation: 'reversed',
      position: 10,
    },
  ],
};

type drawnCardsDataT = typeof drawnCardsData;

const clearCardsData = (data: drawnCardsDataT) => {
  return {
    cards: data.cards.map((card) =>
      card.orientation === 'upright'
        ? {
            name: card.name,
            arcana: card.arcana,
            meaning: card.uprightMeaning,
            keywords: card.keywords,
            orientation: card.orientation,
            position: card.position,
          }
        : {
            name: card.name,
            arcana: card.arcana,
            meaning: card.reversedMeaning,
            keywords: card.keywords, // shoud have different keywords for reversed?
            orientation: card.orientation,
            position: card.position,
          }
    ),
  };
};

const agentInstructions = `
# Tarot Prompt

# Character

You're a skilled and insightful tarot reader, with the personality of Granny Weatherwax, a formidable and wise witch from Discworld known for your sharp wit, no-nonsense attitude, and deep understanding of magic, human nature and you aren't afraid to speak your mind. You provide guidance by interpreting the cards and explaining their meanings in a way that encourages reflection and contemplation.

## Skills

### Skill 1: Offer advice

- Provide straightforward, practical advice based on your vast experience.
- Use a tone that is both authoritative and caring, with a hint of sarcasm.

### Skill 2: Tarot Reading

- Provide a reading based on the spread and drawn cards, focusing on the user's question.
- Explain the significance of each card in relation to the position and question asked.

## Constraints:

- Do not provide explanations or context outside of Granny Weatherwax's character.
- Use only the language and style that Granny Weatherwax would use.
- Keep responses concise and to the point.
- Focus solely on Tarot readings and interpretations.
- Maintain a cryptic and insightful tone in all responses.
- Ensure explanations of the cards are clear but maintain an air of mystery.
`;

const taskPrompt = `
# User Choices

<userQuestion>
    Future & Destiny: Explore upcoming opportunities, challenges, and your life path ahead
</userQuestion>

<choosenSpread>
    Celtic Cross
</choosenSpread>

# Additional Context

## Spread Information

Here is the data of the spread chosen by the user together with the description of each position:

\`\`\`
${encode(spreadData)}
\`\`\`

## Drawn Cards

Here is the data of the drawn cards together with the description and other necessary information of each card:

\`\`\`
${encode(clearCardsData(drawnCardsData))}
\`\`\`
`;

const promptString = `${agentInstructions}

${taskPrompt}
`;

export { promptString, taskPrompt, agentInstructions };
