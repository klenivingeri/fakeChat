const numberIsValid = (msg) => {
    const regexTelefone = /\(?([0-9]{2})\)?[-. ]?([0-9]{4,5})[-. ]?([0-9]{4})/g;
    const numeros = msg.match(regexTelefone);
  
    if (numeros && numeros.length > 0) {
      return true;
    } else {
      return false;
    }
  };



  const validate = {
    numberIsValid: (msg) => {
      const regexTelefone = /\(?([0-9]{2})\)?[-. ]?([0-9]{4,5})[-. ]?([0-9]{4})/g;
      const numeros = msg.match(regexTelefone);
    
      if (numeros && numeros.length > 0) {
        return true;
      } else {
        return false;
      }
    }
  }
  
  export default validate
