import { gql } from '@apollo/client';

const CREATE_WORD_SET_QUERY = gql`
query generateWordSet($language: String, $difficulty: String) {
  generateWordSet(language: $language)
}`;

const SELF_QUERY = gql`
query selfQuery {
  self {
    id
    email
    nickname
    didacticiel_level
    scores {
      type
      mpm
      wrong_words
      correct_letters
      total_letters
      wrong_letters
      precision
      points
      created_at
    }
    settings {
      language
      fontSize
      theme
      sound
    }
  },
}
`;

const DIDACTICIEL_WORDSET_QUERY = gql`
query QueryOneSet($letter: String) {
  findOneSet(letter: $letter)
}`;

const GLOBAL_GAME_DATA_QUERY = gql`
query GlobalGamesDataQuery {
  findGameData {
    multi {
      fr {
        id
        type
        mpm
        wrong_words
        correct_letters
        total_letters
        wrong_letters
        precision
        points
        created_at
        userId
        gameId
        username
        timer
        language
      }
      en {
        id
        type
        mpm
        wrong_words
        correct_letters
        total_letters
        wrong_letters
        precision
        points
        created_at
        userId
        gameId
        username
        timer
        language
      }
      de {
        id
        type
        mpm
        wrong_words
        correct_letters
        total_letters
        wrong_letters
        precision
        points
        created_at
        userId
        gameId
        username
        timer
        language
      }
      es {
        id
        type
        mpm
        wrong_words
        correct_letters
        total_letters
        wrong_letters
        precision
        points
        created_at
        userId
        gameId
        username
        timer
        language
      }
    }
    solo {
      fr {
        id
        type
        mpm
        wrong_words
        correct_letters
        total_letters
        wrong_letters
        precision
        points
        created_at
        userId
        gameId
        username
        timer
        language
      }
      en {
        id
        type
        mpm
        wrong_words
        correct_letters
        total_letters
        wrong_letters
        precision
        points
        created_at
        userId
        gameId
        username
        timer
        language
      }
      de {
        id
        type
        mpm
        wrong_words
        correct_letters
        total_letters
        wrong_letters
        precision
        points
        created_at
        userId
        gameId
        username
        timer
        language
      }
      es {
        id
        type
        mpm
        wrong_words
        correct_letters
        total_letters
        wrong_letters
        precision
        points
        created_at
        userId
        gameId
        username
        timer
        language
      }
    }
    games {
      id
      host
      name
      winner
      language
      word_amount
      player_length
      created_at
      players {
        id
        user_id
        name
        score_id
        game_id
        score {
          id
          type
          mpm
          wrong_words
          correct_letters
          total_letters
          wrong_letters
          precision
          points
          created_at
          userId
          gameId
          username
          timer
          language
        }
      }
    }
  }
}
`;

const USER_GAME_DETAILS_QUERY = gql`
query FetchUserGamingDetails($userId: String) {
  fetchUserGamingDetails(userId: $userId) {
    solo {
      id
      type
      mpm
      wrong_words
      correct_letters
      total_letters
      wrong_letters
      precision
      points
      created_at
      userId
      gameId
      username
      timer
      language
    }
    multi {
      id
      host
      name
      winner
      language
      word_amount
      player_length
      created_at
      players {
        id
        user_id
        name
        score_id
        game_id
        score {
          id
          type
          mpm
          wrong_words
          correct_letters
          total_letters
          wrong_letters
          precision
          points
          created_at
          userId
          gameId
          username
          timer
          language
        }
      }
    }
    details {
      created_at
      nickname
      last_activity
    }
  }
}
`;

export {
  CREATE_WORD_SET_QUERY, SELF_QUERY, DIDACTICIEL_WORDSET_QUERY, GLOBAL_GAME_DATA_QUERY,
  USER_GAME_DETAILS_QUERY,
};
