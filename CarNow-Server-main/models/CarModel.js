// Sample CarModel.js
const stripe = require("stripe")(process.env.STRIPE_SECRET_KEY);
const connectDB = require("../config/dbconnection");
const moment = require("moment"); // Import the moment library for date handling

class CarModel {
  static async getAllCars() {
    try {
      const connection = await connectDB();
      const [carsRows, fields] = await connection.query("SELECT * FROM cars");

      // Check if end_date is less than the current date
      const currentDate = moment().format("YYYY-MM-DD");

      // Retrieve end_date from rented_car_records for each car
      for (const car of carsRows) {
        const [recordsRows] = await connection.query(
          "SELECT end_date FROM rented_car_records WHERE car_ID = ? ORDER BY end_date DESC LIMIT 1",
          [car.car_id]
        );

        if (recordsRows.length > 0) {
          const latestEndDate = recordsRows[0].end_date;

          if (moment(latestEndDate).isBefore(currentDate)) {
            // Update the availability attribute to 1
            await connection.query(
              "UPDATE cars SET availability = 1 WHERE car_id = ?",
              [car.car_id]
            );
            car.availability = 1; // Update the in-memory object as well
          }
        }
      }

      return carsRows;
    } catch (error) {
      console.error(error);
      throw new Error("Internal Server Error");
    }
  }

  static async getCarById(id) {
    try {
      console.log(id);
      const connection = await connectDB();
      const [rows] = await connection.query("SELECT * FROM cars WHERE id = ?", [
        id,
      ]);

      if (rows.length === 0) {
        throw new Error("Car not found");
      }

      return rows[0];
    } catch (error) {
      console.error(error);
      throw new Error("Internal Server Error");
    }
  }

  static async updateCarById(id, data) {
    try {
      const connection = await connectDB();
      const { name, email, contact } = data;

      if (!name || !email || !contact) {
        throw new Error("All fields are mandatory!");
      }

      await connection.query(
        "UPDATE cars SET name = ?, email = ?, contact = ? WHERE id = ?",
        [name, email, contact, id]
      );

      return `Update car rental for ID ${id}`;
    } catch (error) {
      console.error(error);
      throw new Error("Internal Server Error");
    }
  }

  static async GetAllRecord(email) {
    try {
      const connection = await connectDB();
      const [res] = await connection.query("SELECT * FROM rented_car_records", [
        email,
      ]);
      console.log(res);
      return res;
    } catch (error) {
      console.error(error);
      throw new Error("Internal Server Error");
    }
  }

  static async deleteCarById(id) {
    try {
      const connection = await connectDB();
      await connection.query("DELETE FROM cars WHERE id = ?", [id]);
      return `Delete car rental for ID ${id}`;
    } catch (error) {
      console.error(error);
      throw new Error("Internal Server Error");
    }
  }

  static async rentCar({
    car_ID,
    email,
    end_date,
    Start_date,
    address,
    Cnic,
    LicenseNO,
    total_days,
  }) {
    if (
      !car_ID ||
      !email ||
      !end_date ||
      !Start_date ||
      !address ||
      !Cnic ||
      !LicenseNO ||
      !total_days
    ) {
      throw new Error("All fields are required");
    }

    try {
      const connection = await connectDB();

      // Check if email is already taken
      const [carRows] = await connection.execute(
        "SELECT id, daily_rate, model, color, make, registration_number FROM cars WHERE id = ?",
        [car_ID]
      );

      if (carRows.length === 0) {
        throw new Error("Car not found");
      }

      const {
        id: carId,
        daily_rate,
        model,
        color,
        make,
        registration_number,
      } = carRows[0];

      const [userRows] = await connection.execute(
        "SELECT email FROM user WHERE email = ?",
        [email]
      );

      if (userRows.length === 0) {
        throw new Error("User not found");
      }

      // Insert RENTED_CAR into the database using parameterized query
      const [insertResult] = await connection.execute(
        `INSERT INTO rented_car_records (
        car_ID,
        email,
        end_date,
        Start_date,
        address,
        Cnic,
        LicenseNO,
        total_days,
        price,
        car_model,
        color,
        maker,
        registration_No
      ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`,
        [
          carId,
          email,
          end_date,
          Start_date,
          address,
          Cnic,
          LicenseNO,
          total_days,
          daily_rate * total_days, // calculated price
          model,
          color,
          make,
          registration_number,
        ]
      );

      const updateCarQuery = "UPDATE cars SET availability = ? WHERE id = ?";
      const availabilityValue = 0;
      await connection.execute(updateCarQuery, [availabilityValue, carId]);

      return "Details are inserted!";
    } catch (error) {
      console.error("Internal server error", error);
      throw new Error("Internal server error");
    }
  }

  static async makePayment(
    car_ID,
    email,
    end_date,
    Start_date,
    address,
    Cnic,
    LicenseNO,
    total_days
  ) {
    try {
      // Retrieve car details from the database
      const carDetails = await this.getCarById(car_ID);

      // Create a checkout session with Stripe
      const session = await stripe.checkout.sessions.create({
        payment_method_types: ["card"],
        line_items: [
          {
            price_data: {
              currency: "usd",
              product_data: {
                name: `Renting ${carDetails.model} for ${total_days} days`,
              },
              unit_amount: calculateAmount(total_days, carDetails.daily_rate),
            },
            quantity: 1,
          },
        ],
        mode: "payment",
        // success_url: "YOUR_SUCCESS_URL", // Redirect to this URL after successful payment
        // cancel_url: "YOUR_CANCEL_URL",   // Redirect to this URL if the user cancels the payment
      });

      // Return the session ID instead of the client secret
      return { sessionId: session.id };
    } catch (error) {
      console.error(error);
      throw new Error("Internal Server Error");
    }
  }
}

const calculateAmount = (totalDays, daily_rate) => {
  console.log(totalDays * daily_rate);
  // Simple calculation for the total amount
  return totalDays * daily_rate; // Multiply by 100 to convert to cents (Stripe's currency)
};
module.exports = CarModel;
