import assert from 'node:assert/strict';
import { getUsers, formatUsers, validateUser, filterUsers, sortUsers, findUser, percentOf } from './script.js';

const users = getUsers();
assert.ok(users.length > 0);
assert.equal(formatUsers([{ name: { first: 'Test', last: 'User' }, email: 'test@example.com' }, { full_name: 'Test User', email: 'test@example.com' }]).length, 1);
assert.equal(validateUser({ full_name: 'John Doe', gender: 'Male', note: 'Good', state: 'Texas', city: 'Austin', country: 'USA', age: 30, phone: '+1 123 456 7890', email: 'john@example.com' }), true);
assert.equal(filterUsers(users, { gender: 'male' }).every((user) => user.gender === 'male'), true);
assert.equal(sortUsers([{ age: 2 }, { age: 1 }], 'age')[0].age, 1);
assert.equal(findUser(users, 'full_name', users[0].full_name).id, users[0].id);
assert.equal(percentOf([1, 2, 3, 4], (value) => value > 2), 50);
console.log('OK');
