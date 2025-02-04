//import { Loader } from "../components";
import React, { createContext, ReactNode, useContext, useState } from "react";

interface LoadingContextType {
    optionsLoading: OptionsLoadingType
    setOptionsLoading: React.Dispatch<React.SetStateAction<OptionsLoadingType>>
    cerrarLoader: () => void
}

interface Props {
    children: ReactNode
}

interface OptionsLoadingType {
    isLoading: boolean
    textLoading?: string
}

const LoadingContext = createContext<LoadingContextType | null>(null);

export const LoadingProvider = ({ children }: Props) => {
    const [optionsLoading, setOptionsLoading] = useState<OptionsLoadingType>({ isLoading: false });

    const cerrarLoader = (): void => setOptionsLoading({ isLoading: false })

    return (
        <LoadingContext.Provider value={{ optionsLoading, setOptionsLoading, cerrarLoader }}>
            {children}
        </LoadingContext.Provider>
    );
};

export const useLoadingContext = (): LoadingContextType => {
    const context = useContext(LoadingContext)
    if (!context) throw new Error('useLoadingContext debe utilizarse dentro de LoadingProvider.')

    return context;
};
