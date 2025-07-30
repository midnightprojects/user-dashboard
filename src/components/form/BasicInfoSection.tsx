import React from 'react';
import FormSection from './FormSection';
import FormRow from './FormRow';
import FormField from './FormField';
import { BasicInfoFormData } from '../../types/form';

interface Props {
    formData: BasicInfoFormData;
    errors: { [key: string]: string };
    onChange: (field: keyof BasicInfoFormData, value: string) => void;
}

const BasicInfoSection: React.FC<Props> = ({ formData, errors, onChange }) => {
    return (
        <FormSection title="Basic Information">
            <FormRow>
                <FormField
                    label="Full Name"
                    id="name"
                    type="text"
                    value={formData.name}
                    onChange={(value) => onChange('name', value)}
                    error={errors.name}
                    required
                />
                <FormField
                    label="Username"
                    id="username"
                    type="text"
                    value={formData.username}
                    onChange={(value) => onChange('username', value)}
                    error={errors.username}
                    required
                />
            </FormRow>

            <FormRow>
                <FormField
                    label="Email"
                    id="email"
                    type="email"
                    value={formData.email}
                    onChange={(value) => onChange('email', value)}
                    error={errors.email}
                    required
                />
                <FormField
                    label="Phone"
                    id="phone"
                    type="tel"
                    value={formData.phone}
                    onChange={(value) => onChange('phone', value)}
                    error={errors.phone}
                    required
                />
            </FormRow>

            <FormField
                label="Website"
                id="website"
                type="url"
                value={formData.website}
                onChange={(value) => onChange('website', value)}
                error={errors.website}
                placeholder="https://example.com"
            />
        </FormSection>
    );
};

export default BasicInfoSection; 