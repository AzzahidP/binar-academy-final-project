const request = require('supertest');
const app = require('../../app');
const generateToken = require('../utils/generateToken')
const getExampleUser = require('../utils/getExampleUser')

module.exports = () => {
   it('when authorization header is valid and user id is exist', async () => {
    const user = await getExampleUser();
    const token = await generateToken();
    const response = await request(app).get(`/user/${user.id}`).set('Authorization', token)
    expect(response.status).toBe(200);
    expect(response.body).toHaveProperty('result');
    expect(response.body.result).toEqual('SUCCESS');
    expect(response.body).toHaveProperty('message');
  });

  it('when authorization header is valid but user id is doesnt exist', async () => {
    const token = await generateToken();
    const fakeId = 100;
    const response = await request(app).get(`/user/${fakeId}`).set('Authorization', token)
    expect(response.status).toBe(400);
    expect(response.body).toHaveProperty('result');
    expect(response.body.result).toEqual('FAILED');
    expect(response.body).toHaveProperty('message');
    expect(response.body.message).toEqual(`User with id ${fakeId} doesn't exist`);

  });

  it('when authorization header is valid but user id is wrong', async () => {
    const token = await generateToken();
    const wrongId = 'asdads';
    const response = await request(app).get(`/user/${wrongId}`).set('Authorization', token);
    console.log(response.body)
    expect(response.status).toBe(500);
    expect(response.body).toHaveProperty('message');
    expect(response.body.message).toEqual(`invalid input syntax for integer: \"${wrongId}"`);
  });
  
  
  it('when authorization header is invalid', () => {
    return request(app)
      .get('/user/1')
      .then((response) => {
        expect(response.status).toBe(401);
        expect(response.text).toEqual('Unauthorized');
      });
  });
}