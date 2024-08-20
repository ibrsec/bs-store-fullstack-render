const { Category } = require("./src/models/categoryModel");
const { Product } = require("./src/models/productModel");

module.exports = async() => {

await Category.deleteMany();
await Product.deleteMany();
console.log('all data is cleaned');

  const products = require("./products.json");
  // console.log(products);
  const beauty = await Category.create({
     name:"beauty"
  })
  const fragrances = await Category.create({
     name:"fragrances"
  })
  const furniture = await Category.create({
     name:"furniture"
  })
  const groceries = await Category.create({
     name:"groceries"
  })
//   console.log(
//       products.products.map(item=> item.category)
//       );
  const  lastResult = products.products.map((item,i) => {
    const data =  {
      categoryId: item.category === "beauty" ? beauty._id  : item.category === "fragrances"? fragrances._id : item.category === "furniture" ? furniture._id :  groceries._id  ,
      title:item.title || "no title",
      description: item.description || "no desc",
      price: item.price || 333,
      brand: item.brand || 'no brand',
      thumbnail:
       item.thumbnail || "http://no-thumbnail",
      discountPercentage: item.discountPercentage,
      rating: item.rating,
      stock: item.stock,
      images: item.images ,
    };
    Product.create(data);
    console.log(i);
    return data;
  });
  console.log('sync is ok');

};
