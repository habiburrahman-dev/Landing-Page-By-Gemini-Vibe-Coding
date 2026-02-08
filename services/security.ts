
import bcrypt from 'bcryptjs';

// The specific salt key requested.
// In bcrypt context, we use this as a "pepper" appended to the password 
// before hashing, ensuring that specific key is part of the security architecture.
const SALT_KEY_PEPPER = "kmm_skw";

/**
 * Hashes a password using bcrypt and the specific salt key (pepper).
 * @param plainPassword The plain text password
 * @returns The encrypted bcrypt string
 */
export const hashPassword = (plainPassword: string): string => {
  // We append the salt key to the password
  const secret = plainPassword + SALT_KEY_PEPPER;
  // Generate a standard bcrypt hash (synchronously for localstorage simplicity)
  const salt = bcrypt.genSaltSync(12);
  return bcrypt.hashSync(secret, salt);
};

/**
 * Verifies a plain password against the stored bcrypt hash.
 * @param plainPassword Input password
 * @param hashedPassword Stored encrypted password
 * @returns true if valid
 */
export const verifyPassword = (plainPassword: string, hashedPassword: string): boolean => {
  const secret = plainPassword + SALT_KEY_PEPPER;
  return bcrypt.compareSync(secret, hashedPassword);
};
