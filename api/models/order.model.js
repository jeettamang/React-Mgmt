const {Schema, model}=require("mongoose");
const {modelConfig, relation, orederStatus}=require("../library/constants");

const Order=model("Order", new Schema({
   userId: {...relation, ref: "User"},
   status: {type:String, enum: orederStatus, default: "Processing"},

},modelConfig));

module.exports=Order;