import { Router } from "express";
import comprasCtrl from "../controllers/compras.controller.js";

const route = Router();
route.post('/', comprasCtrl.createCompra);
route.get('/', comprasCtrl.listAllCompras);
route.get('/listByid/:id', comprasCtrl.listById);
route.delete('/deleteCompra/:id', comprasCtrl.deleteCompra);
route.put('/updateCompra/:id', comprasCtrl.updateCompra);
route.get('/listComprasEmployee/:id', comprasCtrl.listComprasEmployee);
route.get('/listSearchCompra/:nombre', comprasCtrl.searchCompra);//id empleado nombre del duseño del vehiculo

export default route;