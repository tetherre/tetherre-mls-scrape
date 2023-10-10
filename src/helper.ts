const removeSymbols = (string) => {
    return string.replace(/[!-\/:-@[-`{-~]/g, "");
  };
  
  export { removeSymbols };
  