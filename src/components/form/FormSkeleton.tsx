import React from 'react';
import FormSection from './FormSection';
import FormRow from './FormRow';
import styles from './FormSkeleton.module.css';

const FormSkeleton: React.FC = () => {
    return (
        <>
            {/* Basic Info Section Skeleton */}
            <FormSection title="Basic Information" id="basic-info">
                <FormRow>
                    <div className={styles.fieldSkeleton}></div>
                    <div className={styles.fieldSkeleton}></div>
                </FormRow>
                <FormRow>
                    <div className={styles.fieldSkeleton}></div>
                    <div className={styles.fieldSkeleton}></div>
                </FormRow>
                <div className={styles.fieldSkeleton}></div>
            </FormSection>

            {/* Address Section Skeleton */}
            <FormSection title="Address" id="address">
                <FormRow>
                    <div className={styles.fieldSkeleton}></div>
                    <div className={styles.fieldSkeleton}></div>
                </FormRow>
                <FormRow>
                    <div className={styles.fieldSkeleton}></div>
                    <div className={styles.fieldSkeleton}></div>
                </FormRow>
            </FormSection>

            {/* Company Section Skeleton */}
            <FormSection title="Company" id="company">
                <div className={styles.companyFields}>
                    <div className={styles.fieldSkeleton}></div>
                    <div className={styles.fieldSkeleton}></div>
                    <div className={styles.fieldSkeleton}></div>
                </div>
            </FormSection>
        </>
    );
};

export default FormSkeleton; 