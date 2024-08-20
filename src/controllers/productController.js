"use strict";

const { Category } = require("../models/categoryModel");
const { Product } = require("../models/productModel");
const mongoose = require("mongoose");
module.exports.productController = {
  /**
   * @swagger
   * /products:
   *   get:
   *     summary: List products
   *     description:   'You can use <u>filter[] & search[] & sort[] & page & limit</u> queries with endpoint.  <ul> Examples:   <li>URL/?<b>filter[field1]=value1&filter[field2]=value2</b></li>   <li>URL/?<b>search[field1]=value1&search[field2]=value2</b></li>   <li>URL/?<b>sort[field1]=asc&sort[field2]=desc</b></li>   <li>URL/?<b>limit=10&page=1</b></li>  </ul>'
   *     tags: [Product]
   *     parameters:
   *       - in: query
   *         name: filter[field]
   *         schema:
   *           type: string
   *         required: false
   *         description: Filter products by specific fields
   *         example: filter[name]=value1&filter[description]=value2
   *       - in: query
   *         name: search[field]
   *         schema:
   *           type: string
   *         required: false
   *         description: Search products by specific fields
   *         example: search[name]=value1&search[description]=value2
   *       - in: query
   *         name: sort[field]
   *         schema:
   *           type: string
   *         required: false
   *         description: Sort products by specific fields
   *         example: sort[name]=asc&sort[description]=desc
   *       - in: query
   *         name: limit
   *         schema:
   *           type: integer
   *         required: false
   *         description: Limit the number of products returned
   *         example: 10
   *       - in: query
   *         name: page
   *         schema:
   *           type: integer
   *         required: false
   *         description: Page number to retrieve
   *         example: 1
   *     responses:
   *       200:
   *         description: Successfully listed products
   *         content:
   *           application/json:
   *             schema:
   *               type: object
   *               properties:
   *                 error:
   *                   type: boolean
   *                   example: false
   *                 message:
   *                   type: string
   *                   example: Products are listed!
   *                 details:
   *                   $ref: '#/components/schemas/ResponseListDetails'
   *                 result:
   *                   type: array
   *                   items:
   *                     $ref: '#/components/schemas/Product'
   */

  list: async (req, res) => {
    const products = await res.getListModel(Product, "categoryId");

    res.status(200).json({
      error: false,
      message: "Products are listed!",
      details: await res.getListModelDetails(Product),
      result: products,
    });
  },

  /**
   * @swagger
   * /products:
   *   post:
   *     summary: Create a new product
   *     description: Create a new product with the specified details. The `categoryId`, `title`, `description`, `price`, `brand`, and `thumbnail` fields are required. The other fields are optional.
   *          </br></br>**Note:** This operation is restricted to `admin` users only.
   *     tags: [Product]
   *     requestBody:
   *       required: true
   *       content:
   *         application/json:
   *           schema:
   *             type: object
   *             properties:
   *               categoryId:
   *                 type: string
   *                 description: The ID of the category the product belongs to.
   *                 example: 66979ace407c0200194cd6e1
   *               title:
   *                 type: string
   *                 description: The name of the product.
   *                 example: TV
   *               description:
   *                 type: string
   *                 description: A description of the product.
   *                 example: Description of the TV product
   *               price:
   *                 type: number
   *                 description: The price of the product.
   *                 example: 600
   *               brand:
   *                 type: string
   *                 description: The brand of the product.
   *                 example: LG
   *               thumbnail:
   *                 type: string
   *                 description: A thumbnail image URL of the product. Should start with 'http://' or 'https://'.
   *                 example: https://example.com/thumbnail.jpg
   *               discountPercentage:
   *                 type: number
   *                 description: The discount percentage for the product.
   *                 example: 20
   *               rating:
   *                 type: number
   *                 description: The rating of the product.
   *                 example: 4.5
   *               stock:
   *                 type: number
   *                 description: The stock quantity of the product.
   *                 example: 150
   *               images:
   *                 type: array
   *                 items:
   *                   type: string
   *                   description: Image URLs of the product.
   *                   example: https://example.com/image1.jpg
   *             required:
   *               - categoryId
   *               - title
   *               - description
   *               - price
   *               - brand
   *               - thumbnail
   *     responses:
   *       201:
   *         description: Successfully created a new product
   *         content:
   *           application/json:
   *             schema:
   *               type: object
   *               properties:
   *                 error:
   *                   type: boolean
   *                   example: false
   *                 message:
   *                   type: string
   *                   example: A new product is created!
   *                 result:
   *                   $ref: '#/components/schemas/Product'
   *       400:
   *         description: Bad request - Required fields are missing or invalid
   *         content:
   *           application/json:
   *             schema:
   *               type: object
   *               properties:
   *                 error:
   *                   type: boolean
   *                   example: true
   *                 message:
   *                   type: string
   *                   example: Bad request - categoryId,title,description,price,brand, thumbnail fields are required!
   *       500:
   *         description: Internal server error
   *         content:
   *           application/json:
   *             schema:
   *               type: object
   *               properties:
   *                 error:
   *                   type: boolean
   *                   example: true
   *                 message:
   *                   type: string
   *                   example: Failed to create the product!
   */

  create: async (req, res) => {
    const {
      categoryId,
      title,
      description,
      price,
      brand,
      thumbnail,
      /*after - not required*/ discountPercentage,
      rating,
      stock,
      images,
    } = req.body;
    if (
      !categoryId ||
      !title ||
      !description ||
      !price ||
      !brand ||
      !thumbnail
    ) {
      res.status(400);
      throw new Error(
        "Bad request - categoryId,title,description,price,brand, thumbnail fields are required!"
      );
    }

    const categoryAvaliable = await Category.findOne({ _id: categoryId });
    if (!categoryAvaliable) {
      res.status(404);
      throw new Error("Category not found!");
    }
    const newProduct = await Product.create({
      categoryId,
      title,
      description,
      price,
      brand,
      thumbnail,
      discountPercentage,
      rating,
      stock,
      images,
    });

    res.status(201).json({
      error: false,
      message: "A new product is created!",
      result: newProduct,
    });
  },

  /**
   * @swagger
   * /products/{id}:
   *   get:
   *     summary: Get a product by ID
   *     description: Retrieve a product's details using its unique ID. If the product is not found, a 404 error is returned.
   *     tags: [Product]
   *     parameters:
   *       - in: path
   *         name: id
   *         required: true
   *         schema:
   *           type: string
   *         description: The ID of the product to retrieve.
   *         example: 60c72b2f5f1b2c001f647c0d
   *     responses:
   *       200:
   *         description: Successfully retrieved the product
   *         content:
   *           application/json:
   *             schema:
   *               type: object
   *               properties:
   *                 error:
   *                   type: boolean
   *                   example: false
   *                 message:
   *                   type: string
   *                   example: Product is here!
   *                 result:
   *                   $ref: '#/components/schemas/Product'
   *       400:
   *         description: Bad request - Invalid ID type
   *         content:
   *           application/json:
   *             schema:
   *               type: object
   *               properties:
   *                 error:
   *                   type: boolean
   *                   example: true
   *                 message:
   *                   type: string
   *                   example: Invalid Id type!
   *       404:
   *         description: Product not found
   *         content:
   *           application/json:
   *             schema:
   *               type: object
   *               properties:
   *                 error:
   *                   type: boolean
   *                   example: true
   *                 message:
   *                   type: string
   *                   example: Product not found!
   *       500:
   *         description: Internal server error
   *         content:
   *           application/json:
   *             schema:
   *               type: object
   *               properties:
   *                 error:
   *                   type: boolean
   *                   example: true
   *                 message:
   *                   type: string
   *                   example: Failed to retrieve the product!
   */

  read: async (req, res) => {
    if (!mongoose.Types.ObjectId.isValid(req.params.id)) {
      res.status(400);
      throw new Error("Invalid Id type!");
    }

    const product = await Product.findOne({ _id: req.params.id }).populate('categoryId');
    if (!product) {
      res.status(404);
      throw new Error("Product not found!");
    }

    res.status(200).json({
      error: false,
      message: "Product is here!",
      result: product,
    });
  },

  /**
   * @swagger
   * /products/{id}:
   *   delete:
   *     summary: Delete a product by ID
   *     description: Delete a product using its unique ID. If the product is not found or there is an issue with deletion, appropriate errors are returned.
   *          </br></br>**Note:** This operation is restricted to `admin` users only.
   *     tags: [Product]
   *     parameters:
   *       - in: path
   *         name: id
   *         required: true
   *         schema:
   *           type: string
   *         description: The ID of the product to delete.
   *         example: 60c72b2f5f1b2c001f647c0d
   *     responses:
   *       204:
   *         description: Successfully deleted the product
   *       400:
   *         description: Bad request - Invalid ID type
   *         content:
   *           application/json:
   *             schema:
   *               type: object
   *               properties:
   *                 error:
   *                   type: boolean
   *                   example: true
   *                 message:
   *                   type: string
   *                   example: Invalid Id type!
   *       404:
   *         description: Product not found
   *         content:
   *           application/json:
   *             schema:
   *               type: object
   *               properties:
   *                 error:
   *                   type: boolean
   *                   example: true
   *                 message:
   *                   type: string
   *                   example: Product not found!
   *       500:
   *         description: Internal server error - Failed to delete the product
   *         content:
   *           application/json:
   *             schema:
   *               type: object
   *               properties:
   *                 error:
   *                   type: boolean
   *                   example: true
   *                 message:
   *                   type: string
   *                   example: Failed to delete the product! - Something went wrong at DB!
   */

  delete: async (req, res) => {
    if (!mongoose.Types.ObjectId.isValid(req.params.id)) {
      res.status(400);
      throw new Error("Invalid Id type!");
    }

    const product = await Product.findOne({ _id: req.params.id });
    if (!product) {
      res.status(404);
      throw new Error("Product not found!");
    }
    const { deletedCount } = await Product.deleteOne({ _id: req.params.id });

    if (!deletedCount) {
      res.status(500);
      throw new Error(
        "Failed to delete the product! - Something went wrong  at DB!"
      );
    }

    res.sendStatus(204);
  },

  /**
   * @swagger
   * /products/{id}:
   *   put:
   *     summary: Update a product by ID
   *     description: Update a product's details using its unique ID. Required fields include `categoryId`, `title`, `description`, `price`, `brand`, and `thumbnail`. Other fields are optional.
   *          </br></br>**Note:** This operation is restricted to `admin` users only.
   *     tags: [Product]
   *     parameters:
   *       - in: path
   *         name: id
   *         required: true
   *         schema:
   *           type: string
   *         description: The ID of the product to update.
   *         example: 60c72b2f5f1b2c001f647c0d
   *     requestBody:
   *       required: true
   *       content:
   *         application/json:
   *           schema:
   *             type: object
   *             properties:
   *               categoryId:
   *                 type: string
   *                 description: The ID of the category the product belongs to.
   *                 example: 60c72b2f5f1b2c001f647c0e
   *               title:
   *                 type: string
   *                 description: The title of the product.
   *                 example: "Sample Product"
   *               description:
   *                 type: string
   *                 description: A description of the product.
   *                 example: "This is a detailed description of the product."
   *               price:
   *                 type: number
   *                 format: float
   *                 description: The price of the product.
   *                 example: 19.99
   *               brand:
   *                 type: string
   *                 description: The brand of the product.
   *                 example: "BrandName"
   *               thumbnail:
   *                 type: string
   *                 description: URL of the product's thumbnail image.
   *                 example: "http://example.com/image.jpg"
   *               discountPercentage:
   *                 type: number
   *                 format: float
   *                 description: Percentage discount applied to the product.
   *                 example: 10.5
   *               rating:
   *                 type: number
   *                 format: float
   *                 description: Average rating of the product.
   *                 example: 4.7
   *               stock:
   *                 type: integer
   *                 description: Number of items in stock.
   *                 example: 100
   *               images:
   *                 type: array
   *                 items:
   *                   type: string
   *                 description: Array of URLs of product images.
   *                 example: ["http://example.com/image1.jpg", "http://example.com/image2.jpg"]
   *             required:
   *               - categoryId
   *               - title
   *               - description
   *               - price
   *               - brand
   *               - thumbnail
   *     responses:
   *       202:
   *         description: Successfully updated the product
   *         content:
   *           application/json:
   *             schema:
   *               type: object
   *               properties:
   *                 error:
   *                   type: boolean
   *                   example: false
   *                 message:
   *                   type: string
   *                   example: Product is updated!
   *                 result:
   *                   $ref: '#/components/schemas/Product'
   *       400:
   *         description: Bad request - Missing required fields or invalid ID type
   *         content:
   *           application/json:
   *             schema:
   *               type: object
   *               properties:
   *                 error:
   *                   type: boolean
   *                   example: true
   *                 message:
   *                   type: string
   *                   example: Bad request - categoryId, title, description, price, brand, thumbnail fields are required!
   *       404:
   *         description: Product not found
   *         content:
   *           application/json:
   *             schema:
   *               type: object
   *               properties:
   *                 error:
   *                   type: boolean
   *                   example: true
   *                 message:
   *                   type: string
   *                   example: Product not found!
   *       500:
   *         description: Internal server error - Failed to update the product
   *         content:
   *           application/json:
   *             schema:
   *               type: object
   *               properties:
   *                 error:
   *                   type: boolean
   *                   example: true
   *                 message:
   *                   type: string
   *                   example: Failed to update the product! - Something went wrong at DB!
   */

  update: async (req, res) => {
    if (!mongoose.Types.ObjectId.isValid(req.params.id)) {
      res.status(400);
      throw new Error("Invalid Id type!");
    }

    const {
      categoryId,
      title,
      description,
      price,
      brand,
      thumbnail,
      /*after - not required*/ discountPercentage,
      rating,
      stock,
      images,
    } = req.body;
    if (
      !categoryId ||
      !title ||
      !description ||
      !price ||
      !brand ||
      !thumbnail
    ) {
      res.status(400);
      throw new Error(
        "Bad request - categoryId,title,description,price,brand, thumbnail fields are required!"
      );
    }

    const product = await Product.findOne({ _id: req.params.id });

    if (!product) {
      res.status(404);
      throw new Error("Product not found!");
    }

    const { modifiedCount } = await Product.updateOne(
      { _id: req.params.id },
      {
        categoryId,
        title,
        description,
        price,
        brand,
        thumbnail,
        /*after - not required*/ discountPercentage,
        rating,
        stock,
        images,
      },
      { runValidators: true }
    );
    if (!modifiedCount) {
      res.status(500);
      throw new Error(
        "Failed to update the product! - Something went wrong  at DB!"
      );
    }

    res.status(202).json({
      error: false,
      message: "Product is updated!",
      result: await Product.findOne({ _id: req.params.id }),
    });
  },

  /**
   * @swagger
   * /products/{id}:
   *   patch:
   *     summary: Partially update a product by ID
   *     description: Update specific fields of a product using its unique ID. At least one field among `categoryId`, `title`, `description`, `price`, `brand`, and `thumbnail`, `discountPercentage`, `rating`, `stock`, `images` is required. Other fields are optional.
   *          </br></br>**Note:** This operation is restricted to `admin` users only.
   *     tags: [Product]
   *     parameters:
   *       - in: path
   *         name: id
   *         required: true
   *         schema:
   *           type: string
   *         description: The ID of the product to update.
   *         example: 60c72b2f5f1b2c001f647c0d
   *     requestBody:
   *       required: true
   *       content:
   *         application/json:
   *           schema:
   *             type: object
   *             properties:
   *               categoryId:
   *                 type: string
   *                 description: The ID of the category the product belongs to.
   *                 example: 60c72b2f5f1b2c001f647c0e
   *               title:
   *                 type: string
   *                 description: The title of the product.
   *                 example: "Updated Product Title"
   *               description:
   *                 type: string
   *                 description: A description of the product.
   *                 example: "Updated description of the product."
   *               price:
   *                 type: number
   *                 format: float
   *                 description: The price of the product.
   *                 example: 29.99
   *               brand:
   *                 type: string
   *                 description: The brand of the product.
   *                 example: "Updated Brand"
   *               thumbnail:
   *                 type: string
   *                 description: URL of the product's thumbnail image.
   *                 example: "http://example.com/new-thumbnail.jpg"
   *               discountPercentage:
   *                 type: number
   *                 format: float
   *                 description: Percentage discount applied to the product.
   *                 example: 15.0
   *               rating:
   *                 type: number
   *                 format: float
   *                 description: Average rating of the product.
   *                 example: 4.8
   *               stock:
   *                 type: integer
   *                 description: Number of items in stock.
   *                 example: 200
   *               images:
   *                 type: array
   *                 items:
   *                   type: string
   *                 description: Array of URLs of product images.
   *                 example: ["http://example.com/new-image1.jpg", "http://example.com/new-image2.jpg"]
   *             required:
   *               - categoryId
   *               - title
   *               - description
   *               - price
   *               - brand
   *               - thumbnail
   *     responses:
   *       202:
   *         description: Successfully updated the product
   *         content:
   *           application/json:
   *             schema:
   *               type: object
   *               properties:
   *                 error:
   *                   type: boolean
   *                   example: false
   *                 message:
   *                   type: string
   *                   example: Product is updated!
   *                 result:
   *                   $ref: '#/components/schemas/Product'
   *       400:
   *         description: Bad request - At least one required field is missing
   *         content:
   *           application/json:
   *             schema:
   *               type: object
   *               properties:
   *                 error:
   *                   type: boolean
   *                   example: true
   *                 message:
   *                   type: string
   *                   example: Bad request - At least one field is required -> categoryId, title, description, price, brand, thumbnail, discountPercentage, rating, stock, images.
   *       404:
   *         description: Product not found
   *         content:
   *           application/json:
   *             schema:
   *               type: object
   *               properties:
   *                 error:
   *                   type: boolean
   *                   example: true
   *                 message:
   *                   type: string
   *                   example: Product not found!
   *       500:
   *         description: Internal server error - Failed to update the product
   *         content:
   *           application/json:
   *             schema:
   *               type: object
   *               properties:
   *                 error:
   *                   type: boolean
   *                   example: true
   *                 message:
   *                   type: string
   *                   example: Failed to update the product! - Something went wrong at DB!
   */

  patchUpdate: async (req, res) => {
    if (!mongoose.Types.ObjectId.isValid(req.params.id)) {
      res.status(400);
      throw new Error("Invalid Id type!");
    }

    const {
      categoryId,
      title,
      description,
      price,
      brand,
      thumbnail,
      discountPercentage,
      rating,
      stock,
      images,
    } = req.body;
    if (!(categoryId || title || description || price || brand || thumbnail)) {
      res.status(400);
      throw new Error(
        "Bad request - At least one filed is required -> categoryId, title, description, price, brand, thumbnail, discountPercentage, rating, stock, images."
      );
    }

    const product = await Product.findOne({ _id: req.params.id });

    if (!product) {
      res.status(404);
      throw new Error("Product not found!");
    }

    const { modifiedCount } = await Product.updateOne(
      { _id: req.params.id },
      {
        categoryId,
        title,
        description,
        price,
        brand,
        thumbnail,
        discountPercentage,
        rating,
        stock,
        images,
      },
      { runValidators: true }
    );
    if (!modifiedCount) {
      res.status(500);
      throw new Error(
        "Failed to update the product! - Something went wrong  at DB!"
      );
    }

    res.status(202).json({
      error: false,
      message: "Product is updated!",
      result: await Product.findOne({ _id: req.params.id }),
    });
  },
};
