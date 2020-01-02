const assert = require('assert');
const should = require('should');
const app = require('../app');
const request = require('supertest');

describe('GET /users', () => {
  it('should return 200 status code', (done) => {
    request(app)
      .get('/users')
      .expect(200)
      .end((err, res) => {
        // console.log(res);
        if (err) throw err;
        done();
      });
  });

  it('should return array', (done) => {
    request(app)
      .get('/users')
      .expect(200)
      .end((err, res) => {
        if (err) {
          throw err;
        }

        res.body.should.be.an.instanceOf(Array).and.have.length(3);
        res.body.map(user => {
          user.should.have.properties('id', 'name');
          user.id.should.be.a.Number();
          user.name.should.be.a.String();
        });
        done();
      })
  })
});

describe('PUT /users/:id', () => {
  it('should return 200 status code', (done) => {
    request(app)
      .put('users/1')
      .send({
        name: 'foo'
      })
      .expect(200)
      .end((err, res) => {
        if (err) {
          throw err;
        }
      });
    done();
  });
});
