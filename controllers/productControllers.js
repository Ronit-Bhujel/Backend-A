const path=require('path');
const productModel = require('../models/productModel');
 
const createProduct=async(req,res)=>{
 
//checking incomming data
console.log(req.body)
console.log(req.files)
 
 
//destructuringthe body data(json data)
 
const{productName,
    productPrice,
    productCategory,
    productDescription}
    =req.body;
 
    //validation
 
    if(!productName||!productPrice||!productCategory||!productDescription){
        return res.status(400).json({
            "success":false,
            "message":"Please enter all feilds"
        })
    }
 
    //validate if there is image or not
 
    if(!req.files || !req.files.productImage){
        return res.status(400).json({
            "success":false,    
            "message":"Image not found"      
        })
    }
   
    const {productImage}=req.files;
 
 
    //uploading image
//1.Generate new img name (abc.png) -> (1234-abc.png)
    const imageName=`${Date.now()}-${productImage.name}`;
 
//2.make a upload path (/path/upload-directory/1234-abc.png)
    const imageUploadPath=path.join(__dirname,`../public/products/${imageName}`);    
 
//3.move to that directory(await,try-catch)
    try{
        await productImage.mv(imageUploadPath);
 
        //save to database
        const newProduct=new productModel({
            productName:productName,
            productPrice:productPrice,
            productCategory:productCategory,
            productDescription:productDescription,
            productImage:imageName
        })
 
        const product=await newProduct.save();
        res.status(201).json({
            "success":true,
            "message":"Product added successfully",
            "data":product
        })
 
    }catch(error){
        console.log(error)
        res.status(500).json({
            "success":false,
            "message":"Internal server error",
            "error":error
        });
    };  
 
};

// Fetch all product
const getAllProducts = async (req,res) => {

    //try catch
    try{
        const allProducts = await productModel.find({})
        res.status(201).json({
            "success":true,
            "message":"Product Fetched Successfully!",
            "products":allProducts
        })
        
    } catch(error){
        console.log(error)
        res.status(500).json({
            "success":false,
            "message":"Internal server error",
            "error":error
        });     
    }

    // fetch single product
    
}

const getSingleProduct = async (req,res) => {

    // get product id from url (prams)
    const productId = req.params.id

    //try catch
    try{
        const singleProduct = await productModel.findById(productId)
        if(!singleProduct) {
            res.status(400).json({
                "success":false,
                "message":"No Product Found!"
            })
        }

        res.status(201).json({
            "success":true,
            "message":"Product Fetched Successfully!",
            "product":singleProduct
        })
        
    } catch(error){
        console.log(error)
        res.status(500).json({
            "success":false,
            "message":"Internal server error",
            "error":error
        });     
    }
    
}
 
module.exports = {
    createProduct,
    getAllProducts,
    getSingleProduct
    
};
 