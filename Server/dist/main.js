/*
 * ATTENTION: The "eval" devtool has been used (maybe by default in mode: "development").
 * This devtool is neither made for production nor for readable output files.
 * It uses "eval()" calls to create a separate source file in the browser devtools.
 * If you are trying to read the output file, select a different devtool (https://webpack.js.org/configuration/devtool/)
 * or disable the default devtool with "devtool: false".
 * If you are looking for production-ready output files, see mode: "production" (https://webpack.js.org/configuration/mode/).
 */
/******/ (() => { // webpackBootstrap
/******/ 	var __webpack_modules__ = ({

/***/ "./db.js":
/*!***************!*\
  !*** ./db.js ***!
  \***************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

eval("const mongoose = __webpack_require__(/*! mongoose */ \"mongoose\");\n// const dotenv = require('dotenv')\n// dotenv.config();\n\nconst connectToMongo = () => {\n  mongoose.connect(process.env.mongoURI).then(() => {\n    console.log(\"connected to Mongoose\");\n  }).catch(error => {\n    console.log(error);\n  });\n};\nmodule.exports = connectToMongo;\n\n//# sourceURL=webpack://notepad/./db.js?");

/***/ }),

/***/ "./index.js":
/*!******************!*\
  !*** ./index.js ***!
  \******************/
/***/ ((__unused_webpack_module, __unused_webpack_exports, __webpack_require__) => {

eval("const express = __webpack_require__(/*! express */ \"express\");\nconst dotenv = __webpack_require__(/*! dotenv */ \"dotenv\");\nconst connectToMongo = __webpack_require__(/*! ./db */ \"./db.js\");\nconst userRouter = __webpack_require__(/*! ./routes/auth */ \"./routes/auth.js\");\nconst notes = __webpack_require__(/*! ./routes/notes */ \"./routes/notes.js\");\nconst cors = __webpack_require__(/*! cors */ \"cors\");\nconst app = express();\napp.use(cors());\ndotenv.config();\nconnectToMongo();\napp.use(express.json());\n\n// Require paths\napp.use('/api/user', userRouter);\napp.use('/api/notes', notes);\napp.get(\"/\", (req, res) => {\n  // console.log(\"app is initialised\")\n  res.send(\"hello there\");\n});\napp.listen(process.env.port, () => {\n  console.log(\"app is listing to port 5000\");\n});\n\n//# sourceURL=webpack://notepad/./index.js?");

/***/ }),

/***/ "./middleware/getuser.js":
/*!*******************************!*\
  !*** ./middleware/getuser.js ***!
  \*******************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

eval("const jwt = __webpack_require__(/*! jsonwebtoken */ \"jsonwebtoken\");\nconst fetchUser = (req, res, next) => {\n  const token = req.header(\"auth-token\");\n  if (!token) {\n    res.status(401).send({\n      err: \"authenticate using valid token\"\n    });\n  }\n  try {\n    const data = jwt.verify(token, process.env.JWT_Secret);\n    // console.log({data})\n    req.user = data;\n    // console.log({datauser:data})\n    next();\n  } catch (err) {\n    console.log({\n      err\n    });\n    return res.status(500).json({\n      err: err.message\n    });\n  }\n};\nmodule.exports = fetchUser;\n\n//# sourceURL=webpack://notepad/./middleware/getuser.js?");

/***/ }),

/***/ "./modules/NotesSchema.js":
/*!********************************!*\
  !*** ./modules/NotesSchema.js ***!
  \********************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

eval("const mongoose = __webpack_require__(/*! mongoose */ \"mongoose\");\nconst notesSchema = mongoose.Schema({\n  user: {\n    type: mongoose.Schema.Types.ObjectId,\n    ref: 'User'\n  },\n  title: {\n    type: String,\n    require: true\n  },\n  description: {\n    type: String,\n    require: true\n  },\n  tag: {\n    type: String\n  },\n  date: {\n    type: Date,\n    default: Date.now\n  }\n});\nconst Notes = mongoose.model('Notes', notesSchema);\nmodule.exports = Notes;\n\n//# sourceURL=webpack://notepad/./modules/NotesSchema.js?");

/***/ }),

/***/ "./modules/UserSchema.js":
/*!*******************************!*\
  !*** ./modules/UserSchema.js ***!
  \*******************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

eval("const mongoose = __webpack_require__(/*! mongoose */ \"mongoose\");\nconst userSchema = mongoose.Schema({\n  name: {\n    type: String,\n    require: true\n  },\n  email: {\n    type: String,\n    require: true\n  },\n  password: {\n    type: String,\n    require: true\n  },\n  date: {\n    type: Date,\n    default: Date.now\n  }\n});\nconst User = mongoose.model('User', userSchema);\nmodule.exports = User;\n\n//# sourceURL=webpack://notepad/./modules/UserSchema.js?");

/***/ }),

/***/ "./routes/auth.js":
/*!************************!*\
  !*** ./routes/auth.js ***!
  \************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

eval("const express = __webpack_require__(/*! express */ \"express\");\nconst User = __webpack_require__(/*! ../modules/UserSchema */ \"./modules/UserSchema.js\");\nconst router = express.Router();\nconst {\n  body,\n  validationResult\n} = __webpack_require__(/*! express-validator */ \"express-validator\");\nconst bcrypt = __webpack_require__(/*! bcrypt */ \"bcrypt\");\nconst jwt = __webpack_require__(/*! jsonwebtoken */ \"jsonwebtoken\");\nconst fetchUser = __webpack_require__(/*! ../middleware/getuser */ \"./middleware/getuser.js\");\n\n// create user using :POST /api/auth\nrouter.post('/create', [body('name', \"Name should not be empty\").notEmpty(), body('email', \"email invalid\").isEmail(), body('password', 'Should be at least 8 characters').isLength({\n  min: 8\n})], async (req, res) => {\n  let success = false; // Use let instead of const\n  try {\n    // Validate that request data is appropriate (using express-validator)\n    const result = validationResult(req);\n    if (!result.isEmpty()) {\n      return res.status(400).send({\n        success: false,\n        result: result.array()\n      });\n    }\n\n    // check if user already exists\n    const {\n      email\n    } = req.body;\n    const existingUser = await User.findOne({\n      email\n    }, {\n      email: 1\n    });\n    if (existingUser) {\n      return res.status(400).json({\n        success: false,\n        message: \"User Already Exists\"\n      });\n    }\n    const salt = await bcrypt.genSalt(10);\n    const secPassword = await bcrypt.hash(req.body.password, salt);\n    const data = {\n      name: req.body.name,\n      email: req.body.email,\n      password: secPassword\n    };\n    const user = await User.create(data);\n    const token = jwt.sign(user.id, process.env.JWT_Secret);\n    success = true;\n    return res.status(201).json({\n      success: true,\n      token: token\n    });\n  } catch (err) {\n    console.error(err.message);\n    res.status(400).json({\n      success,\n      err: err.message\n    });\n  }\n});\n\n// authenticate user using post, {No login require}\n\nrouter.post('/login', [body('email', 'Enter Valid Email').isEmail(), body('password', \"Enter a Valid Password\").exists()], async (req, res) => {\n  const error = validationResult(req);\n  if (!error.isEmpty()) {\n    return res.status(400).json({\n      success: false,\n      error\n    });\n  }\n  try {\n    const {\n      email,\n      password\n    } = req.body;\n    const user = await User.findOne({\n      email\n    });\n    if (!user) {\n      return res.status(400).json({\n        success: false,\n        msg: \"Invalid Credentials\"\n      });\n    }\n    const passwordCompare = bcrypt.compare(password, user.password);\n    if (!passwordCompare) {\n      return res.status(400).json({\n        success: false,\n        msg: \"Invalid Credentials\"\n      });\n    }\n    const auth = jwt.sign(user.id, process.env.JWT_Secret);\n    const authToken = auth.toString();\n    res.status(201).json({\n      success: true,\n      authToken\n    });\n    //    return res.status(201).json({user})\n  } catch (err) {\n    console.log({\n      err\n    });\n    return res.status(500).json({\n      err: err.message\n    });\n  }\n});\n\n// route -3 getting user details with post using fetchUser middelware\n\nrouter.post('/getuser', fetchUser, async (req, res) => {\n  try {\n    const userid = req.user;\n    const userData = await User.findById(userid).select(\"-password\");\n    return res.status(200).json({\n      userData\n    });\n  } catch (err) {\n    return res.status(500).json({\n      err: err.message\n    });\n  }\n});\nmodule.exports = router;\n\n//# sourceURL=webpack://notepad/./routes/auth.js?");

/***/ }),

/***/ "./routes/notes.js":
/*!*************************!*\
  !*** ./routes/notes.js ***!
  \*************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

eval("const express = __webpack_require__(/*! express */ \"express\");\nconst Notes = __webpack_require__(/*! ../modules/NotesSchema */ \"./modules/NotesSchema.js\");\nconst router = express.Router();\nconst fetchUser = __webpack_require__(/*! ../middleware/getuser */ \"./middleware/getuser.js\");\nconst {\n  body,\n  validationResult\n} = __webpack_require__(/*! express-validator */ \"express-validator\");\n\n// Route 1 : to fetch all notes of the user using get method /api/notes/getnotes  \nrouter.get('/getnotes', fetchUser, async (req, res) => {\n  try {\n    const notes = await Notes.find({\n      user: req.user\n    });\n    res.status(200).json(notes);\n  } catch (err) {\n    console.log(err);\n  }\n});\n\n// Route 2: to create a new note using post requiest /api/notes/addnote \nrouter.post('/addnote', fetchUser, [body('title', \"Title should be atleant 5 char\").isLength({\n  min: 5\n}), body('description', \"  description should be atleant 5 char\").isLength({\n  min: 5\n})], async (req, res) => {\n  const err = validationResult(req);\n  if (!err.isEmpty()) {\n    return res.status(400).json({\n      err\n    });\n  }\n  try {\n    const note = {\n      title: req.body.title,\n      description: req.body.description,\n      tag: req.body.tag,\n      user: req.user\n    };\n    const savenote = await Notes.create(note);\n    res.status(200).json(savenote);\n    // console.log(note)\n  } catch (error) {\n    console.log({\n      error\n    });\n    return res.status(500).json({\n      err: error.message\n    });\n  }\n});\n\n// Route 3 : updating a note using put request /api/notes/updatenote\n\nrouter.put('/updatenote/:id', fetchUser, async (req, res) => {\n  try {\n    const {\n      title,\n      description,\n      tag\n    } = req.body;\n    const newNote = {};\n    if (title) {\n      newNote.title = title;\n    }\n    if (description) {\n      newNote.description = description;\n    }\n    if (tag) {\n      newNote.tag = tag;\n    }\n    const note = await Notes.findById(req.params.id);\n    if (!note) {\n      return res.status(401).send(\"Note Not found\");\n    }\n    //   console.log(note.user.toString())\n    //   console.log(typeof note.user)\n    if (note.user.toString() !== req.user) {\n      return res.status(401).send(\"Invalid Request\");\n    }\n    const updatedNote = await Notes.findByIdAndUpdate(req.params.id, {\n      $set: newNote\n    }, {\n      new: true\n    });\n    //    console.log(updatedNote)\n    return res.status(200).json(updatedNote);\n  } catch (error) {\n    console.log({\n      error\n    });\n    return res.status(500).json({\n      err: error.message\n    });\n  }\n});\n\n// Route 4 : find element and delete it /api/notes/deletenote\nrouter.delete('/delete/:id', fetchUser, async (req, res) => {\n  try {\n    const note = await Notes.findById(req.params.id);\n    if (!note) {\n      return res.status(401).json({\n        success: false,\n        msg: \"Note Not found\"\n      });\n    }\n    if (note.user.toString() !== req.user) {\n      return res.status(404).json({\n        success: false,\n        msg: \"Invalid Request\"\n      });\n    }\n    const deletenote = await Notes.findByIdAndDelete(req.params.id);\n    return res.status(200).json({\n      success: true,\n      msg: \"Note Deleted Successfully\"\n    });\n  } catch (error) {\n    console.log({\n      error\n    });\n    return res.status(500).json({\n      success: false,\n      err: error.message\n    });\n  }\n});\nmodule.exports = router;\n\n//# sourceURL=webpack://notepad/./routes/notes.js?");

/***/ }),

/***/ "bcrypt":
/*!*************************!*\
  !*** external "bcrypt" ***!
  \*************************/
/***/ ((module) => {

"use strict";
module.exports = require("bcrypt");

/***/ }),

/***/ "cors":
/*!***********************!*\
  !*** external "cors" ***!
  \***********************/
/***/ ((module) => {

"use strict";
module.exports = require("cors");

/***/ }),

/***/ "dotenv":
/*!*************************!*\
  !*** external "dotenv" ***!
  \*************************/
/***/ ((module) => {

"use strict";
module.exports = require("dotenv");

/***/ }),

/***/ "express":
/*!**************************!*\
  !*** external "express" ***!
  \**************************/
/***/ ((module) => {

"use strict";
module.exports = require("express");

/***/ }),

/***/ "express-validator":
/*!************************************!*\
  !*** external "express-validator" ***!
  \************************************/
/***/ ((module) => {

"use strict";
module.exports = require("express-validator");

/***/ }),

/***/ "jsonwebtoken":
/*!*******************************!*\
  !*** external "jsonwebtoken" ***!
  \*******************************/
/***/ ((module) => {

"use strict";
module.exports = require("jsonwebtoken");

/***/ }),

/***/ "mongoose":
/*!***************************!*\
  !*** external "mongoose" ***!
  \***************************/
/***/ ((module) => {

"use strict";
module.exports = require("mongoose");

/***/ })

/******/ 	});
/************************************************************************/
/******/ 	// The module cache
/******/ 	var __webpack_module_cache__ = {};
/******/ 	
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/ 		// Check if module is in cache
/******/ 		var cachedModule = __webpack_module_cache__[moduleId];
/******/ 		if (cachedModule !== undefined) {
/******/ 			return cachedModule.exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = __webpack_module_cache__[moduleId] = {
/******/ 			// no module.id needed
/******/ 			// no module.loaded needed
/******/ 			exports: {}
/******/ 		};
/******/ 	
/******/ 		// Execute the module function
/******/ 		__webpack_modules__[moduleId](module, module.exports, __webpack_require__);
/******/ 	
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/ 	
/************************************************************************/
/******/ 	
/******/ 	// startup
/******/ 	// Load entry module and return exports
/******/ 	// This entry module can't be inlined because the eval devtool is used.
/******/ 	var __webpack_exports__ = __webpack_require__("./index.js");
/******/ 	
/******/ })()
;