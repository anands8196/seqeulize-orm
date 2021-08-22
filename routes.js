const express = require("express");
const router = express.Router();

const Sequelize = require("sequelize");

const sequelize = new Sequelize("nodejs-orm-test", "root", "12345678", {
  host: "localhost",
  dialect: "mysql",
});
sequelize
  .authenticate()
  .then(function (success) {
    console.log("DB connected");
  })
  .catch(function (err) {
    console.log("error in DB connect", err);
  });

//model

var User = sequelize.define(
  "tbl_user",
  {
    id: {
      type: Sequelize.INTEGER,
      allowNull: false,
      primaryKey: true,
      autoIncrement: true,
    },
    name: {
      type: Sequelize.STRING,
      allowNull: false,
    },
    email: {
      type: Sequelize.STRING,
    },
    rollNo: {
      type: Sequelize.INTEGER,
    },
    status: {
      type: Sequelize.ENUM("1", "0"),
      defaultValue: "1",
    },
  },
  {
    modelName: "User",
  }
);

//sync model
sequelize.sync();

//create some data to table
router.post("/user", function (req, res) {
  //test values
  // User.create({
  //   name: "Anand",
  //   email: "anand@test.com",
  //   rollNo: 7,
  //   status: 1,
  // })
  //   .then(function (response) {
  //     res.status(200).json({ status: 1, message: "created" });
  //   })
  //   .catch(function (error) {
  //     console.log(error);
  //   });

  User.create(req.body)
    .then(function (response) {
      res.status(200).json({ status: 1, message: "created" });
    })
    .catch(function (error) {
      console.log(error);
    });
});

//get
router.get("/users", function (req, res) {
  User.findAll({ where: { status: "1" } })
    .then(function (users) {
      res.status(200).json({ status: 1, message: "users found", data: users });
    })
    .catch(function (error) {
      console.log(error);
    });
});

//raw get
router.get("/users-raw", function (req, res) {
  sequelize
    .query("SELECT * from tbl_users", { type: sequelize.QueryTypes.SELECT })
    .then(function (users) {
      res.status(200).json({ status: 1, message: "users found", data: users });
    })
    .catch(function (error) {
      console.log(error);
    });
});

//update
router.put("/user", function (req, res) {
  User.update(
    { name: req.body.name, email: req.body.email, rollNo: req.body.rollNo },
    { where: { id: req.body.id } }
  )
    .then(function (response) {
      res.status(200).json({ status: 1, message: "user data updated" });
    })
    .catch(function (error) {
      console.log(error);
    });
});

//delete
router.delete("/user/:id", function (req, res) {
  User.destroy({ where: { id: req.params.id } })
    .then(function (response) {
      res.status(200).json({ status: 1, message: "user deleted" });
    })
    .catch(function (error) {
      console.log(error);
    });
});

router.get("/", function (req, res) {
  res.status(200).json({ status: 1, message: "welcome to orm" });
});

module.exports = router;
