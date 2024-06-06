const jest=require('jest');
const app = require('../app');
const expect = chai.expect;

chai.use(chaiHttp);

describe('Auth API', () => {
  it('should register a new user', (done) => {
    chai.request(app)
      .post('/auth/signup')
      .send({ username: 'testuser', password: '123456', role: 'user' })
      .end((err, res) => {
        expect(res).to.have.status(201);
        expect(res.body).to.have.property('message', 'User created');
        done();
      });
  });

  it('should login an existing user', (done) => {
    chai.request(app)
      .post('/auth/login')
      .send({ username: 'testuser', password: '123456' })
      .end((err, res) => {
        expect(res).to.have.status(200);
        expect(res.body).to.have.property('token');
        done();
      });
  });

  it('should not login with invalid credentials', (done) => {
    chai.request(app)
      .post('/auth/login')
      .send({ username: 'testuser', password: 'wrongpassword' })
      .end((err, res) => {
        expect(res).to.have.status(401);
        expect(res.body).to.have.property('message', 'Invalid credentials');
        done();
      });
  });
});
