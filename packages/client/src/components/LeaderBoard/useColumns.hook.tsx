import { Hide, Show } from 'react-iconly';
// import { theme } from '../../../styles/theme';

export function useColumns() {
  // For all the players
  function soloColumns(fn?: any) {
    return [
      {
        title: 'Position', // What is displayed by in the table header
        dataIndex: 'position', // The key corresponding to our data
        key: 'position',
      },
      {
        title: 'Nom', // What is displayed by in the table header
        dataIndex: 'username', // The key corresponding to our data
        key: 'name',
      },
      {
        title: 'Mpm', // What is displayed by in the table header
        dataIndex: 'mpm', // The key corresponding to our data
        key: 'mpm',
      },
      {
        title: 'Precision', // What is displayed by in the table header
        dataIndex: 'precision', // The key corresponding to our data
        key: 'victory',
      },
      {
        title: 'Date', // What is displayed by in the table header
        dataIndex: 'date', // The key corresponding to our data
        key: 'date',
      },
      {
        title: '', // What is displayed by in the table header
        dataIndex: 'userId', // The key corresponding to our data
        key: 'userId',
        render: (item: any, currentData: any) => (currentData.username && (
          item ? (
            <span
              style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}
              onClick={() => fn(item)}
            >
              <Show style={{ margin: 0, cursor: 'pointer' }} />
            </span>
          ) : <Hide />
        )),
      },
    ];
  }
  // For all the players
  function multiplayerColumns(fn?: any) {
    return [
      {
        title: 'Position', // What is displayed by in the table header
        dataIndex: 'position', // The key corresponding to our data
        key: 'position',
      },
      {
        title: 'Nom', // What is displayed by in the table header
        dataIndex: 'username', // The key corresponding to our data
        key: 'name',
      },
      {
        title: 'Mpm', // What is displayed by in the table header
        dataIndex: 'mpm', // The key corresponding to our data
        key: 'mpm',
      },
      {
        title: 'Victoires', // What is displayed by in the table header
        dataIndex: 'victory', // The key corresponding to our data
        key: 'victory',
      },
      {
        title: 'Date', // What is displayed by in the table header
        dataIndex: 'date', // The key corresponding to our data
        key: 'date',
      },
      {
        title: '', // What is displayed by in the table header
        dataIndex: 'userId', // The key corresponding to our data
        key: 'userId',
        render: (item: any, currentData: any) => (currentData.username && (
          item ? <span onClick={() => fn(item)}><Show style={{ margin: 0, cursor: 'pointer' }} /></span> : <Hide />
        )),
      },
    ];
  }

  function multiplayerDetails(fn?: any) {
    return [
      {
        title: 'Precision', // What is displayed by in the table header
        dataIndex: 'precision', // The key corresponding to our data
        key: 'precision',
      },
      {
        title: 'Mpm', // What is displayed by in the table header
        dataIndex: 'mpm', // The key corresponding to our data
        key: 'name',
      },
      {
        title: 'Victoire', // What is displayed by in the table header
        dataIndex: 'hasWon', // The key corresponding to our data
        key: 'position',
      },
      {
        title: 'Langue', // What is displayed by in the table header
        dataIndex: 'language', // The key corresponding to our data
        key: 'mpm',
      },
      {
        title: 'Date', // What is displayed by in the table header
        dataIndex: 'date', // The key corresponding to our data
        key: 'date',
      },
    ];
  }

  function soloDetails(fn?: any) {
    return [
      {
        title: 'Mpm', // What is displayed by in the table header
        dataIndex: 'mpm', // The key corresponding to our data
        key: 'name',
      },
      {
        title: 'Precision', // What is displayed by in the table header
        dataIndex: 'precision', // The key corresponding to our data
        key: 'precision',
      },
      {
        title: 'Points', // What is displayed by in the table header
        dataIndex: 'points', // The key corresponding to our data
        key: 'points',
      },
      {
        title: 'Langue', // What is displayed by in the table header
        dataIndex: 'language', // The key corresponding to our data
        key: 'mpm',
      },
      {
        title: 'Date', // What is displayed by in the table header
        dataIndex: 'date', // The key corresponding to our data
        key: 'date',
      },
    ];
  }

  function roomTableColumns(fn?: any) {
    return [
      {
        title: 'Langue', // What is displayed by in the table header
        dataIndex: 'lang', // The key corresponding to our data
        key: 'lang',
      },
      {
        title: 'Nom', // What is displayed by in the table header
        dataIndex: 'name', // The key corresponding to our data
        key: 'name',
        align: 'start',
      },
      {
        title: 'Joueurs', // What is displayed by in the table header
        dataIndex: 'players', // The key corresponding to our data
        key: 'players',
      },
      {
        title: 'Mots', // What is displayed by in the table header
        dataIndex: 'wordAmount', // The key corresponding to our data
        key: 'wordAmount',
      },
    ];
  }
  return {
    multiplayerColumns, soloColumns, multiplayerDetails, soloDetails, roomTableColumns,
  };
}
