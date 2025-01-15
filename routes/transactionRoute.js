const express = require('express');
const { addTransactions, getAllTransactions, editTransactions, deleteTransactions } = require('../controllers/transactionController');

const router = express.Router();

// post route to add transaction

router.post('/add-transaction', addTransactions)

router.post('/edit-transaction', editTransactions)
router.post('/delete-transaction', deleteTransactions)

// get router // post as we are passing user id
router.post('/get-transactions', getAllTransactions)


module.exports = router;