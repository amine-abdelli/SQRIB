import { useState } from "react";

type CallbackFunction = (...args: any[]) => void | Promise<void>;

/**
 * Custom React hook for disabling a button for a specified time after each click.
 * Can also handle async operations in the callback.
 * Avoid user to spam button click in some cases (e.g. save score button).
 *
 * @param {CallbackFunction} callback - The function to execute when button is clicked.
 * @param {number} [delay=2000] - Time in milliseconds to disable the button.
 * 
 * @returns {[Function, boolean]} - Returns an array containing the handleClick function and a boolean representing the disabled state.
 * 
 * @example
 * 
 * const myAsyncCallback = async () => { console.log('Button clicked!'); }
 * const [handleClick, isDisabled] = useTimeoutButton(myAsyncCallback, 2000);
 * 
 * return (
 *   <button onClick={handleClick} disabled={isDisabled}>
 *     Click Me!
 *   </button>
 * );
 */
const useTimeoutButton = (callback: CallbackFunction, delay: number = 2000): [() => void, boolean] => {
  const [isDisabled, setDisabled] = useState<boolean>(false);

  const handleClick = async (...args: any[]): Promise<void> => {
    if (!isDisabled) {
      setDisabled(true);

      await callback(...args);

      setTimeout(() => {
        setDisabled(false);
      }, delay);
    }
  };

  return [handleClick, isDisabled];
};

export { useTimeoutButton }
