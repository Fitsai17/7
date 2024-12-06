const autocannon = require('autocannon');

const instance = autocannon({
  url: 'http://localhost:3001/api/auth/login',
  connections: 10,
  duration: 10,
});

autocannon.track(instance);
