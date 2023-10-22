const getUsername = () => "John"; // Replace with your function to get the username

const greetSentences = [
  `Hey ${getUsername()}, welcome to the battleground of words! Ready to prove your skills? Click JOIN and let the typing duel begin!`,
  `Hey ${getUsername()}, you've entered the arena of keystrokes! Eager to claim victory? Hit JOIN and let's get typing!`,
  `Hey ${getUsername()}, the ultimate typing challenge awaits! Are you up for it? Click JOIN to unleash your speed!`,
  `Hey ${getUsername()}, welcome to the world of fast fingers and flying words! Ready to jump in? Click JOIN to get started!`,
  `Hey ${getUsername()}, the keyboard is your sword, the words your shield. Ready for battle? Click JOIN to enter the fray!`,
  `Hey ${getUsername()}, you've just stepped into the typing ring! Want to be the champion? Click JOIN and show us what you've got!`
];

export function getTodaysGreeting() {
  const today = new Date();
  const day = today.getDate();
  const month = today.getMonth();
  const year = today.getFullYear();

  const seed = day + month + year; // Generate a seed based on the date
  const index = seed % greetSentences.length; // Use modulo to stay within the array bounds

  return greetSentences[index];
}

