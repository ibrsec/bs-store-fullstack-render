const jwt = require("jsonwebtoken");
const passwordEncrypter = require("../helpers/passwordEncrypter");
const { User } = require("../models/userModel");
const validatePassword = require("../helpers/validatePassword");

module.exports.authController = {
    /**
 * @swagger
 * /auth/login:
 *   post:
 *     summary: User login
 *     tags: [Auth]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               email:
 *                 type: string
 *                 format: email
 *                 example: user@example.com
 *                 description: The email of the user.
 *               password:
 *                 type: string
 *                 format: password
 *                 example: Password1!
 *                 description: The password of the user.
 *             required:
 *               - email
 *               - password
 *     responses:
 *       200:
 *         description: Successfully logged in
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
 *                   example: Login is successful!
 *                 result:
 *                   type: object
 *                   properties:
 *                     accessToken:
 *                       type: string
 *                       example: eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...
 *                     user_id:
 *                       type: string
 *                       example: 60d0fe4f5311236168a109ca
 *                     user_email:
 *                       type: string
 *                       example: user@example.com
 *       400:
 *         description: Missing or invalid email or password
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
 *                   example: Email and password is mandatory for login!
 *       401:
 *         description: Unauthorized access due to invalid credentials
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
 *                   example: Unauthorized - Invalid password!
 */

  login: async (req, res) => {
    const { email, password } = req.body;
    if (!email || !password) {
      res.status(400);
      throw new Error("Email and password is mandatory for login!");
    }
    if(!validatePassword(password)) {
        res.status(400);
        throw new Error("Invalid password type -  Password must be between 8 and 16 characters long, and include at least one uppercase letter, one lowercase letter, one number, and one special character - [.?!@#$%&*]");
    }

    const user = await User.findOne({ email });
    if (!user) {
      res.status(401);
      throw new Error("Unauthorized - User is not found!");
    }

    if (user.password !== passwordEncrypter(password)) {
      res.status(401);
      throw new Error("Unauthorized - Invalid password!");
    }

    const accessToken = jwt.sign(
        {
            user:{
                id:user._id,
                email:user.email
            }
        },
        process.env.ACCESSTOKEN_SECRETKEY,
        {expiresIn:'3h'}

    )
    res.status(200).json({
        error:false,
        message:"Login is successfull!",
        result:{
            accessToken,
            user_id:user._id,
            user_email:user.email,
            isAdmin:user.isAdmin
        }
    })

  },

  /**
 * @swagger
 * /auth/logout:
 *   post:
 *     summary: User logout
 *     tags: [Auth]
 *     responses:
 *       200:
 *         description: Successfully logged out
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
 *                   example: Logout is successful!
 */

  logout: async (req, res) => {
    req.userDecoded = null;

    res.status(200).json({
        error:false,message:'Logout is successfull!'
    })
  },

  /**
 * @swagger
 * /auth/current:
 *   get:
 *     summary: Get current user
 *     tags: [Auth]
 *     responses:
 *       200:
 *         description: Successfully retrieved current user
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
 *                   example: Current user is here!
 *                 result:
 *                   type: object
 *                   properties:
 *                     user_id:
 *                       type: string
 *                       example: 60d0fe4f5311236168a109ca
 *                     user_email:
 *                       type: string
 *                       example: user@example.com
 *                     accessToken:
 *                       type: string
 *                       example: eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...
 */

  current: async (req, res) => {
    res.status(200).json({
        error:false,
        message:"Current user is here!",
        result:res?.user
    })
  },
};
