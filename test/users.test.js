const request = require('supertest');

const app = require('../src/app');

test('retorna un json', async () => {
  await request(app).get('/users').expect(200).expect('Content-Type', /json/);
});

test('retorna status 204', (done) => {
  request(app)
    .post('/users')
    .send({
      name: 'nuevousuario6',
      email: 'nuevousuario6@gmail.com',
      password: 'password',
    })
    .set('Accept', 'application/json')
    .expect(204)
    .end((err, res) => {
      if (err) return done(err);
      return done();
    });
});
