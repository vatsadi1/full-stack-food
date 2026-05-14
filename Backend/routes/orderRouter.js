import express from "express"
import authMiddleware from "../middleware/auth.js"
import { placeOrder, verifyOrder,getMyOrders,getAllOrders,updateOrderStatus} from "../controllers/orderControler.js"

const orderRouter = express.Router()
orderRouter.post("/place",authMiddleware,placeOrder);
orderRouter.post("/verify",authMiddleware,verifyOrder);
orderRouter.get("/myorders",authMiddleware,getMyOrders);
orderRouter.get("/allOrder",getAllOrders),
orderRouter.post("/status",updateOrderStatus)

export default orderRouter