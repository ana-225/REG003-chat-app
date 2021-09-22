exports.port = process.env.PORT;
exports.dbUrl =
  process.env.DATABASE_URL ||
  'postgres://dnlhmiogrxigiy:d5324e320d3414e761264ed46bc7395ed8b72bbf2ed1eaa45d443aa7e1fe250b@ec2-3-219-111-26.compute-1.amazonaws.com:5432/df2lc0ku3mnad4';
exports.secret = process.env.JWT_SECRET || 'token-para-chat';
exports.adminEmail = process.env.ADMIN_EMAIL || 'admin@localhost';
exports.adminPassword = process.env.ADMIN_PASSWORD || 'chatpassword';
