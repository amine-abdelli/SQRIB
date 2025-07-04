export function roomListColumns(fn?: any) {
  return [
    {
      title: 'Name', // What is displayed by in the table header
      dataIndex: 'name', // The key corresponding to our data
      key: 'name',
      align: 'start',
    },
    {
      title: 'Language', // What is displayed by in the table header
      dataIndex: 'language', // The key corresponding to our data
      key: 'language',
      align: 'start',
    },
    {
      title: 'Players', // What is displayed by in the table header
      dataIndex: 'players', // The key corresponding to our data
      key: 'players',
      align: 'start',
      render: (item: any) => (<span className='bold' > {item}/5 </span>),
    },
    {
      title: 'Mode', // What is displayed by in the table header
      dataIndex: 'mode', // The key corresponding to our data
      key: 'mode',
      align: 'start',
    },
    {
      title: 'Word count',
      dataIndex: 'wordCount',
      key: 'wordCount',
      align: 'start',
    }
  ];
}
