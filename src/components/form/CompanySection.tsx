import React from 'react';
import FormSection from './FormSection';
import FormField from './FormField';
import { CompanyFormData } from '../../types/form';
import './CompanySection.css';

interface Props {
    formData: CompanyFormData;
    errors: { [key: string]: string };
    onChange: (field: keyof CompanyFormData, value: string) => void;
}

const CompanySection: React.FC<Props> = ({ formData, errors, onChange }) => {
    return (
        <FormSection title="Company">
            <div className="company-fields">
                <FormField
                    label="Company Name"
                    id="companyName"
                    type="text"
                    value={formData.companyName}
                    onChange={(value) => onChange('companyName', value)}
                    error={errors.companyName}
                    required
                />

                <FormField
                    label="Catch Phrase"
                    id="catchPhrase"
                    type="text"
                    value={formData.catchPhrase}
                    onChange={(value) => onChange('catchPhrase', value)}
                />

                <FormField
                    label="Business"
                    id="bs"
                    type="text"
                    value={formData.bs}
                    onChange={(value) => onChange('bs', value)}
                />
            </div>
        </FormSection>
    );
};

export default CompanySection; 