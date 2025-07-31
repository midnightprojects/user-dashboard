import React, { useEffect, useRef } from 'react';
import { User } from '../../types/user';
import styles from './Modal.module.css';

interface Props {
    isOpen: boolean;
    onClose: () => void;
    user: User | null;
}

const Modal = ({ isOpen, onClose, user }: Props) => {
    const modalRef = useRef<HTMLDivElement>(null);
    const closeButtonRef = useRef<HTMLButtonElement>(null);

    useEffect(() => {
        if (isOpen) {
            // Focus the close button when modal opens
            closeButtonRef.current?.focus();
            
            // Prevent body scroll
            document.body.style.overflow = 'hidden';
            
            // Handle escape key
            const handleEscape = (e: KeyboardEvent) => {
                if (e.key === 'Escape') {
                    onClose();
                }
            };
            
            document.addEventListener('keydown', handleEscape);
            
            return () => {
                document.removeEventListener('keydown', handleEscape);
                document.body.style.overflow = 'unset';
            };
        }
    }, [isOpen, onClose]);

    const handleOverlayClick = (e: React.MouseEvent) => {
        if (e.target === e.currentTarget) {
            onClose();
        }
    };

    return (
        <div 
            className={`${styles.modalOverlay} ${isOpen ? styles.show : ''}`} 
            onClick={handleOverlayClick}
            role="dialog"
            aria-modal="true"
            aria-labelledby="modal-title"
            aria-describedby="modal-content"
        >
            <div 
                className={styles.modalContent} 
                onClick={(e) => e.stopPropagation()}
                ref={modalRef}
                role="document"
            >
                <div className={styles.modalHeader}>
                    <h3 id="modal-title">User Details</h3>
                    <button 
                        className={styles.modalClose} 
                        onClick={onClose}
                        ref={closeButtonRef}
                        aria-label="Close modal"
                        type="button"
                    >
                        ×
                    </button>
                </div>
                
                <div className={styles.modalBody} id="modal-content">
                    {user && (
                        <div className={styles.userDetails}>
                            <div className={styles.detailSection}>
                                <h4>Basic Information</h4>
                                <dl>
                                    <dt>Name:</dt>
                                    <dd>{user.name}</dd>
                                    <dt>Username:</dt>
                                    <dd>{user.username}</dd>
                                    <dt>Email:</dt>
                                    <dd><a href={`mailto:${user.email}`}>{user.email}</a></dd>
                                    <dt>Phone:</dt>
                                    <dd><a href={`tel:${user.phone}`}>{user.phone}</a></dd>
                                    <dt>Website:</dt>
                                    <dd><a href={user.website} target="_blank" rel="noopener noreferrer">{user.website}</a></dd>
                                </dl>
                            </div>
                            
                            <div className={styles.detailSection}>
                                <h4>Address</h4>
                                <dl>
                                    <dt>Street:</dt>
                                    <dd>{user.address.street}</dd>
                                    <dt>Suite:</dt>
                                    <dd>{user.address.suite}</dd>
                                    <dt>City:</dt>
                                    <dd>{user.address.city}</dd>
                                    <dt>Zipcode:</dt>
                                    <dd>{user.address.zipcode}</dd>
                                </dl>
                            </div>
                            
                            <div className={styles.detailSection}>
                                <h4>Company</h4>
                                <dl>
                                    <dt>Name:</dt>
                                    <dd>{user.company.name}</dd>
                                    <dt>Catch Phrase:</dt>
                                    <dd>{user.company.catchPhrase}</dd>
                                    <dt>Business:</dt>
                                    <dd>{user.company.bs}</dd>
                                </dl>
                            </div>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};

export default Modal; 