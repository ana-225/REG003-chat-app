exports.port = process.env.PORT;
exports.dbUrl =
  process.env.DATABASE || 'postgres:13-alpine://localhost:27017/test';
exports.secret = process.env.JWT_SECRET || 'token-para-chat';
exports.adminEmail = process.env.ADMIN_EMAIL || 'admin@localhost';
exports.adminPassword = process.env.ADMIN_PASSWORD || 'chatpassword';
