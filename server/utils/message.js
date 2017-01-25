var generateMessage = (from, text)=>{
  return {
    from,
    text,
    createdAt : new Date().getTime(0)
  };
};

module.exports = {generateMessage};
