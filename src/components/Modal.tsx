import React from 'react';
import { IoClose } from 'react-icons/io5';
import { IconContext } from 'react-icons';

interface ModalProps {
    isVisible: boolean;
    onClose: any;
    children: any;
}

const Modal: React.FC<ModalProps> = (props: ModalProps) => {
    const { isVisible, onClose, children } = props;
    if (!isVisible) return null;

    const handleClose = (e: any) => {
        if (e.target.id === 'wrapper' || e.target.id === 'btnClose') {
            onClose();
        }
    };

    return (
        <div
            id="wrapper"
            onClick={handleClose}
            className="fixed inset-0 bg-black bg-opacity-25 backdrop-blur-sm flex justify-center items-center"
        >
            <div className="w-[600px] max-sm:w-[400px] flex flex-col">
                <button
                    id="btnClose"
                    onClick={handleClose}
                    className="text-[#252525] text-[22px] font-bold place-self-end"
                >
                    {/* <IconContext.Provider
                        value={{
                            size: '26px',
                            color: '#252525',
                            className: 'font-bold',
                        }}
                    >
                        <IoClose id="btnClose" />
                    </IconContext.Provider> */}
                    X
                </button>
                <div className="bg-white p-[32px] max-sm:p-[24px] rounded">{children}</div>
            </div>
        </div>
    );
};

export default Modal;
