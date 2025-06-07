import React from "react";

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  title?: string;
  children: React.ReactNode;
}

const Modal: React.FC<ModalProps> = ({ isOpen, onClose, title, children }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
      <div className="bg-white rounded-lg shadow-lg max-w-3xl w-full p-[10px] relative max-h-[80vh] overflow-y-auto">
        <button
          onClick={onClose}
          className="m-4 absolute top-2 right-2 text-gray-500 hover:text-red-500 text-2xl font-bold"
          aria-label="Fechar"
        >
          &times;
        </button>
        {title && <h2 className="text-xl font-bold mb-4 text-blue-800">{title}</h2>}
        <div>{children}</div>
      </div>
    </div>
  );
};

export default Modal;
