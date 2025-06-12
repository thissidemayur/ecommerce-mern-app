import Product from "../model/product.model.js"

export const calculateMonthlyPercentageChange = (currentMonthStock, previousMonthStock)=>{
    if(previousMonthStock===0) return currentMonthStock*100
    const releativePercentage =  ((currentMonthStock-previousMonthStock)/previousMonthStock)*100
    return Number(releativePercentage.toFixed(0))
}

export const getAllCategoriesInPercentage = async(categories ,productCount)=>{
    let totalItemInCategoriesPercentage= []

    const totalItemInCategoriesPromise = categories.map((category)=>Product.countDocuments({categories:category}))
    const totalItemInCategories = await Promise.all(totalItemInCategoriesPromise)
// console.log("totalItemInCategories: ",totalItemInCategories)
    categories.map((category , index )=> {
        totalItemInCategoriesPercentage.push({[category]: (totalItemInCategories[index]/productCount)*100})
    })
    return totalItemInCategoriesPercentage;

}