import { useState, lazy, Suspense } from 'react';
import { useNavigate } from 'react-router-dom';
import { User } from '../../types/user';
import { FormData } from '../../types/form';
import { useFormValidation } from '../../hooks/useFormValidation';
import { useUserStore } from '../../store/userStore';
import FormActions from '../../components/form/FormActions';
import styles from './AddUser.module.css';

// Lazy load form section components
const BasicInfoSection = lazy(() => import('../../components/form/BasicInfoSection'));
const AddressSection = lazy(() => import('../../components/form/AddressSection'));
const CompanySection = lazy(() => import('../../components/form/CompanySection'));

// Loading component for form sections
const FormSectionLoader = () => (
    <div className={styles.formSectionLoader} role="status" aria-live="polite">
        <div className={styles.loaderSpinner}></div>
        <p className={styles.formSectionLoaderText}>Loading form section...</p>
    </div>
);

const AddUser = () => {
    const navigate = useNavigate();
    const { addUser } = useUserStore();
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
        // Add user to global state
        addUser(newUser);
        setIsSubmitting(false);
        // Navigate back to user list
        navigate('/');
    };

    const handleCancel = () => {
        navigate('/');
    };

    return (
        <div className={`${styles.addUser} ${styles.pageFadeIn}`} role="region" aria-label="Add new user page">
            <div className={styles.headerContainer}>
                <h2 className={styles.headerTitle}>Add New User</h2>
            </div>
            <form 
                onSubmit={handleSubmit} 
                className={styles.userForm}
                aria-label="Add new user form"
                noValidate
            >
                <div role="status" aria-live="polite" className="sr-only">
                    {isSubmitting ? 'Submitting form...' : 'Form ready'}
                </div>
                <Suspense fallback={<FormSectionLoader />}>
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
                </Suspense>
                <Suspense fallback={<FormSectionLoader />}>
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
                </Suspense>
                <Suspense fallback={<FormSectionLoader />}>
                    <CompanySection
                        formData={{
                            companyName: formData.companyName,
                            catchPhrase: formData.catchPhrase,
                            bs: formData.bs
                        }}
                        errors={errors}
                        onChange={handleInputChange}
                    />
                </Suspense>
                {/* Wrap FormActions in a div for grid placement and background */}
                <div className={styles.actionsContainer}>
                    <FormActions
                        onCancel={handleCancel}
                        submitText="Add User"
                        cancelText="Cancel"
                        isSubmitting={isSubmitting}
                    />
                </div>
            </form>
        </div>
    );
};

export default AddUser; 