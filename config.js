exports.port = process.env.PORT;
exports.dbUrl =
  process.env.DATABASE_URL ||
  'postgres://postgres:postgres@localhost:5432/postgres';
exports.secret = process.env.JWT_SECRET || 'token-para-chat';
exports.adminEmail = process.env.ADMIN_EMAIL || 'admin@localhost';
exports.adminPassword = process.env.ADMIN_PASSWORD || 'chatpassword';
