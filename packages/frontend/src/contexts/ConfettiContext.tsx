import React, { createContext, useContext, useCallback, ReactNode  } from 'react';
import confetti from 'canvas-confetti';

interface ConfettiContextProps {
    triggerConfetti: () => void;
}

const ConfettiContext = createContext<ConfettiContextProps | undefined>(undefined);

export const useConfetti = () => {
    const context = useContext(ConfettiContext);
    if (!context) {
        throw new Error("useConfetti must be used within a ConfettiProvider");
    }
    return context;
};

interface ConfettiProviderProps {
  children: ReactNode;
}


export const ConfettiProvider: React.FC<ConfettiProviderProps> = ({ children }) => {
    const triggerConfetti = useCallback(() => {
        confetti({
            particleCount: 100,
            spread: 100,
            origin: { y: 0.6 }
        });
    }, []);

    return (
        <ConfettiContext.Provider value={{ triggerConfetti }}>
            {children}
        </ConfettiContext.Provider>
    );
};
