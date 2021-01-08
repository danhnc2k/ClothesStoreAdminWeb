const products = require('../models/product')
const productServices = require('../models/service/productService');
const categoryServices = require('../models/service/categoryService');
const labelServices = require('../models/service/labelService');

let ITEM_PER_PAGE = 5;

exports.getProducts = async function(req, res, next){
    //Categories list
    const categoriesList = await categoryServices.listCategories();
    //Price list\
    let priceList = [
        [0, 50],
        [51, 100],
        [101, 150],
        [151, 200]
    ];
    //Size list
    let sizeList = ["S", "M", "L", "XL"];
    //Label list
    const labelList = await labelServices.listLabels();

    const price_value = req.query.price;
    const size_value = req.query.size;
    const label_value = req.query.label;
    const page = +req.query.page || 1;
    const filter = {};
    if (req.params.mainCategory)
    {
        filter['productType.main']= new RegExp(req.params.mainCategory, "i");
    }
    if (req.params.subCategory)
    {
        filter['productType.sub']= new RegExp(req.params.subCategory, "i");
    }
    if (price_value && price_value != -1)
    {
        filter['price'] = {$gt: priceList[price_value][0], $lt: priceList[price_value][1]};
    }
    if (size_value && size_value != -1)
    {
        filter['size'] = new RegExp(sizeList[size_value], "i");
    }
    if (label_value && label_value != -1)
    {
        filter['labels'] = new RegExp(labelList[label_value]._id, "i");
    }
    const paginate = await productServices.listProducts(filter, page, ITEM_PER_PAGE);
    res.render("products", {
        categories: categoriesList,
        prices: priceList,
        sizes: sizeList,
        labels: labelList,
        priceValue: price_value,
        sizeValue: size_value,
        labelValue: label_value,
        allProducts: paginate.docs,
        totalProducts: paginate.totalDocs,
        hasNextPage: paginate.hasNextPage,
        hasPrevPage: paginate.hasPrevPage,
        nextPage: paginate.nextPage,
        prevPage: paginate.prevPage,
        currentPage: paginate.page,
        totalPages: paginate.totalPages
    });
}

exports.getCategories = async function(req, res, next){
    
}

exports.getIndex = async function(req, res, next){
    res.render('index',{

    });
}

exports.getProductDetail = async function(req, res, next){
    const categoriesList = await categoryServices.listCategories();
    const product = await productServices.getProduct(req.params.id);
    let sizeStr="";
    product.size.forEach(element => {
        sizeStr += element+';';
    });
    let colorStr="";
    product.color.forEach(element => {
        colorStr += element+';';
    });
    let imageStr="";
    product.images.forEach(element => {
        imageStr += element+';';
    });
    let materialStr="";
    product.materials.forEach(element => {
        materialStr += element+';';
    });

    res.render('detail',{
        categories: categoriesList,
        id: product._id,
        name: product.name,
        description: product.description,
        sizes: sizeStr,
        subCategory: product.category.sub,
        stock: product.stock,
        price: product.price,
        sale: product.sale,
        colors: colorStr,
        images: imageStr,
        imagesURL: product.images,
        materials: materialStr,
        buyCount: product.buyCounts,
        label: product.labels
    });
}

exports.postUpdate = async function(req, res, next){
    await productServices.update(req.body.id,req.body.name,req.body.description,req.body.size,
        req.body.subCategory,req.body.stock,req.body.price,req.body.sale,req.body.color,
        req.body.image,req.body.material,req.body.buyCount,req.body.label);
    res.redirect('/');
}

exports.getDelivered = async function(req, res, next){
    const page = +req.query.page || 1;
    const paginate = await productServices.listProducts({}, page, ITEM_PER_PAGE);
    res.render("delivered", {
        title: "List Products",
        allProducts: paginate.docs,
        totalProducts: paginate.totalDocs,
        hasNextPage: paginate.hasNextPage,
        hasPrevPage: paginate.hasPrevPage,
        nextPage: paginate.nextPage,
        prevPage: paginate.prevPage,
        currentPage: paginate.page,
        totalPages: paginate.totalPages
    });
}

exports.getDelivering = async function(req, res, next){
    const page = +req.query.page || 1;
    const paginate = await productServices.listProducts({}, page, ITEM_PER_PAGE);
    res.render("delivering", {
        title: "List Products",
        allProducts: paginate.docs,
        totalProducts: paginate.totalDocs,
        hasNextPage: paginate.hasNextPage,
        hasPrevPage: paginate.hasPrevPage,
        nextPage: paginate.nextPage,
        prevPage: paginate.prevPage,
        currentPage: paginate.page,
        totalPages: paginate.totalPages
    });
}

exports.getDeliversoon = async function(req, res, next){
    const page = +req.query.page || 1;
    const paginate = await productServices.listProducts({}, page, ITEM_PER_PAGE);
    res.render("deliversoon", {
        title: "List Products",
        allProducts: paginate.docs,
        totalProducts: paginate.totalDocs,
        hasNextPage: paginate.hasNextPage,
        hasPrevPage: paginate.hasPrevPage,
        nextPage: paginate.nextPage,
        prevPage: paginate.prevPage,
        currentPage: paginate.page,
        totalPages: paginate.totalPages
    });
}

exports.postABC = async function(req, res, next){
    const abc = 'abc';
    redirect('/');
}
