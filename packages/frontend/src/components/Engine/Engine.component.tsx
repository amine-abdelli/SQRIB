import React from 'react';
import {
  dictionaries,
} from '@sqrib/shared';

console.log(dictionaries.fr);
function Engine({ children }: any) {
  // The logic goes here
  return (
    <div>{children}</div>
  );
}

export { Engine };
