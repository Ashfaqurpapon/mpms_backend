import dotenv from 'dotenv';
import path from 'path';

dotenv.config({ path: path.join((process.cwd(), '.env')) });

export default {
  port: process.env.PORT,
  NODE_ENV: process.env.NODE_ENV,
  database_url: process.env.DATABASE_URL,
  default_password: process.env.DEFAULT_PASS,
  bcrypt_salt_rounds: process.env.BCRYPT_SALT_ROUNDS,

  PAYMENT_URL: process.env.PAYMENT_URL,
  STORE_ID: process.env.STORE_ID,
  SIGNETURE_KEY: process.env.SIGNETURE_KEY,
  PAYMENT_VERIFY_URL: process.env.PAYMENT_VERIFY_URL,

  BASE_API: process.env.BASE_API,
  Frontent_API: process.env.Frontent_API,
  Frontent_API_Home: process.env.Frontent_API_Home,

  /* This key's are used for auth module */
  jwt_access_secret: process.env.JWT_ACCESS_SECRET,
  jwt_refresh_secret: process.env.JWT_REFRESH_SECRET,
  jwt_access_expires_in: process.env.JWT_ACCESS_EXPIRES_IN,
  jwt_refresh_expires_in: process.env.JWT_REFRESH_EXPIRES_IN,
  reset_pass_ui_link: process.env.RESET_PASS_UI_LINK,
  /* This key's are used for auth module */
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME!,
  api_key: process.env.CLOUDINARY_API_KEY!,
  api_secret: process.env.CLOUDINARY_API_SECRET!,
  smtp_email: process.env.SMTP_EMAIL!,
  smtp_password: process.env.SMTP_PASSWORD!,
  admin_email: process.env.ADMIN_EMAIL!,


};


