import io from 'socket.io-client';
import chai from 'chai';

const expect = chai.expect;
const should = chai.should();
const PORT = process.env.PORT;
const socketURL = `http://127.0.0.1:${PORT}`;
const options = {
  trasports: ['websocket'],
  'force new connection': true
};

describe('chat server', () => {
  it('should broadcast to all connected users when new user connect', (done) => {
    let client1 = io.connect(socketURL, options);
    
    client1.on('connect', (data) => {
      
      // connect second connection
      let client2 = io.connect(socketURL, options);

      client2.on('connect', (data) => {

      });

      client2.on('join', (data) => {
        expect(data).to.be.a('object');
        expect(data.message).to.be.equal('new guy joined');
        client2.disconnect();
      });
    });

    let numbers = 0;

    client1.on('join', (data) => {
      numbers++;

      // check 2 new users joined
      if (numbers == 2) {
        expect(data).to.be.a('object');
        expect(data.message).to.be.equal('new guy joined');
        client1.disconnect();
        done();
      }
    });
  });
}); 