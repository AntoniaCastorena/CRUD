import mongoose from 'mongoose';
const {Schema, model} = mongoose;

const comprasSchema = new Schema({
    nombre:{
        type:String,
        required:true
    },
    cantidad:{
        type:Number,
        required:true
    },
    precio:{
        type:Number,
        required:true
    },
    subtotal:{
        type:Number,
        required:true
    },
    iva:{
        type:Number,
        required:true
    },
    total:{
        type:Number,
        required:true
    },
    empleado:{
        type:Schema.ObjectId,
        required:true,
        ref:"empleado"
    }},
    {
        timestamps:true
})
export const ComprasModel = model('compras', comprasSchema);
//especificaciones sobre lp que debe cumplir el registro de ususarios