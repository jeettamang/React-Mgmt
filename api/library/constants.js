const {Types}=require("mongoose");

const stringRequired={type: String, required: true};
const booleanTrue={type:Boolean, default: true};
const modelConfig={timeStamps: true, autoIndex: true, autoCreate: true};
const relation={type: Types.ObjectId, required: true};
const numberRequired={type: Number, required: true};
const orederStatus=["Processing", "Confirmed", "Shipping", "Delivered", "Cancelled"];


module.exports={stringRequired, booleanTrue, modelConfig, relation, numberRequired, orederStatus};