const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");
const User = require("./models/User"); // path sahi se set karna
require("dotenv").config();

mongoose.connect(process.env.MONGO_URL).then(async () => {
  const email = "admin@example.com";
  const password = "admin123";

  const hashedPassword = await bcrypt.hash(password, 10);

  const existingAdmin = await User.findOne({ email });

  if (!existingAdmin) {
    await User.create({
      name: "Admin",
      email,
      password: hashedPassword,
      role: "admin",
    });
    console.log("✅ Admin created");
  } else {
    console.log("⚠️ Admin already exists");
  }

  mongoose.disconnect();
});
