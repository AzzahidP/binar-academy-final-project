const app = require('../../app');
const request = require('supertest');

module.exports = () => {
    it('POST /user/register --> return 400 when signup request is invalid', () => {
        return request(app)
            .post('/user/register')
            .send({
                username: 'user',
                password: 'p4ssword',
                firstname: 'user',
                lastname: 'test',
                city: 'ny',
                bio: 'test',
            })
            .then((response) => {
                expect(response.status).toBe(400);
                expect(response.body.message).toBe('Fields cannot be empty');
            })
    })

    it('POST /user/register --> return 200 when signup request is valid', () => {
        return request(app)
            .post('/user/register')
            .send({
                username: 'user',
                email: 'user1@gmail.com',
                password: 'p4ssword',
                firstname: 'user',
                lastname: 'test',
                city: 'ny',
                bio: 'test',
            })
            .then((response) => {
                console.log(response.body)
                expect(response.status).toBe(201);
                expect(response.body.message).toEqual('User successfully created!');
            })
    })
}

