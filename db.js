const mongoose=require('mongoose');
require('dotenv').config();


const DB = process.env.DB;

module.exports=()=>{

const connectionParmas=    {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    
};
try{
    mongoose.connect(DB,connectionParmas)
    console.log('connected to Database successfully.');
}catch(err){
    console.log(err),
    console.log('error while connecting to Database.');
}
}