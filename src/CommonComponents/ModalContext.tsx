import React, { createContext, useState, ReactNode } from 'react';

// Define the context types
interface ModalContextType {
  isModalVisible: boolean;
  toggleModal: () => void;
}

// Declare ModalContext
export const ModalContext = createContext<ModalContextType | undefined>(undefined);

// Create the ModalProvider component
interface ModalProviderProps {
  children: ReactNode;  // Type children as ReactNode to support any valid React child
}

export const ModalProvider = ({ children }: ModalProviderProps) => {
  const [isModalVisible, setModalVisible] = useState<boolean>(false);

  const toggleModal = () => {
    setModalVisible(!isModalVisible);
  };

  return (
    <ModalContext.Provider value={{ isModalVisible, toggleModal }}>
      {children}
    </ModalContext.Provider>
  );
};
