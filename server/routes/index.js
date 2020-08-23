const routes = require("express").Router();
const calculate = require("../service/gradeCalculate");
const { check, validationResult } = require("express-validator");

// [
//     {
//         name:'math',
//         grade: 80 ,
//         credit: 3
//     }
// ]

routes.post(
  "/",
  [
    check("info", "กรุณากรอกข้อมูลให้ครบถ้วน").isArray().not().isEmpty(),
    check("info.*.score", "กรุณากรอกข้อมูล").isNumeric().not().isEmpty(),
    check("info.*.credit", "กรุณากรอกข้อมูล หรือ หน่วยกิตควรไม่เกิน 3")
      .isNumeric()
      .isIn([1, 1.5, 2, 2.5, 3])
      .not()
      .isEmpty(),
  ],
  (req, res) => {
    const error = validationResult(req);
    if (!error.isEmpty()) {
      return res.status(400).json({ errors: error.array() });
    }

    const { info } = req.body;

    try {
      const calculateGrade = calculate.calculateGrade(info);
      res.status(200).json(calculateGrade);
    } catch (error) {
      res.status(500).send("Server error");
    }
  }
);

module.exports = routes;
