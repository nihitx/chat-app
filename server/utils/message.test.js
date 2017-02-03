var expect = require('expect');

var {generateMessage , generateLocationMessage} = require('./message');

describe('generateMessage', ()=>{
  it('should generate correct message object', ()=> {
    var from = 'Masnad';
    var text = 'Hello world';
    var message = generateMessage(from, text);

    expect(message.createdAt).toBeA('number');
    expect(message).toInclude({from,text});
  });
});

describe('generateLocationMessage', ()=>{
  it('should generate correct location object', ()=> {
    var from = 'World';
    var lat = 1;
    var long = 15;
    var url = 'https://www.google.com/maps?q=1,15';
    var message = generateLocationMessage(from, lat, long);

    expect(message.createdAt).toBeA('number');
    expect(message).toInclude({from,url});
  });
});
