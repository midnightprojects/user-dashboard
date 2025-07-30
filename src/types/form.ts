export interface FormData {
    name: string;
    username: string;
    email: string;
    phone: string;
    website: string;
    street: string;
    suite: string;
    city: string;
    zipcode: string;
    companyName: string;
    catchPhrase: string;
    bs: string;
}

export interface FormErrors {
    [key: string]: string;
}

export interface BasicInfoFormData {
    name: string;
    username: string;
    email: string;
    phone: string;
    website: string;
}

export interface AddressFormData {
    street: string;
    suite: string;
    city: string;
    zipcode: string;
}

export interface CompanyFormData {
    companyName: string;
    catchPhrase: string;
    bs: string;
} 