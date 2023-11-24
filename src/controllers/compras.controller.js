import {ComprasModel} from '../models/compras.model.js';
import message from '../utils/messages.js';

const {messageGeneral}=message;
 
const comprasCtrl={};

comprasCtrl.createCompra = async(req,res)=>
    {
        try 
        { 
            const data = req.body;
            data.subtotal=(parseInt(data.precio)*parseInt(data.cantidad));
            data.iva=((parseInt(data.subtotal))*0.16);
            data.total=((parseInt(data.subtotal))+parseInt(data.iva));
            const resp = await ComprasModel.create(data);
            messageGeneral(res,201,true,resp,"Comora realizada!");
        } 
        catch (error) 
        {
            messageGeneral(res,500,false,"",error.message);
        }
    };
  
  comprasCtrl.listAllCompras=async(req,res)=>{
    try {
      //hace el inner join con el usuario y que no muestre el password.
      console.log(req.params)
      const resp= await ComprasModel.find();
        
      messageGeneral(res,200,true,resp,"Lista decompras");
    } catch (error) {
      messageGeneral(res,500,false,"",error.message);
    }
  };
  
  comprasCtrl.listById = async(req,res) =>{
    try {
      const { id } = req.params;
      const resp = await ComprasModel.findById(id);
      if(!resp){
        return messageGeneral(res,404,false,"","Compra no encontrada");
      }
      messageGeneral(res,200,true,resp,"");
    } catch (error) {
      messageGeneral(res,500,false,"",error.message);
    }
  };

  comprasCtrl.deleteCompra = async(req,res) =>{
    try {
      const { id } = req.params;
      const resp = await ComprasModel.findById(id);
      if(!resp){
        return messageGeneral(res,404,false,"","Compra no encontrada");
      }
      await resp.deleteOne();
      messageGeneral(res,200,true,"","Compra eliminada!");
    } catch (error) {
      messageGeneral(res,500,false,"",error.message);
    }
  };

  comprasCtrl.updateCompra = async(req,res) =>
  {
      try 
      {
        const { id } = req.params;
        const resp = await ComprasModel.findById(id);
        if(!resp)
        {
          return messageGeneral(res,404,false,"","Compra no encontrada");
        }
          if (req.body.nombre != undefined){
            resp.nombre = req.body.nombre;
          }
          if (req.body.cantidad != undefined){
            resp.cantidad = req.body.cantidad;
          }
          if (req.body.precio != undefined){
            resp.precio = req.body.precio;
          }
          resp.subtotal=(parseInt(resp.precio)*parseInt(resp.cantidad));
          resp.iva=((parseInt(resp.subtotal))*0.16);
          resp.total=(parseInt(resp.subtotal)+parseInt(resp.iva));
        await resp.updateOne(resp);
        await resp.updateOne(req.body);
        messageGeneral(res,200,true,"","Compra actualizada");
        
      }
      catch (error) 
      {
        messageGeneral(res,500,false,"",error.message);
      }
  };

  comprasCtrl.listComprasEmployee = async(req,res) =>{
    try {
     const { id } = req.params;
     const resp = await ComprasModel.find({ empleado:id });
      messageGeneral(res,200,true,resp,"");
    } catch (error) {
      messageGeneral(res,500,false,"",error.message);
    }
  };

  comprasCtrl.searchCompra = async(req,res) =>{
    try {
      //buscar por nombres
      const { nombre } = req.params;
      const resp = await ComprasModel.find({
        nombre:{$regex:".*"+nombre+".*"}
      });
      messageGeneral(res,200,true,resp,"");
    } catch (error) {
      messageGeneral(res,500,false,"",error.message);
    }
  };

  export default comprasCtrl; 