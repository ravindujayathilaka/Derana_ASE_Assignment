const router = require("express").Router();

const {
    getOneRequest,
    getAllRequest,
    updateRequest,
    acceptRequest,
    rejectRequest,
    deleteLeave,
    createRequest,
} = require('../controllers/leavecontroller');

router.get('/getAllRequest', getAllRequest);
router.get('/getOneRequest/:id', getOneRequest);
router.put('/updateRequest/:id', updateRequest);
router.put('/acceptRequest/:id', acceptRequest);
router.put('/rejectRequest/:id', rejectRequest);
router.delete('/deleteRequest/:id', deleteLeave);
router.post('/createRequest', createRequest);

module.exports = router;