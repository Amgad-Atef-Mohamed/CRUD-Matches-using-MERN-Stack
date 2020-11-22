module.exports = {
  "port": process.env.PORT || 1337,
  "database": {
    "name": "real-time-chat",
    "host": process.env.MONGO_HOST || "localhost",
    "port": process.env.MONGO_PORT || 27017,
    "user": process.env.MONGO_USER || '',
    "pw": process.env.MONGO_PASS || ''
  },
  mongoose: {
    debug: true,
    autoIndex: true
  },
  frontEndOrigin: process.env.FRONT_END_ORIGIN || 'http://127.0.0.1:3000',
  TTL_FOR_OTP: 120,
  JWT: {
    SECRET: process.env.JWT_SECRET_KEY || 'TEST',
    TTL: 86400000 // 1day in milliseconds
  },
};
