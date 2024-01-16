const router = require("express").Router();

const {
    findAllUsers,
    findUser,
    updateUser,
    deleteUser,
    findUserWithEmail,
    updateLeaveCount,
} = require('../controllers/usercontroller');

router.get("/findAllUsers", findAllUsers);
router.post("/findUser/:id", findUser);
router.post("/findUserWithEmail", findUserWithEmail);
router.put("/updateUser", updateUser);
router.put("/updateLeaveCount", updateLeaveCount);
router.delete("/deleteUser/:id", deleteUser);
module.exports = router;