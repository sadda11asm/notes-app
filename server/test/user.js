import chai from 'chai';
import chatHttp from 'chai-http';
import 'chai/register-should';
import app from '../../app';

chai.use(chatHttp);
const { expect } = chai;

describe('Testing the user endpoints:', () => {
    it('It should signup a user', (done) => {
      const user = {
        username: 'antoha',
        password: 'my_pass'
      };
      chai.request(app)
        .post('/api/user/signup')
        .set('Accept', 'application/json')
        .send(user)
        .end((err, res) => {
          expect(res.status).to.equal(201);
          expect(res.body.data).to.include({
            user_id: 1,
            username: user.username
          });
          expect(res.body.data).to.have.keys('token', 'user_id', 'username')
          done();
        });
    });
  
    
  });