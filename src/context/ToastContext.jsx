import { createContext, useContext, useState, useCallback } from 'react';
import { v4 as uuid } from 'uuid';

const ToastContext = createContext();

export const useToast = () => useContext(ToastContext);

export function ToastProvider({ children }) {
  const [toasts, setToasts] = useState([]);

  const addToast = useCallback(({ message, type }) => {
    const id = uuid();
    setToasts((all) => [...all, { id, message, type }]);
    // auto-remove after 3s
    setTimeout(() => {
      setToasts((all) => all.filter((t) => t.id !== id));
    }, 3000);
  }, []);

  return (
    <ToastContext.Provider value={{ addToast }}>
      {children}

      {/* Container fixed centered below header */}
      <div className="fixed top-16 left-1/2 transform -translate-x-1/2 flex flex-col space-y-2 z-50">
        {toasts.map(({ id, message, type }) => (
          <div
            key={id}
            className={`
              px-4 py-2 rounded-lg shadow-lg
              ${type === 'success' ? 'bg-teal text-parchment' : 'bg-rust text-parchment'}
              animate-slide-in
            `}
          >
            {message}
          </div>
        ))}
      </div>
    </ToastContext.Provider>
  );
}