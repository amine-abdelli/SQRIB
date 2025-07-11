const adjectives = [
  'Happy', 'Sad', 'Angry', 'Funny', 'Serious',
  'Joyful', 'Fearful', 'Courageous', 'Calm', 'Depressed',
  'Elated', 'Mournful', 'Optimistic', 'Pessimistic', 'Grateful',
  'Hopeful', 'Skeptical', 'Jealous', 'Apathetic', 'Jubilant',
  'Ecstatic', 'Desperate', 'Frustrated', 'Satisfied', 'Confident',
  'Eager', 'Hesitant', 'Bitter', 'Astonished', 'Curious',
  'Indifferent', 'Guilty', 'Relieved', 'Content', 'Worried',
  'Furious', 'Alarmed', 'Loving', 'Gloomy', 'Ashamed',
  'Enthusiastic', 'Cozy', 'Jaded', 'Miserable', 'Scornful',
  'Compassionate', 'Fantastic', 'Tragic', 'Weary', 'Exuberant',
  'Respectful', 'Proud', 'Envious', 'Infuriated', 'Perplexed',
  'Pensive', 'Tense', 'Irate', 'Outraged', 'Vibrant',
  'Forgiving', 'Disgusted', 'Sarcastic', 'Powerless', 'Nostalgic',
  'Sensitive', 'Smug', 'Earnest', 'Admiring', 'Isolated',
  'Vexed', 'Reverent', 'Cautious', 'Regretful', 'Stunned',
  'Lucky', 'Unlucky', 'Defeated', 'Energetic', 'Spoiled',
  'Earnest', 'Humble', 'Brave', 'Mellow', 'Foolish',
  'Witty', 'Frantic', 'Giddy', 'Indignant', 'Intolerant',
  'Hopeless', 'Celestial', 'Persistent', 'Pleasant', 'Wretched',
  'Obedient', 'Rebellious', 'Innocent', 'Melancholic', 'Anxious',
  'Affable', 'Aggressive', 'Ambitious', 'Amiable',
  'Considerate', 'Courteous', 'Cowardly', 'Cruel', 'Diligent',
  'Discreet', 'Dynamic', 'Easygoing', 'Eloquent', 'Faithful',
  'Fearless', 'Gregarious', 'Honest', 'Ignorant', 'Inconsiderate',
  'Insightful', 'Inventive', 'Kind', 'Lazy', 'Lively',
  'Malicious', 'Mysterious', 'Nervous', 'Observant', 'Pessimistic',
  'Pompous', 'Quiet', 'Reliable', 'Reserved', 'Ruthless',
  'Selfish', 'Sensible', 'Sensitive', 'Shy', 'Silly',
  'Sincere', 'Stingy', 'Stubborn', 'Suave', 'Sullen',
  'Sympathetic', 'Tense', 'Thoughtful', 'Tolerant', 'Versatile',
  'Witty', 'Wrongheaded', 'Adaptable', 'Adventurous', 'Affectionate',
  'Antagonistic', 'Apprehensive', 'Arrogant', 'Articulate', 'Assertive',
  'Astute', 'Boisterous', 'Brash', 'Businesslike', 'Candid',
  'Capable', 'Careful', 'Cautious', 'Charming', 'Cheerful',
  'Clean', 'Clever', 'Clumsy', 'Coherent', 'Comfortable',
  'Conscientious', 'Conservative', 'Contradictory', 'Cooperative', 'Cynical',
  'Decisive', 'Dedicated', 'Deliberate', 'Demanding', 'Dependable',
  'Determined', 'Efficient', 'Elitist', 'Emotional', 'Empathetic',
  'Energetic', 'Enthusiastic', 'Extroverted', 'Fanatical', 'Foolish',
  'Generous', 'Gentle', 'Glamorous', 'Guileless', 'Hardworking', 'Humorous',
  'Mad', 'Mature', 'Meticulous', 'Miserly', 'Modest',
  'Naive', 'Nasty', 'Neat', 'Nervous', 'Objective',
  'Obliging', 'Open-minded', 'Outgoing', 'Passionate',
  'Patient', 'Persistent', 'Philosophical', 'Placid', 'Plucky',
  'Polite', 'Popular', 'Practical', 'Prejudiced', 'Proud',
  'Punctual', 'Rational', 'Relaxed', 'Reliable', 'Reserved',
  'Crazy', 'Rude', 'Selfish', 'Sensible', 'Sensitive',
  'Nasty',
];

const nouns = [
  'Dog', 'Cat', 'Bird', 'Fish', 'Human',
  'Chair', 'Car', 'Bicycle', 'Flower', 'Tree',
  'Mountain', 'River', 'Ocean', 'Planet', 'Star',
  'Book', 'Pen', 'Computer', 'Phone', 'Game',
  'Movie', 'Song', 'Instrument', 'Engine', 'Robot',
  'Heart', 'Lung', 'Hand', 'Foot', 'Child',
  'Parent', 'Friend', 'Sibling', 'Cousin', 'Partner',
  'Boss', 'Employee', 'Coworker', 'Classmate', 'Student',
  'Teacher', 'Singer', 'Actor', 'Politician', 'Athlete',
  'Artist', 'Writer', 'Poet', 'Cop', 'Firefighter',
  'Astronaut', 'Scientist', 'Alien', 'Zombie', 'Vampire',
  'Wizard', 'Witch', 'Knight', 'Pirate', 'Detective',
  'Spy', 'Chef', 'Baker', 'Mechanic', 'Carpenter',
  'Farmer', 'Hunter', 'Fisherman', 'Plumber', 'Tailor',
  'Jeweler', 'Barber', 'Clerk', 'Cashier', 'Secretary',
  'Nurse', 'Doctor', 'Surgeon', 'Dentist', 'Optometrist',
  'Pharmacist', 'Veterinarian', 'Professor', 'Adviser',
  'Counselor', 'Consultant', 'Architect', 'Engineer',
  'Translator', 'Volunteer', 'Mascot', 'Photographer',
  'Journalist', 'Reporter', 'Editor', 'Programmer', 'Designer',
  'Typist', 'Accountant', 'Lawyer', 'Judge', 'Magician',
  'Thief', 'Beggar', 'Baker', 'Butcher', 'Cobbler',
  'Dancer', 'Singer', 'Actor', 'Artist', 'Painter',
  'Sculptor', 'Writer', 'Poet', 'Composer', 'Musician',
  'Sailor', 'Pilot', 'Driver', 'Captain', 'Soldier',
  'Spy', 'Detective', 'Pirate', 'Knight', 'Wizard',
  'Witch', 'Ghost', 'Vampire', 'Zombie', 'Alien',
  'Robot', 'Dragon', 'Monster', 'Demon', 'Angel',
  'God', 'Goddess', 'Hero', 'Villain', 'Princess',
  'Prince', 'Queen', 'King', 'President', 'Dictator',
  'Emperor', 'Empress', 'Pope', 'Saint', 'Prophet',
  'Martyr', 'Philosopher', 'Scientist', 'Inventor',
  'Explorer', 'Adventurer', 'Conqueror', 'Pioneer',
  'Entrepreneur', 'Innovator', 'Revolutionary', 'Rebel',
  'Tyrant', 'Warrior', 'General', 'Captain', 'Commander',
  'Soldier', 'Sailor', 'Pilot', 'Spy', 'Detective',
  'Pirate', 'Knight', 'Wizard', 'Witch', 'Ghost',
  'Aardvark', 'Abacus', 'Acorn', 'Aircraft', 'Albatross',
  'Alley', 'Alphabet', 'Amoeba', 'Ant', 'Antenna',
  'Ape', 'Apple', 'Apron', 'Arm', 'Armchair',
  'Attic', 'Autumn', 'Axe', 'Banana', 'Barn',
  'Barrel', 'Baseball', 'Basement', 'Basket', 'Bat',
  'Bathroom', 'Beach', 'Bear', 'Beard', 'Bed',
  'Bee', 'Beetle', 'Bell', 'Belt', 'Bicycle',
  'Bin', 'Birch', 'Birdhouse', 'Blade', 'Blanket',
  'Blizzard', 'Boat', 'Bolt', 'Bookshelf', 'Bottle',
  'Boulder', 'Bow', 'Bowl', 'Box', 'Boy',
  'Branch', 'Brick', 'Bridge', 'Broom', 'Bucket',
  'Buffalo', 'Bug', 'Building', 'Bulb', 'Bull',
  'Bush', 'Butterfly', 'Button', 'Cabinet', 'Cactus',
  'Cage', 'Camel', 'Camera', 'Candle', 'Cane',
  'Canoe', 'Carpet', 'Castle', 'Catfish', 'Cave',
  'Ceiling', 'Cellar', 'Centipede', 'Chain', 'Chairlift',
  'Chalk', 'Channel', 'Cherry', 'Chessboard', 'Chimney',
  'Circus', 'Clam', 'Cliff', 'Closet', 'Cloud',
  'Coast', 'Cobweb', 'Coconut', 'Coffee', 'Coin',
  'Comet', 'Compass', 'Computer', 'Cone', 'Cork',
  'Corn', 'Couch', 'Crayon', 'Creek', 'Crow',
  'Crystal', 'Cup', 'Curtain', 'Cushion', 'Daffodil',
  'Daisy', 'Dart', 'Dawn', 'Desert', 'Diamond',
  'Dish', 'Doll', 'Dolphin', 'Door', 'Dragon',
  'Dragonfly', 'Drawer', 'Drum', 'Duck', 'Dune',
  'Eagle', 'Ear', 'Earth', 'Egg', 'Eggplant',
  'Elephant', 'Elm', 'Envelope', 'Equator', 'Eraser',
  'Pimp', 'Gangster', 'Thug', 'Hustler', 'Dealer',
  'Creep', 'Crook', 'Chef', 'Bitch',
];

// Generate a random number between min and max (both included)
function getRandomNumber(min: number, max: number): number {
  return Math.floor(Math.random() * (max - min + 1) + min);
}

// Pick a random element from an array
export function pickRandomElement<T>(array: T[]): T {
  const index = getRandomNumber(0, array.length - 1);
  return array[index];
}

// Generate a random username
export function generateRandomUsername(): string {
  const adjective = pickRandomElement(adjectives);
  const noun = pickRandomElement(nouns);
  const number = getRandomNumber(1000, 9999);
  const separators = ['-', '_', ''];
  const pickedSeparator = pickRandomElement(separators);
  const hasSeparator = pickedSeparator === '-' || pickedSeparator === '_';
  return `${hasSeparator ? adjective.toLocaleLowerCase() : adjective}${pickedSeparator}${hasSeparator ? noun.toLocaleLowerCase() : noun}${pickedSeparator}${number}`;
}
