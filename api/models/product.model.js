const {Schema,model}=require("mongoose");
const {stringRequired, booleanTrue, relation, modelConfig}=require("../library/constants");

const Product=model("Product", new Schema({
    name:stringRequired,
    price:{type:Number,required:true},
    discountedPrice:{type:Number,default:0},
    description:stringRequired,
    summary:stringRequired,
    categoryId:{...relation, ref:"Category"},
    brandId:{...relation, ref:"Brand"},
    images:[stringRequired],
    status:booleanTrue,
    featured:{type: Boolean, default: false},

},modelConfig));

module.exports=Product;