import React from 'react';
import FormSection from './FormSection';
import FormRow from './FormRow';
import FormField from './FormField';
import { AddressFormData } from '../../types/form';

interface Props {
    formData: AddressFormData;
    errors: { [key: string]: string };
    onChange: (field: keyof AddressFormData, value: string) => void;
}

const AddressSection: React.FC<Props> = ({ formData, errors, onChange }) => {
    return (
        <FormSection title="Address" id="address">
            <FormRow>
                <FormField
                    label="Street"
                    id="street"
                    type="text"
                    value={formData.street}
                    onChange={(value) => onChange('street', value)}
                    error={errors.street}
                    required
                />
                <FormField
                    label="Suite"
                    id="suite"
                    type="text"
                    value={formData.suite}
                    onChange={(value) => onChange('suite', value)}
                />
            </FormRow>

            <FormRow>
                <FormField
                    label="City"
                    id="city"
                    type="text"
                    value={formData.city}
                    onChange={(value) => onChange('city', value)}
                    error={errors.city}
                    required
                />
                <FormField
                    label="Zipcode"
                    id="zipcode"
                    type="text"
                    value={formData.zipcode}
                    onChange={(value) => onChange('zipcode', value)}
                    error={errors.zipcode}
                    required
                />
            </FormRow>
        </FormSection>
    );
};

export default AddressSection; 