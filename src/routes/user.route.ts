import { Router } from "express";

// 5. Definir un middleware a nivel de router.
const routerUser = Router();

routerUser.use((req, res, next) => {
    console.log("Middleware de routerUser");
    next();
});

routerUser.get("/user", (req, res) => {
    res.send("User");
});

export default routerUser;
