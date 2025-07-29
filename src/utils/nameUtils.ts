const TITLES = ['mr.', 'mrs.', 'ms.', 'miss', 'dr.', 'prof.', 'sir', 'madam', 'lord', 'lady'];

export const formatName = (fullName: string): string => {
    // Remove titles and clean up the name
    let cleanName = fullName.trim();
    
    // Remove titles (case insensitive)
    for (const title of TITLES) {
        const titleRegex = new RegExp(`^${title}\\.?\\s+`, 'i');
        cleanName = cleanName.replace(titleRegex, '');
    }
    
    const nameParts = cleanName.split(' ').filter(part => part.length > 0);
    
    if (nameParts.length === 1) {
        return nameParts[0];
    }
    
    if (nameParts.length === 2) {
        return `${nameParts[1]}, ${nameParts[0]}`;
    }
    
    // For names with more than 2 parts, check if the last part is a Roman numeral
    const lastPart = nameParts[nameParts.length - 1];
    const isRomanNumeral = /^[IVX]+$/.test(lastPart);
    
    if (isRomanNumeral) {
        // If last part is a Roman numeral, treat the second-to-last as last name
        const firstName = nameParts.slice(0, -2).join(' ');
        const lastName = nameParts[nameParts.length - 2];
        const romanNumeral = lastPart;
        
        return `${lastName}, ${firstName} ${romanNumeral}`;
    } else {
        // If last part is not a Roman numeral, treat it as last name
        const firstName = nameParts.slice(0, -1).join(' ');
        const lastName = lastPart;
        
        return `${lastName}, ${firstName}`;
    }
}; 