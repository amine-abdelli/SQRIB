import { useState } from 'react';
import { Setting } from 'react-iconly';
import { Button } from '../Button/Button.component';
import './Options.style.scss';


function Options() {
  // Words collection layout
  const [shouldDisplayOption, setShouldDisplayOption] = useState<boolean>(false);

  return (
    <div className="options--wrapper main-options--wrapper">
      <Button className={`option-cta ${shouldDisplayOption ? 'hidden' : ''}`} onClick={() => setShouldDisplayOption(!shouldDisplayOption)} label={<Setting set="curved" primaryColor="black" />} light stretch />
    </div>
  );
}

export { Options };
