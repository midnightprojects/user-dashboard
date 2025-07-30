import React from 'react';
import { User } from '../../types/user';
import './Modal.css';

interface Props {
    isOpen: boolean;
    onClose: () => void;
    user: User | null;
}

const Modal = ({ isOpen, onClose, user }: Props) => {
    const shouldShow = isOpen && user;

    return (
        <div 
            className={`modal-overlay ${shouldShow ? 'show' : ''}`} 
            onClick={onClose}
        >
            {user && (
                <div className="modal-content" onClick={(e) => e.stopPropagation()}>
                    <div className="modal-header">
                        <h3>User Details</h3>
                        <button className="modal-close" onClick={onClose}>
                            ×
                        </button>
                    </div>
                    
                    <div className="modal-body">
                        <div className="user-details">
                            <div className="detail-section">
                                <h4>Basic Information</h4>
                                <p><strong>Name:</strong> {user.name}</p>
                                <p><strong>Username:</strong> {user.username}</p>
                                <p><strong>Email:</strong> {user.email}</p>
                                <p><strong>Phone:</strong> {user.phone}</p>
                                <p><strong>Website:</strong> {user.website}</p>
                            </div>
                            
                            <div className="detail-section">
                                <h4>Address</h4>
                                <p><strong>Street:</strong> {user.address.street}</p>
                                <p><strong>Suite:</strong> {user.address.suite}</p>
                                <p><strong>City:</strong> {user.address.city}</p>
                                <p><strong>Zipcode:</strong> {user.address.zipcode}</p>
                            </div>
                            
                            <div className="detail-section">
                                <h4>Company</h4>
                                <p><strong>Name:</strong> {user.company.name}</p>
                                <p><strong>Catch Phrase:</strong> {user.company.catchPhrase}</p>
                                <p><strong>Business:</strong> {user.company.bs}</p>
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default Modal; 