const request = require('supertest');
const app = require('../../app');
const generateToken = require('../utils/generateToken');

module.exports = () => {
  it('when authorization header is valid', async () => {
    const token = await generateToken();
    const response = await request(app)
      .get('/user')
      .set('Authorization', token);
    expect(response.status).toBe(200);
    expect(response.body).toHaveProperty('result');
    expect(response.body.result).toEqual('SUCCESS');
    expect(response.body).toHaveProperty('message');
  });

  it('when authorization header is invalid', () => {
    return request(app)
      .get('/user')
      .then((response) => {
        expect(response.status).toBe(401);
        expect(response.text).toEqual('Unauthorized');
      });
  });
};
