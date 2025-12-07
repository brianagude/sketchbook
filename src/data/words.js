const wordBank = {
  animals: {
    easy: ['HORSE', 'SHEEP', 'MOUSE', 'SNAKE', 'WHALE'],
    medium: ['GIRAFFE', 'CHEETAH', 'DOLPHIN', 'PENGUIN', 'HAMSTER', 'PANTHER', 'RACCOON'],
    hard: ['CHIMPANZEE', 'RHINOCEROS', 'SALAMANDER', 'CHINCHILLA', 'ALLIGATOR', 'CROCODILE', 'HUMMINGBIRD']
  },
  
  winter: {
    easy: ['FROST', 'CHILL', 'FLAKE', 'GLOVE', 'SCARF', 'BOOTS', 'IGLOO'],
    medium: ['BLIZZARD', 'SNOWMAN', 'ICICLE', 'GLACIER', 'MITTENS', 'FREEZE', 'FROSTY'],
    hard: ['WINTERTIME', 'HIBERNATION', 'SNOWBOARDING', 'FROSTBITTEN', 'ICEBREAKER', 'PERMAFROST']
  },
  
  food: {
    easy: ['PIZZA', 'BREAD', 'APPLE', 'GRAPE', 'PASTA', 'SALAD', 'PEACH'],
    medium: ['AVOCADO', 'COCONUT', 'PANCAKE', 'BURRITO', 'POPCORN', 'PRETZEL', 'WAFFLE'],
    hard: ['SPAGHETTI', 'CHEESECAKE', 'QUESADILLA', 'CAPPUCCINO', 'WATERMELON', 'HAMBURGER', 'PUMPERNICKEL']
  },
  
  space: {
    easy: ['COMET', 'EARTH', 'ORBIT', 'VENUS', 'ALIEN', 'PLUTO'],
    medium: ['JUPITER', 'ASTEROID', 'NEBULA', 'GALAXY', 'MERCURY', 'SATURN', 'ECLIPSE'],
    hard: ['CONSTELLATION', 'SUPERNOVA', 'BLACKHOLE', 'MOONLIGHT', 'TELESCOPE', 'ATMOSPHERE', 'ASTRONAUT']
  },
  
  nature: {
    easy: ['OCEAN', 'RIVER', 'CLIFF', 'BEACH', 'WOODS', 'STORM', 'CLOUD'],
    medium: ['VOLCANO', 'RAINBOW', 'THUNDER', 'MOUNTAIN', 'SEASIDE', 'FOREST', 'CANYON'],
    hard: ['WATERFALL', 'LIGHTNING', 'EARTHQUAKE', 'AVALANCHE', 'THUNDERSTORM', 'COUNTRYSIDE', 'WILDERNESS']
  },

  cities: {
    easy: ['TOKYO', 'PARIS', 'DUBAI', 'BERLIN', 'SEOUL', 'MILAN'],
    medium: ['CHICAGO', 'TORONTO', 'SEATTLE', 'PORTLAND', 'PHOENIX', 'ATLANTA', 'HOUSTON'],
    hard: ['AMSTERDAM', 'BARCELONA', 'SINGAPORE', 'MELBOURNE', 'STOCKHOLM', 'COPENHAGEN', 'WELLINGTON']
  }
};

export function getRandomWord(category = null, difficulty = null) {
  const categories = category ? [category] : Object.keys(wordBank);
  const randomCategory = categories[Math.floor(Math.random() * categories.length)];
  
  const difficulties = difficulty ? [difficulty] : ['easy', 'medium', 'hard'];
  const randomDifficulty = difficulties[Math.floor(Math.random() * difficulties.length)];
  
  const words = wordBank[randomCategory][randomDifficulty];
  const randomWord = words[Math.floor(Math.random() * words.length)];
  
  return {
    word: randomWord,
    category: randomCategory,
    difficulty: randomDifficulty
  };
}