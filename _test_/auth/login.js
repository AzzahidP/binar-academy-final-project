const request = require('supertest');
const app = require('../../app');
const getExampleUser = require('../utils/getExampleUser')
  
module.exports = () => {
    it('POST user/login --> when login when user is not found', () => {
        const mockUser = {
            usernameOrEmail: 'wronguser',
            password: 'p4ssword',
        };
        return request(app)
            .post('/user/login')
            .send(mockUser)
            .then((response) => {
                expect(response.status).toBe(400);
                expect(response.body).toEqual('User not found!');
            })
    })

    it('POST user/login --> when login when wrong password',  () => {
        const mockUser = {
            usernameOrEmail: 'user',
            password: 'wrongpassword',
        };
        return request(app)
            .post('/user/login')
            .send(mockUser)
            .then((response) => {
                expect(response.status).toBe(400);
                expect(response.body).toEqual('Wrong password!');
            })
    })
    
    it('POST user/login --> when login request is valid', async () => {
        const user = await getExampleUser()
        const validLoginRequest = {
            usernameOrEmail: user.username,
            password: user.password,
        };
        return request(app)
            .post('/user/login')
            .send(validLoginRequest)
            .then((response) => {
                expect(response.status).toBe(200);
                expect(response.body).toHaveProperty('accessToken');
            })
    })
}