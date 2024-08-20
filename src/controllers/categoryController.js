"use strict";

const { Category } = require("../models/categoryModel");
const mongoose = require("mongoose");
module.exports.categoryController = {
  /**
   * @swagger
   * /categories:
   *   get:
   *     summary: List categories
   *     description:   'You can use <u>filter[] & search[] & sort[] & page & limit</u> queries with endpoint.  <ul> Examples:   <li>URL/?<b>filter[field1]=value1&filter[field2]=value2</b></li>   <li>URL/?<b>search[field1]=value1&search[field2]=value2</b></li>   <li>URL/?<b>sort[field1]=asc&sort[field2]=desc</b></li>   <li>URL/?<b>limit=10&page=1</b></li>  </ul>'
   *     tags: [Category]
   *     parameters:
   *       - in: query
   *         name: filter[field]
   *         schema:
   *           type: string
   *         required: false
   *         description: Filter categories by specific fields
   *         example: filter[name]=value1&filter[description]=value2
   *       - in: query
   *         name: search[field]
   *         schema:
   *           type: string
   *         required: false
   *         description: Search categories by specific fields
   *         example: search[name]=value1&search[description]=value2
   *       - in: query
   *         name: sort[field]
   *         schema:
   *           type: string
   *         required: false
   *         description: Sort categories by specific fields
   *         example: sort[name]=asc&sort[description]=desc
   *       - in: query
   *         name: limit
   *         schema:
   *           type: integer
   *         required: false
   *         description: Limit the number of categories returned
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
   *         description: Successfully listed categories
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
   *                   example: Categories are listed!
   *                 details:
   *                   $ref: '#/components/schemas/ResponseListDetails'
   *                 result:
   *                   type: array
   *                   items:
   *                     $ref: '#/components/schemas/Category'
   */

  list: async (req, res) => {
    const categories = await res.getListModel(Category);

    res.status(200).json({
      error: false,
      message: "Categories are listed!",
      details: await res.getListModelDetails(Category),
      result: categories,
    });
  },

  /**
   * @swagger
   * /categories:
   *   post:
   *     summary: Create a new category
   *     tags: [Category]
   *     description:
   *         </br></br>**Note:** This operation is restricted to `admin` users only.
   *     requestBody:
   *       required: true
   *       content:
   *         application/json:
   *           schema:
   *             type: object
   *             required:
   *               - name
   *             properties:
   *               name:
   *                 type: string
   *                 description: The name of the category
   *                 example: Electronics
   *     responses:
   *       201:
   *         description: A new category is created
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
   *                   example: A new category is created!
   *                 result:
   *                   $ref: '#/components/schemas/Category'
   *       400:
   *         description: Bad request - name is a required field
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
   *                   example: Bad request - name is a required field!
   */

  create: async (req, res) => {
    const { name } = req.body;
    if (!name) {
      res.status(400);
      throw new Error("Bad request - name is a required field!");
    }

    const newCategory = await Category.create({ name });

    res.status(201).json({
      error: false,
      message: "A new category is created!",
      result: newCategory,
    });
  },

  /**
   * @swagger
   * /categories/{id}:
   *   get:
   *     summary: Get a category by ID
   *     tags: [Category]
   *     parameters:
   *       - in: path
   *         name: id
   *         schema:
   *           type: string
   *         required: true
   *         description: The ID of the category
   *         example: 60d5ec49b6e0f70017c070fa
   *     responses:
   *       200:
   *         description: Category is found
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
   *                   example: Category is here!
   *                 result:
   *                   $ref: '#/components/schemas/Category'
   *       400:
   *         description: Invalid Id type
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
   *         description: Category not found
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
   *                   example: Category not found!
   */
  read: async (req, res) => {
    if (!mongoose.Types.ObjectId.isValid(req.params.id)) {
      res.status(400);
      throw new Error("Invalid Id type!");
    }

    const category = await Category.findOne({ _id: req.params.id });
    if (!category) {
      res.status(404);
      throw new Error("Category not found!");
    }

    res.status(200).json({
      error: false,
      message: "Category is here!",
      result: category,
    });
  },

  /**
 * @swagger
 * /categories/{id}:
 *   delete:
 *     summary: Delete a category
 *     description: Delete a category by its ID.
 *         </br></br>**Note:** This operation is restricted to `admin` users only.
 *     tags: [Category]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: The ID of the category to delete.
 *     responses:
 *       204:
 *         description: Category successfully deleted
 *       400:
 *         description: Invalid ID type
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
 *         description: Category not found
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
 *                   example: Category not found!
 *       500:
 *         description: Failed to delete the category
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
 *                   example: Failed to delete the category! - Something went wrong at DB!
 */

  delete: async (req, res) => {
    if (!mongoose.Types.ObjectId.isValid(req.params.id)) {
      res.status(400);
      throw new Error("Invalid Id type!");
    }

    const category = await Category.findOne({ _id: req.params.id });
    if (!category) {
      res.status(404);
      throw new Error("Category not found!");
    }
    const { deletedCount } = await Category.deleteOne({ _id: req.params.id });

    if (!deletedCount) {
      res.status(500);
      throw new Error(
        "Failed to delete the category! - Something went wrong  at DB!"
      );
    }

    res.sendStatus(204);
  },
/**
 * @swagger
 * /categories/{id}:
 *   put:
 *     summary: Update a category
 *     description: Update a category's name by its ID.
 *         </br></br>**Note:** This operation is restricted to `admin` users only.
 *     tags: [Category]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: The ID of the category to update.
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *                 description: The name of the category.
 *                 example: Electronics
 *     responses:
 *       202:
 *         description: Category successfully updated
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
 *                   example: Category is updated!
 *                 result:
 *                   $ref: '#/components/schemas/Category'
 *       400:
 *         description: Invalid ID type or missing required fields
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
 *         description: Category not found
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
 *                   example: Category not found!
 *       500:
 *         description: Failed to update the category
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
 *                   example: Failed to update the category! - Something went wrong at DB!
 */


  update: async (req, res) => {
    if (!mongoose.Types.ObjectId.isValid(req.params.id)) {
      res.status(400);
      throw new Error("Invalid Id type!");
    }

    const { name } = req.body;
    if (!name) {
      res.status(400);
      throw new Error("Name field is required!");
    }
    const category = await Category.findOne({ _id: req.params.id });

    if (!category) {
      res.status(404);
      throw new Error("Category not found!");
    }

    const { modifiedCount } = await Category.updateOne(
      { _id: req.params.id },
      { name },
      { runValidators: true }
    );
    if (!modifiedCount) {
      res.status(500);
      throw new Error(
        "Failed to update the category! - Something went wrong  at DB!"
      );
    }

    res.status(202).json({
      error: false,
      message: "Category is updated!",
      result: await Category.findOne({ _id: req.params.id }),
    });
  },

  /** 
 * @swagger
 * /categories/{id}:
 *   patch:
 *     summary: Partially update a user by ID
 *     description: Update a category's name by its ID.
 *         </br></br>**Note:** This operation is restricted to `admin` users only.
 *     tags: [Category] 
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: The ID of the category to update.
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *                 description: The name of the category.
 *                 example: Electronics
 *     responses:
 *       202:
 *         description: Category successfully updated
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
 *                   example: Category is updated!
 *                 result:
 *                   $ref: '#/components/schemas/Category'
 *       400:
 *         description: Invalid ID type or missing required fields
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
 *         description: Category not found
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
 *                   example: Category not found!
 *       500:
 *         description: Failed to update the category
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
 *                   example: Failed to update the category! - Something went wrong at DB!
 */


  
};
