import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { User } from '../../types/user';
import { FormData } from '../../types/form';
import { useFormValidation } from '../../hooks/useFormValidation';
import BasicInfoSection from '../../components/form/BasicInfoSection';
import AddressSection from '../../components/form/AddressSection';
import CompanySection from '../../components/form/CompanySection';
import FormActions from '../../components/form/FormActions';
import './AddUser.css';

const AddUser = () => {
    const navigate = useNavigate();
    const { errors, validateForm, clearError } = useFormValidation();
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [formData, setFormData] = useState<FormData>({
        name: '',
        username: '',
        email: '',
        phone: '',
        website: '',
        street: '',
        suite: '',
        city: '',
        zipcode: '',
        companyName: '',
        catchPhrase: '',
        bs: ''
    });

    const handleInputChange = (field: keyof FormData, value: string) => {
        setFormData(prev => ({ ...prev, [field]: value }));
        
        // Clear error when user starts typing
        if (errors[field]) {
            clearError(field);
        }
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        
        if (!validateForm(formData)) return;

        setIsSubmitting(true);

        // Simulate API call delay
        await new Promise(resolve => setTimeout(resolve, 1000));

        // Create new user object
        const newUser: User = {
            id: Date.now(), // Generate unique ID
            name: formData.name,
            username: formData.username,
            email: formData.email,
            phone: formData.phone,
            website: formData.website,
            address: {
                street: formData.street,
                suite: formData.suite,
                city: formData.city,
                zipcode: formData.zipcode,
                geo: {
                    lat: '0',
                    lng: '0'
                }
            },
            company: {
                name: formData.companyName,
                catchPhrase: formData.catchPhrase,
                bs: formData.bs
            }
        };

        // TODO: Add user to global state (we'll implement this next)
        console.log('New user created:', newUser);

        setIsSubmitting(false);
        
        // Navigate back to user list
        navigate('/');
    };

    const handleCancel = () => {
        navigate('/');
    };

    return (
        <div className="add-user">
            <div className="form-header">
                <h2>Add New User</h2>
            </div>

            <form onSubmit={handleSubmit} className="user-form">
                <BasicInfoSection
                    formData={{
                        name: formData.name,
                        username: formData.username,
                        email: formData.email,
                        phone: formData.phone,
                        website: formData.website
                    }}
                    errors={errors}
                    onChange={handleInputChange}
                />

                <AddressSection
                    formData={{
                        street: formData.street,
                        suite: formData.suite,
                        city: formData.city,
                        zipcode: formData.zipcode
                    }}
                    errors={errors}
                    onChange={handleInputChange}
                />

                <CompanySection
                    formData={{
                        companyName: formData.companyName,
                        catchPhrase: formData.catchPhrase,
                        bs: formData.bs
                    }}
                    errors={errors}
                    onChange={handleInputChange}
                />

                <FormActions
                    onCancel={handleCancel}
                    submitText="Add User"
                    cancelText="Cancel"
                    isSubmitting={isSubmitting}
                />
            </form>
        </div>
    );
};

export default AddUser; 