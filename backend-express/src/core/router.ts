import {Router, json, Request, Response} from "express";
import fileUpload from "express-fileupload";
import * as userController from "../controllers/userController.js";
import * as profilePhotoController from "../controllers/profilePhotoController.js";
import * as authController from "../controllers/authController.js";
import {authenticateAccessToken, authenticateRefreshToken} from "../middleware/authenticate.js";
import {defaultNotFound, respond} from "../core/respond.js";



const router = Router();

router.route("/users")
.post(json(), userController.handleCreateUserAccount)
.get(authenticateAccessToken, userController.handleGetUser);


router.route("/auth")
.post(json(), authController.handleLogin)
.delete(authController.handleLogout)
.put(authenticateRefreshToken, authController.handleRefreshSession);


router.route("/profile_photos")
.post([authenticateAccessToken, fileUpload()], profilePhotoController.handleUploadProfilePhoto)
.get([authenticateAccessToken], profilePhotoController.handleGetProfilePhoto);


router.route("*")
.all((_: Request, response: Response) => respond(response, defaultNotFound));



export default router;