const app = require('../../app');
const request = require('supertest');

module.exports =  () => { 
  it('GET /test --> is api working', () => {
    return request(app)
      .get('/')
      .expect('Content-Type', /json/)
      .expect(200)
      .then((response) => {
        expect(response.body).toEqual('API IS WORKING!');
      });
  });
}

