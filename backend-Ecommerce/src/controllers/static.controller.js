import { asyncHandler } from '../utils/asyncHandler.utils.js'
import { ApiError } from '../utils/ApiError.utils.js'
import { ApiResponse } from '../utils/ApiResponse.utils.js'
import Product from "../model/product.model.js";
import User from "../model/user.model.js";
import { Order } from "../model/order.model.js";
import { calculateMonthlyPercentageChange, getAllCategoriesInPercentage } from "../utils/eCommerceFunctionality.js";


export const AdminDashboard = asyncHandler(async (req, res) => {

    const today = new Date();
    const sixMonthAgo = today
    sixMonthAgo.setMonth(today.getMonth()-6)
// NOTE:add bar graph 6month revenue-transcation

        const currentMonth = {
        startDate: new Date(today.getFullYear(), today.getMonth(), 1),
        endDate: today
    }

    const previousMonth = {
        startDate: new Date(today.getFullYear(), today.getMonth() - 1, 1),
        endDate: new Date(today.getFullYear(), today.getMonth(), 0)
    }

    //------------------- (Product, User, Order)Promise Start  ---------------------
    const currentMonthProductPromise = Product.find({
        createdAt: { $gte: currentMonth.startDate, $lte: currentMonth.endDate }
    })
    const previousMonthProductPromise = Product.find({
        createdAt: { $gte: previousMonth.startDate, $lte: previousMonth.endDate }
    })

    const currentMonthUserPromise = User.find({
        createdAt: { $gte: currentMonth.startDate, $lte: currentMonth.endDate }
        })
    const previousMonthUserPromise = User.find({
        createdAt: { $gte: previousMonth.startDate, $lte: previousMonth.endDate }
    })

    const currentMonthOrderPromise = Order.find({
        createdAt: { $gte: currentMonth.startDate, $lte: currentMonth.endDate }
    })
    const previousMonthOrderPromise = Order.find({
        createdAt: { $gte: previousMonth.startDate, $lte: previousMonth.endDate }
    })

    const latestTranscationsPromsie =Order.find({}).select(["orderedUser","deliveryCharge", "packageCharge","tax","totalAmount","orderedItemList"]).limit(10)
    //------------------- (Product, User, Order)Promise End  ---------------------
    // ------------------- All Promise Resolve here -------------------------
    const [
        currentMonthProduct,
        previousMonthProduct,
        currentMonthUser,
        previousMonthUser,
        currentMonthOrder,
        previousMonthOrder,
    // -------------- Absolute number of item(Product, User, Order) end ------------
        totalProductCount,
        totalUserCount,
        allOrder,
        allCategories,
        totalFemaleCount,
        latestTransation

    ] = await Promise.all([
        currentMonthProductPromise,
        previousMonthProductPromise,
        currentMonthUserPromise,
        previousMonthUserPromise,
        currentMonthOrderPromise,
        previousMonthOrderPromise ,
        // -------------- Absolute number of item(Product, User, Order) end ------------
        Product.countDocuments(),
        User.countDocuments(),
        Order.find({}).select("totalAmount"), // not using countDoucemnet bcz if  used its make  one more call to Order schema and select totalAmount for counting Revenue
        Product.distinct("categories"),
        User.countDocuments({gender:"female"}) ,
        latestTranscationsPromsie
    
    ])
    // ------------------- All Promise Resolve End -------------------------


    // ------------------- revenue start ---------------------------------
    const currentMonthRevenue = currentMonthOrder.reduce((totalAmount,order)=>totalAmount+(order.totalAmount || 0),0)
    const previousMonthRevenue = previousMonthOrder.reduce((totalAmount,order)=>totalAmount+(order.totalAmount || 0),0)
    const revenue = allOrder.reduce((totalAmount,order)=>(totalAmount+(order.totalAmount ||0 )),0)
    // ------------------- revenue end ---------------------------------

    // -------------- Releative percentage of item(Product, User, Order) calculated ------------
    const releativePercentageProduct = calculateMonthlyPercentageChange(currentMonthProduct.length, previousMonthProduct.length)
    const releativePercentageUser = calculateMonthlyPercentageChange(currentMonthUser.length, previousMonthUser.length)
    const releativePercentageOrder = calculateMonthlyPercentageChange(currentMonthOrder.length, previousMonthOrder.length)
    const releativePercentageRevenue = calculateMonthlyPercentageChange(currentMonthRevenue,previousMonthRevenue);
    // -------------- Releative percentage of item(Product, User, Order) end ------------


    const totalNumberOfItems = {
        totalProduct:totalProductCount,
        totalUser:totalUserCount,
        totalOrder:allOrder.length,
        totalRevenue:revenue
    }
    
    const releativePercentageOfItem = {
        releativePercentageProduct ,
        releativePercentageUser ,
        releativePercentageOrder,
        releativePercentageRevenue
    }

    const  categoriesCountPercentage  = await getAllCategoriesInPercentage(allCategories, totalProductCount)

    const sexRatio = {
        female:totalFemaleCount,
        male:totalUserCount-totalFemaleCount
    }

    const staticOutput={
        releativePercentageOfItem,
        totalNumberOfItems,
        // NOTE:add bar graph 6month revenue-transcation 
        inventory:categoriesCountPercentage,
        sexRatio ,
         latestTransation
    } 

    return res.status(200).json(
        new ApiResponse(200, staticOutput,"static sent successfully!")
    )
})


export const PieChart = asyncHandler(async(req,res)=>{

    
    
    const [
        deliveredOrder,
        pendingOrder,
        shippedOrder,
        allCategories ,
        totalProductCount,
        outOfStock,
        allOrder,
        userDOB,
        netAdmin,
        netUser,

    ] = await Promise.all([
        Order.countDocuments({status:"Delivered"}), 
        Order.countDocuments({status:"Pending"}),
        Order.countDocuments({status:"Shipped"}),
        Product.distinct("categories") ,
        Product.countDocuments(),
        Product.countDocuments({stock:0}),
        Order.find({}).select(["deliveryCharge", "packageCharge","tax","totalAmount","totalPayableAmout"]),
        User.find({}).select("dob") ,
        User.countDocuments({ role: "admin" }),
      User.countDocuments({ role: "user" }),
    ])
    
    const totalIncomeWithoutDiscount = allOrder.reduce((prevAmount, order )=>prevAmount + (order.totalAmount) ,0)
    const totalIncomeWithDiscount = allOrder.reduce((prevAmount, order )=>prevAmount + (order.totalPayableAmout) ,0)

    const deliveryAmount = allOrder.reduce((prevAmount, order )=>prevAmount+(order.deliveryCharge),0)
    const packageCharge = allOrder.reduce((prevAmount, order)=>prevAmount+(order.packageCharge||0) ,0)
    const taxAmount = allOrder.reduce((prevAmount,order)=>prevAmount+(order.tax || 0),0)
const netMargin = totalIncomeWithDiscount-deliveryAmount -packageCharge -taxAmount ;

    const revenueDisturbution = {
        totalIncomeWithoutDiscount, totalIncomeWithDiscount,deliveryAmount , packageCharge , packageCharge , taxAmount ,netMargin
    }

    const  categoriesCountPercentage  = await getAllCategoriesInPercentage(allCategories, totalProductCount)

    const orderFullfilmentRatio = { deliveredOrder,pendingOrder ,shippedOrder }

    const ProductStockAvaliablity = {
        inStock:totalProductCount-outOfStock ,
        outOfStock
    }

    const userAgeRatio= {
        teen: userDOB.filter((singleUser)=>singleUser.age <18 ).length,
        adult:userDOB.filter((singleUser)=>singleUser.age >20 && singleUser.age < 40).length,
        old : userDOB.filter((singleUser)=>singleUser.age >=40).length
    }

    const adminUserRatio = {
        netAdmin ,
        netUser
    }
    const NetPieChart = {
        orderFullfilmentRatio,
        inventoryRatio:categoriesCountPercentage,
        ProductStockAvaliablity,
        revenueDisturbution ,
        userAgeRatio,
        adminUserRatio,
    }
    
    
    return res.status(200).json(
        new ApiResponse(200, NetPieChart ,"Pie chart order sent successfully! ")
    )
})


export const BarChart = asyncHandler(async(req,res)=>{
    
})











