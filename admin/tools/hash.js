import bcrypt from 'bcrypt';

const hashPassword = async (password) => {
  const hashed = await bcrypt.hash(password, 10);
  console.log("Hashed password:", hashed);
};

hashPassword("admin123");
