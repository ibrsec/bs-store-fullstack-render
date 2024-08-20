"use strict";

const mongoose = require("mongoose");
const passwordEncrypter = require("../helpers/passwordEncrypter");
const validatePassword = require("../helpers/validatePassword");

const userSchema = new mongoose.Schema(
  {
    email: {
      type: String,
      trim: true,
      unique: true,
      requried: true,
      lowercase: true,
      maxLength:70,
      match: [/.+@.+\..+/, 'Please fill a valid email address'],
    },
    password: {
        type:String,
        trim:true,
        required:true,
        set: (password)=> {
            if(validatePassword(password)){ 
                return passwordEncrypter(password);
            }else{
              return 'Invalid password type - Password must be between 8 and 16 characters long, and include at least one uppercase letter, one lowercase letter, one number, and one special character - [.?!@#$%&*]'

            }
        },
        validate : (password) => {
            if(password==='Invalid password type - Password must be between 8 and 16 characters long, and include at least one uppercase letter, one lowercase letter, one number, and one special character - [.?!@#$%&*]'){
              return false
            }else{
              return true;
            }
        }

    },
    isAdmin:{
      type:Boolean,
      default:false,
    }
  },
  { collection: "users", timestamps: true }
);

module.exports.User = mongoose.model("User", userSchema);

