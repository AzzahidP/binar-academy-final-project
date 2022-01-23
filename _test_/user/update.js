const app = require('../../app');
const request = require('supertest');
const generateToken = require('../utils/generateToken')
const getExampleUser = require('../utils/getExampleUser')

module.exports = () => {
    it('PUT /user/update --> return 400 when update request is invalid', async () => {
        const token = await generateToken();
        return request(app)
            .put('/user/update')
            .set('Authorization', token)
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

    it('POST /user/update --> return 200 when update request is valid', async () => {
        const token = await generateToken();
        return request(app)
            .put('/user/update')
            .set('Authorization', token)
            .send({
                username: 'user',
                email: 'user2@gmail.com',
                password: 'p4ssword',
                firstname: 'user',
                lastname: 'test',
                city: 'ny',
                bio: 'test',
            })
            .then((response) => {
                expect(response.status).toBe(200);
                expect(response.body).toHaveProperty('message');
                expect(response.body.message).toEqual('SUCCESS');
                expect(response.body).toHaveProperty('updatedUser');
            })
    })
};

