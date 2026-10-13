import { randomUserMock, additionalUsers } from './FE4U-Lab2-mock.js';

const courses = ['Mathematics', 'Physics', 'English', 'Computer Science', 'Dancing', 'Chess', 'Biology', 'Chemistry', 'Law', 'Art', 'Medicine', 'Statistics'];

function firstLetter(str) {
  return typeof str === 'string' && /^[A-ZА-ЯІЇЄ]/.test(str);
}

function formatUser(user, index) {
  const name = user.full_name || `${user.name?.first || ''} ${user.name?.last || ''}`.trim();
  return {
    gender: user.gender || '',
    title: user.title || user.name?.title || '',
    full_name: name,
    city: user.city || user.location?.city || '',
    state: user.state || user.location?.state || '',
    country: user.country || user.location?.country || '',
    postcode: user.postcode || user.location?.postcode || '',
    coordinates: user.coordinates || user.location?.coordinates || {},
    timezone: user.timezone || user.location?.timezone || {},
    email: user.email || '',
    b_day: user.b_day || user.dob?.date || '',
    age: user.age ?? user.dob?.age ?? 0,
    phone: user.phone || '',
    picture_large: user.picture_large || user.picture?.large || '',
    picture_thumbnail: user.picture_thumbnail || user.picture?.thumbnail || '',
    id: user.id || user.login?.uuid || `user-${index + 1}`,
    favorite: Boolean(user.favorite),
    course: user.course || courses[index % courses.length],
    bg_color: user.bg_color || '#ffffff',
    note: user.note || '',
  };
}

export function formatUsers(users) {
  const result = [];
  const seen = new Set();
  users.forEach((user, index) => {
    const value = formatUser(user, index);
    const key = value.email || value.full_name;
    if (!seen.has(key)) {
      seen.add(key);
      result.push(value);
    }
  });
  return result;
}

export function getUsers() {
  return formatUsers([...randomUserMock, ...additionalUsers]);
}

export function validateUser(user) {
  const textFields = ['full_name', 'gender', 'note', 'state', 'city', 'country'];
  const validText = textFields.every((field) => firstLetter(user[field]));
  const validPhone = /^[+()\d\s-]{7,20}$/.test(user.phone || '');
  const validEmail = typeof user.email === 'string' && user.email.includes('@');
  return validText && typeof user.age === 'number' && validPhone && validEmail;
}

export function filterUsers(users, params = {}) {
  return users.filter((user) => Object.entries(params).every(([key, value]) => value === undefined || value === '' || user[key] === value));
}

export function sortUsers(users, field, descending = false) {
  return [...users].sort((a, b) => {
    const left = a[field];
    const right = b[field];
    const result = typeof left === 'number' ? left - right : String(left).localeCompare(String(right));
    return descending ? -result : result;
  });
}

export function findUser(users, field, value) {
  return users.find((user) => user[field] === value || String(user[field]).toLowerCase().includes(String(value).toLowerCase()));
}

export function percentOf(users, predicate) {
  if (!users.length) return 0;
  return Math.round(users.filter(predicate).length / users.length * 100);
}

if (import.meta.url === `file://${process.argv[1]}`) {
  const users = getUsers();
  console.log(`Users: ${users.length}`);
  console.log('First user:', users[0].full_name);
  console.log('Adults over 30:', percentOf(users, (user) => user.age > 30) + '%');
}
