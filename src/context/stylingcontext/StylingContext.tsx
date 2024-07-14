import React, {createContext, useState} from "react";

/**
 * Context for styling information that must be made available globally in the application.
 */
interface StylingContextProps {
    currentHeadline: string | null;
    setCurrentHeadline: (headline: string | null) => void;
    isLighMode: boolean;
    setIsLightMode: (isLightMode: boolean) => void;
}

const StylingContext = createContext<StylingContextProps | null>(null);

const StylingProvider: React.FC<{ children: React.ReactNode }> = ({children}) => {
    const [currentHeadline, setCurrentHeadline] = useState<string | null>(null);
    const [isLighMode, setIsLightMode] = useState<boolean>(false);

    return (
        <StylingContext.Provider value={{
            currentHeadline,
            setCurrentHeadline,
            isLighMode,
            setIsLightMode
        }}>
            {children}
        </StylingContext.Provider>
    );
};

export {StylingContext, StylingProvider};
