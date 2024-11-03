export const formatDate = (dateString)=> {
    const date = new Date(dateString);
    const day = String(date.getDate()).padStart(2, "0");
    const month = String(date.getMonth() + 1).padStart(2, "0"); // Months are 0-based
    const year = date.getFullYear();
    return `${day}/${month}/${year}`;
  }


  export const formatPhoneNumber = (phoneNumber) => {
    const cleaned = phoneNumber.replace(/[^+\d]/g, "");
  
    const hasCountryCode = cleaned.startsWith("+");
  
    const normalized = hasCountryCode ? cleaned.slice(1) : cleaned;
  
    let match;
    
    if (normalized.length === 11) {
      // For 11 digits, use +(0X) where X is the first digit of the normalized number
      const dynamicCode = `0${normalized.charAt(0)}`;
      match = normalized.match(/(\d{1})(\d{3})(\d{3})(\d{2})(\d{2})/);
      if (match) {
        return `+(${dynamicCode}) ${match[2]} ${match[3]} ${match[4]} ${match[5]}`;
      }
    } else if (normalized.length === 12) {
      // For 12 digits, use the actual country code (first two digits)
      match = normalized.match(/(\d{2})(\d{3})(\d{3})(\d{2})(\d{2})/);
      if (match) {
        return `+(${match[1]}) ${match[2]} ${match[3]} ${match[4]} ${match[5]}`;
      }
    }
  
    return phoneNumber;
  };
  
  