const express = require("express");
const router = express.Router();
const { check } = require("express-validator");
const carrentalController = require("../controllers/carrentalController");
const stripe = require("stripe")(process.env.STRIPE_SECRET);

router.get("/carrentals", carrentalController.getAllCarRentals);

router.get("/carrentals/:id", carrentalController.getCarRentalById);

router.put("/carrentals/:id", carrentalController.updateCarRental);

router.delete("/carrentals/:id", carrentalController.deleteCarRental);
router.post("/my-records", carrentalController.GetAllMyRecord);
router.post(
  "/rentcar",
  [
    check("email", "Valid email is required").isEmail(),
    check("car_ID", "end_date is required").notEmpty(),
    check("LicenseNo", "LicenseNo is required").notEmpty(),
    check("CNICNo", "CNICNo is required").notEmpty(),
    check("CITY", "city is required").notEmpty(),
    check("Address", "Area no is required").notEmpty(),
    check("Start_date", "Start_date is required").notEmpty(),
    check("end_date", "end_date is required").notEmpty(),
  ],
  carrentalController.RentingACar
);
router.post("/payment", carrentalController.makePayment);
module.exports = router;
