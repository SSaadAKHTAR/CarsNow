// models/User.js

const connectDB = require("../config/dbconnection");

class UserModel {
  async registerUser(
    FirstName,
    LastName,
    Email,
    Phone,
    Address,
    DateOfBirth,
    DriverLicenseNumber,
    PasswordHash
  ) {
    try {
      const connection = await connectDB();

      // Check if email is already taken
      const [existingUser] = await connection.execute(
        "SELECT email FROM users WHERE email = ?",
        [Email]
      );

      if (existingUser.length > 0) {
        return { error: "Email is taken" };
      }

      // Insert user into the database
      const [insertResult] = await connection.execute(
        "INSERT INTO user (FirstName, LastName, Email, Phone, Address, DateOfBirth, DriverLicenseNumber, PasswordHash) VALUES (?, ?, ?, ?, ?, ?,?,?)",
        [
          FirstName,
          LastName,
          Email,
          Phone,
          Address,
          DateOfBirth,
          DriverLicenseNumber,
          PasswordHash,
        ]
      );

      return { message: "User registered!" };
    } catch (error) {
      console.error("Internal server error", error);
      return { error: "Internal server error" };
    }
  }

  async loginUser(email, password) {
    try {
      const connection = await connectDB();

      // Query for user login
      const [results] = await connection.execute(
        "SELECT * FROM users WHERE Email = ? AND PasswordHash = ?",
        [email, password]
      );

      // Check if the user exists
      if (results.length === 0) {
        return { error: "Invalid credentials" };
      }

      return { user: results[0] };
    } catch (error) {
      console.error("Internal server error", error);
      return { error: "Internal server error" };
    }
  }
}

module.exports = UserModel;
