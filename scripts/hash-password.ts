// Prints an ADMIN_PASSWORD_HASH value. Usage: npm run admin:hash-password -- "your password"
import { hashPassword } from "../lib/password";

const password = process.argv[2];
if (!password || password.length < 12) {
  console.error("Pass a password of at least 12 characters: npm run admin:hash-password -- \"...\"");
  process.exit(1);
}
console.log(`ADMIN_PASSWORD_HASH=${hashPassword(password)}`);
