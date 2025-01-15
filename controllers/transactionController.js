const moment = require('moment');
const transactionModel = require('../models/transactionModel')

const getAllTransactions = async(req, res)=>{
    try {
        const {frequency, selectedDate, type} = req.body
        const transactions = await transactionModel.find({
            ...(frequency !== 'custom' ? {
                date:{
                    // install moment library for dates
                    // from transaction model get this much of data
                    
    
                     $gt: moment().subtract(Number(frequency), "d").toDate()
                }
            }:{
                date:{
                    $gte:selectedDate[0],
                    $lte:selectedDate[1],
                }
            }),
            
  
            userid:req.body.userid,
            ...(type !== 'all' && {type}),
        }
        );


        res.status(200).json(transactions);
        
    } catch (error) {
        console.log(error);
        res.status(500).json(error);
        
    }

}
const editTransactions = async(req,res)=>{
    try {
        await transactionModel.findOneAndUpdate({_id:req.body.transactionId}, req.body.payload)
        res.status(200).send("Edit Successfull")
    } catch (error) {
        console.log(error)
        res.status(500).json(error)
        
    }

}
const deleteTransactions = async(req,res) =>{
    try {
        await transactionModel.findOneAndDelete({_id:req.body.transactionId});
        res.status(200).send("Transaction deleted");
        
    } catch (error) {
        console.log(error);
        res.status(500).json(error);
        
    }
}

const addTransactions = async(req,res)=>{
    try {
        const newTransaction = new transactionModel(req.body);
        await newTransaction.save();
        res.status(201).send("Transaction created");
        
    } catch (error) {
        console.log(error);
        res.status(500).json(error);


        
    }

}

module.exports = {getAllTransactions, addTransactions, editTransactions,deleteTransactions};