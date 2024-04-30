const numberIsValid = (msg) => {
    const regexTelefone = /\(?([0-9]{2})\)?[-. ]?([0-9]{4,5})[-. ]?([0-9]{4})/g;
  
    const numeros = msg.match(regexTelefone);
  
    if (numeros && numeros.length > 0) {
      console.log("Números de telefone encontrados na mensagem:");
      return true;
    } else {
      console.log("Nenhum número de telefone encontrado na mensagem.");
      return false;
    }
  };

  export default numberIsValid