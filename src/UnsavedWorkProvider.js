import React, { createContext, useContext, useState } from 'react';
import styled from 'styled-components';
import { AlertTriangle, Save, X } from 'lucide-react';

const UnsavedWorkContext = createContext();

export const useUnsavedWork = () => {
  const context = useContext(UnsavedWorkContext);
  if (!context) {
    throw new Error('useUnsavedWork must be used within UnsavedWorkProvider');
  }
  return context;
};

// Styled Components for Modal
const ModalOverlay = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(0, 0, 0, 0.7);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 10000;
`;

const ModalContent = styled.div`
  background: white;
  border-radius: 15px;
  padding: 30px;
  max-width: 500px;
  width: 90%;
  text-align: center;
  box-shadow: 0 20px 60px rgba(0, 0, 0, 0.3);
`;

const ModalIcon = styled.div`
  width: 80px;
  height: 80px;
  border-radius: 50%;
  background: linear-gradient(135deg, #FF9800, #F57C00);
  display: flex;
  align-items: center;
  justify-content: center;
  margin: 0 auto 20px;
  color: white;
`;

const ModalTitle = styled.h2`
  color: #333;
  margin-bottom: 15px;
  font-size: 24px;
`;

const ModalMessage = styled.p`
  color: #666;
  margin-bottom: 30px;
  font-size: 16px;
  line-height: 1.5;
`;

const ModalButtons = styled.div`
  display: flex;
  gap: 15px;
  justify-content: center;
`;

const ModalButton = styled.button`
  padding: 12px 24px;
  border-radius: 8px;
  border: none;
  font-size: 14px;
  font-weight: bold;
  cursor: pointer;
  transition: all 0.3s ease;
  display: flex;
  align-items: center;
  gap: 8px;
  
  ${props => props.primary ? `
    background: linear-gradient(135deg, #4CAF50, #45a049);
    color: white;
    
    &:hover {
      background: linear-gradient(135deg, #45a049, #4CAF50);
      transform: translateY(-2px);
    }
  ` : props.danger ? `
    background: linear-gradient(135deg, #f44336, #d32f2f);
    color: white;
    
    &:hover {
      background: linear-gradient(135deg, #d32f2f, #f44336);
      transform: translateY(-2px);
    }
  ` : `
    background: #f5f5f5;
    color: #333;
    
    &:hover {
      background: #e0e0e0;
      transform: translateY(-2px);
    }
  `}
`;

export const UnsavedWorkProvider = ({ children }) => {
  const [hasUnsavedWork, setHasUnsavedWork] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [pendingAction, setPendingAction] = useState(null);
  const [workContext, setWorkContext] = useState('');

  const markAsUnsaved = (context = 'your work') => {
    setHasUnsavedWork(true);
    setWorkContext(context);
  };

  const markAsSaved = () => {
    setHasUnsavedWork(false);
    setWorkContext('');
  };

  const confirmNavigation = (action, context = 'your current work') => {
    if (hasUnsavedWork) {
      setWorkContext(context);
      setPendingAction(action);
      setShowModal(true);
      return false; // Prevent navigation
    } else {
      action();
      return true; // Allow navigation
    }
  };

  const handleContinueWithoutSaving = () => {
    setHasUnsavedWork(false);
    setShowModal(false);
    if (pendingAction) {
      pendingAction();
    }
    setPendingAction(null);
    setWorkContext('');
  };

  const handleCancel = () => {
    setShowModal(false);
    setPendingAction(null);
  };

  const value = {
    hasUnsavedWork,
    markAsUnsaved,
    markAsSaved,
    confirmNavigation,
    workContext
  };

  return (
    <UnsavedWorkContext.Provider value={value}>
      {children}
      
      {showModal && (
        <ModalOverlay>
          <ModalContent>
            <ModalIcon>
              <AlertTriangle size={40} />
            </ModalIcon>
            
            <ModalTitle>Unsaved Changes</ModalTitle>
            
            <ModalMessage>
              You have unsaved changes in {workContext}. If you leave this page, your work will be lost.
              <br /><br />
              <strong>Do you want to continue without saving?</strong>
            </ModalMessage>
            
            <ModalButtons>
              <ModalButton onClick={handleCancel}>
                <Save size={16} />
                Stay & Save
              </ModalButton>
              
              <ModalButton danger onClick={handleContinueWithoutSaving}>
                <X size={16} />
                Leave Without Saving
              </ModalButton>
            </ModalButtons>
          </ModalContent>
        </ModalOverlay>
      )}
    </UnsavedWorkContext.Provider>
  );
};

export default UnsavedWorkProvider;