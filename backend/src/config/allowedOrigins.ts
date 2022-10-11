/**
 * Whitelist for cors origin policy URLs
 */

const allowedOrigins = [
  `${process.env.HOST}:${process.env.PORT}`,
  `${process.env.BASE_URL}:${process.env.PORT}`,
  'http://localhost:3000',
];

export default allowedOrigins;
