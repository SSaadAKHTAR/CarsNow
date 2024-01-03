const mysql = require("mysql2/promise");

const connectDB = async () => {
  try {
    const connection = await mysql.createConnection({
      host: 'localhost',
      user: 'kinza',
      password: '1234',
      database: 'carnow'
    });

    console.log("Mysql connection SUCCESS");
    

    return connection;
  } catch (error) {
    console.error("Mysql connection FAIL", error);
    throw error;
  }
};

module.exports = connectDB;
