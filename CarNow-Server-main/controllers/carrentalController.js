const asyncHandler = require("express-async-handler");
const CarModel = require("../models/CarModel");

// @desc Get all car rentals
// @route GET /api/carrentals
// @access Public
const getAllCarRentals = asyncHandler(async (req, res) => {
  try {
    const cars = await CarModel.getAllCars();
    res.status(200).json(cars);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal Server Error" });
  }
});

// @desc Get details of a specific car rental by ID
// @route GET /api/carrentals/:id
// @access Public
const getCarRentalById = asyncHandler(async (req, res) => {
  try {
 
    const car = await CarModel.getCarById(req.params.id);

    res.status(200).json(car);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal Server Error" });
  }
});

// @desc Update specific car rental by ID
// @route PUT /api/carrentals/:id
// @access Public
const updateCarRental = asyncHandler(async (req, res) => {
  try {
    const { name, email, contact } = req.body;

    if (!name || !email || !contact) {
      res.status(400).json({ message: "All fields are mandatory!" });
      return;
    }

    const result = await CarModel.updateCarById(req.params.id, req.body);

    res.status(200).json({ message: result });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal Server Error" });
  }
});

// @desc Delete specific car rental by ID
// @route DELETE /api/carrentals/:id
// @access Public
const deleteCarRental = asyncHandler(async (req, res) => {
  try {
    const result = await CarModel.deleteCarById(req.params.id);
    res.status(200).json({ message: result });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal Server Error" });
  }
});

// @desc Rent a car
// @route POST /api/rentcar
// @access Public
const RentingACar = asyncHandler(async (req, res) => {
  console.log(req.body);
  try {
    const result = await CarModel.rentCar(req.body);
    res.status(200).json({ message: result });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal Server Error" });
  }
});

const GetAllMyRecord = asyncHandler(async (req, res) => {
  console.log(req.body);
  try {
    const result = await CarModel.GetAllRecord(req.body);
    res.status(200).json({ message: result });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal Server Error" });
  }
});

const makePayment = asyncHandler(async (req, res) => {
  const {
    car_ID,
    email,
    end_date,
    Start_date,
    address,
    Cnic,
    LicenseNO,
    total_days,
  } = req.body;

  try {
    // Make payment using the Payment model
    const paymentResult = await CarModel.makePayment(
      car_ID,
      email,
      end_date,
      Start_date,
      address,
      Cnic,
      LicenseNO,
      total_days
    );

    res.status(200).json(paymentResult);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

module.exports = {
  getAllCarRentals,
  getCarRentalById,
  updateCarRental,
  deleteCarRental,

  GetAllMyRecord,
  RentingACar,
  makePayment,
};
