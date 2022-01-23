const isApiWorking = require('./api/isApiWorking');
const register = require ('./user/register')
const login = require('./auth/login');
const getUsers = require('./user/getUsers')
const getUserById = require('./user/getUserById')
const updateUser = require('./user/update')

describe('Test is api working', isApiWorking);
describe('Test User Registration', register);
describe('Test user login', login);
describe('Test get all of users', getUsers);
describe('Test get spesific user by user id', getUserById);
describe('Test update user data', updateUser);
