import { Router } from "express";

import { login } from "../authentification/login.js";
const routeAuth=Router()
routeAuth.post('/',login)

export default routeAuth;