"use strict";

const { User } = require("../models/userModel");
const mongoose = require("mongoose");
module.exports.userController = {
  /**
   * @swagger
   * /users:
   *   get:
   *     summary: List users
   *     description: 'You can use <u>filter[] & search[] & sort[] & page & limit</u> queries with the endpoint. <ul> Examples: <li>URL/?<b>filter[field1]=value1&filter[field2]=value2</b></li> <li>URL/?<b>search[field1]=value1&search[field2]=value2</b></li> <li>URL/?<b>sort[field1]=asc&sort[field2]=desc</b></li> <li>URL/?<b>limit=10&page=1</b></li> </ul>
 *          </br></br>**Note:** This operation is restricted to `admin` users only.'
   *     tags: [User]
   *     parameters:
   *       - in: query
   *         name: filter[field]
   *         schema:
   *           type: string
   *         required: false
   *         description: Filter users by specific fields
   *         example: filter[name]=John&filter[age]=30
   *       - in: query
   *         name: search[field]
   *         schema:
   *           type: string
   *         required: false
   *         description: Search users by specific fields with regex
   *         example: search[email]=example@example.com
   *       - in: query
   *         name: sort[field]
   *         schema:
   *           type: string
   *         required: false
   *         description: Sort users by specific fields
   *         example: sort[name]=asc&sort[createdAt]=desc
   *       - in: query
   *         name: limit
   *         schema:
   *           type: integer
   *         required: false
   *         description: Limit the number of users returned
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
   *         description: Successfully listed users
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
   *                   example: Users are listed!
   *                 details:
   *                   $ref: '#/components/schemas/ResponseListDetails'
   *                 result:
   *                   type: array
   *                   items:
   *                     $ref: '#/components/schemas/User'
   */

  list: async (req, res) => {
    const users = await res.getListModel(User);
    const isAdmin = res.userDecoded?.isAdmin; 
    
    res.status(200).json({
      error: false,
      message: "Users are listed!",
      details: await res.getListModelDetails(User),
      result: users,
    });
  },

  /**
   * @swagger
   * /users:
   *   post:
   *     summary: Create a new user
   *     tags: [User]
   *     requestBody:
   *       required: true
   *       content:
   *         application/json:
   *           schema:
   *             type: object
   *             required:
   *               - email
   *               - password
   *             properties:
   *               email:
   *                 type: string
   *                 description: The email address of the user
   *                 example: john.doe@example.com
   *               password:
   *                 type: string
   *                 description: The password of the user. Must contain at least one uppercase letter, one lowercase letter, one number, and one special character. Length should be between 8 and 16 characters.
   *                 example: Password1!
   *     responses:
   *       201:
   *         description: A new user is created
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
   *                   example: A new user is created!
   *                 result:
   *                   $ref: '#/components/schemas/User'
   *       400:
   *         description: Bad request - Email and password are required fields!
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
   *                   example: Bad request - Email and password are required fields!
   */
  create: async (req, res) => {
    const { email, password, isAdmin: isAdminBody } = req.body;
    if (!email || !password) {
      res.status(400);
      throw new Error("Bad request - Email and password are required fields!");
    }
    if (isAdminBody) {
      console.log("Forbidden - Admin is already exist!");
      res.status(403);
      throw new Error(
        "Forbidden - Admin is already exist! Another one is not allowed!"
      );
    }
    const adminUser = await User.findOne({ isAdmin: true });
    let isAdmin = false;

    if (!adminUser) {
      isAdmin = true;
      console.log("Admin user is creatation!");
    }

    const newUser = await User.create({ email, password, isAdmin });

    res.status(201).json({
      error: false,
      message: `A new ${isAdmin ? "admin " : ""}user is created!`,
      result: newUser,
    });
  },

  /**
   * @swagger
   * /users/{id}:
   *   get:
   *     summary: Get a user by ID
   *     tags: [User] 
   *     parameters:
   *       - in: path
   *         name: id
   *         schema:
   *           type: string
   *         required: true
   *         description: The user ID
   *         example: 60d0fe4f5311236168a109ca
   *     responses:
   *       200:
   *         description: User is here!
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
   *                   example: User is here!
   *                 result:
   *                   $ref: '#/components/schemas/User'
   *       400:
   *         description: Invalid Id type!
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
   *         description: User not found!
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
   *                   example: User not found!
   */
  read: async (req, res) => {
    if (!mongoose.Types.ObjectId.isValid(req.params.id)) {
      res.status(400);
      throw new Error("Invalid Id type!");
    }
    
    const user = await User.findOne({ _id: req.params.id });
    if (!user) {
      res.status(404);
      throw new Error("User not found!");
    }

    res.status(200).json({
      error: false,
      message: "User is here!",
      result: user,
    });
  },

  /**
   * @swagger
   * /users/{id}:
   *   delete:
   *     summary: Delete a user by ID
   *     tags: [User]
   *     description: 
 *          </br></br>**Note:** This operation is restricted to `admin` users only.
   *     parameters:
   *       - in: path
   *         name: id
   *         schema:
   *           type: string
   *         required: true
   *         description: The user ID
   *         example: 60d0fe4f5311236168a109ca
   *     responses:
   *       204:
   *         description: No Content - User is deleted!
   *       400:
   *         description: Invalid Id type!
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
   *         description: User not found!
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
   *                   example: User not found!
   *       500:
   *         description: Failed to delete the user! - Something went wrong at DB!
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
   *                   example: Failed to delete the user! - Something went wrong at DB!
   */

  delete: async (req, res) => {
   



    if (!mongoose.Types.ObjectId.isValid(req.params.id)) {
      res.status(400);
      throw new Error("Invalid Id type!");
    }

    const user = await User.findOne({ _id: req.params.id });
    if (!user) {
      res.status(404);
      throw new Error("User not found!");
    }
    const { deletedCount } = await User.deleteOne({ _id: req.params.id });

    if (!deletedCount) {
      res.status(500);
      throw new Error(
        "Failed to delete the user! - Something went wrong  at DB!"
      );
    }

    res.sendStatus(204);
  },

  /**
   * @swagger
   * /users/{id}:
   *   put:
   *     summary: Update a user by ID
   *     tags: [User]
   *     description: 
 *          </br></br>**Note:** This operation is restricted to `admin` users only.
   *     parameters:
   *       - in: path
   *         name: id
   *         schema:
   *           type: string
   *         required: true
   *         description: The user ID
   *         example: 60d0fe4f5311236168a109ca
   *     requestBody:
   *       required: true
   *       content:
   *         application/json:
   *           schema:
   *             type: object
   *             properties:
   *               email:
   *                 type: string
   *                 description: The email address of the user.
   *                 example: john.doe@example.com
   *               password:
   *                 type: string
   *                 description: The new password for the user.
   *                 example: NewPassword1!
   *             required:
   *               - email
   *               - password
   *     responses:
   *       202:
   *         description: User is updated!
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
   *                   example: User is updated!
   *                 result:
   *                   $ref: '#/components/schemas/User'
   *       400:
   *         description: Invalid Id type or missing required fields!
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
   *                   example: Invalid Id type! or Email and password fields are required!
   *       404:
   *         description: User not found!
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
   *                   example: User not found!
   *       500:
   *         description: Failed to update the user! - Something went wrong at DB!
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
   *                   example: Failed to update the user! - Something went wrong at DB!
   */

  update: async (req, res) => {
    if (!mongoose.Types.ObjectId.isValid(req.params.id)) {
      res.status(400);
      throw new Error("Invalid Id type!");
    }

    const { email, password } = req.body;
    if (!email || !password) {
      res.status(400);
      throw new Error("Email and password fields are required!");
    }
    const user = await User.findOne({ _id: req.params.id });

    if (!user) {
      res.status(404);
      throw new Error("User not found!");
    }

    const { modifiedCount } = await User.updateOne(
      { _id: req.params.id },
      { email, password },
      { runValidators: true }
    );
    if (!modifiedCount) {
      res.status(500);
      throw new Error(
        "Failed to update the user! - Something went wrong  at DB!"
      );
    }

    res.status(202).json({
      error: false,
      message: "User is updated!",
      result: await User.findOne({ _id: req.params.id }),
    });
  },

  /**
   * @swagger
   * /users/{id}:
   *   patch:
   *     summary: Partially update a user by ID
   *     tags: [User]
   *     description: 
 *          </br></br>**Note:** This operation is restricted to `admin` users only.
   *     parameters:
   *       - in: path
   *         name: id
   *         schema:
   *           type: string
   *         required: true
   *         description: The user ID
   *         example: 60d0fe4f5311236168a109ca
   *     requestBody:
   *       required: true
   *       content:
   *         application/json:
   *           schema:
   *             type: object
   *             properties:
   *               email:
   *                 type: string
   *                 description: The new email address of the user.
   *                 example: new.email@example.com
   *               password:
   *                 type: string
   *                 description: The new password for the user.
   *                 example: NewPassword1!
   *             additionalProperties: false
   *             oneOf:
   *               - required: [email]
   *               - required: [password]
   *     responses:
   *       200:
   *         description: User is updated!
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
   *                   example: User is updated!
   *                 result:
   *                   $ref: '#/components/schemas/User'
   *       400:
   *         description: Invalid Id type or no valid fields provided!
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
   *                   example: Invalid Id type! or Email or password fields are required!
   *       404:
   *         description: User not found!
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
   *                   example: User not found!
   *       500:
   *         description: Failed to update the user! - Something went wrong at DB!
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
   *                   example: Failed to update the user! - Something went wrong at DB!
   */

  patchUpdate: async (req, res) => {
    if (!mongoose.Types.ObjectId.isValid(req.params.id)) {
      res.status(400);
      throw new Error("Invalid Id type!");
    }

    const { email, password } = req.body;
    if (!(email || password)) {
      res.status(400);
      throw new Error("Email or password fields are required!");
    }
    const user = await User.findOne({ _id: req.params.id });

    if (!user) {
      res.status(404);
      throw new Error("User not found!");
    }

    const { modifiedCount } = await User.updateOne(
      { _id: req.params.id },
      req.body,
      { runValidators: true }
    );
    if (!modifiedCount) {
      res.status(500);
      throw new Error(
        "Failed to update the user! - Something went wrong  at DB!"
      );
    }

    res.status(202).json({
      error: false,
      message: "User is updated!",
      result: await User.findOne({ _id: req.params.id }),
    });
  },
};
