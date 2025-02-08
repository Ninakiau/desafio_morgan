import cookieParser from "cookie-parser";
import express, { Router} from "express";
import type { Request, Response, NextFunction } from "express";
import { globalMiddleware } from "./middleware/global.middleware";
import morgan from "morgan";
import routerUser  from "./routes/user.route";
const app = express();

//1. y 2. Configuración de los middlewares 
app.use(express.json());
app.use(cookieParser());
app.use(morgan("dev"));

//3. Middleware a nivel de aplicación 
app.use(globalMiddleware);

app.get("/", (req, res) => {
  res.send( "Hello World" );
});

//Declaración de las rutas
app.use("/api/user", routerUser);

const messages: string[] = []

app.post("/message", (req, res) => {
    const { message } = req.body;
    messages.push(message);
    res.send("Message added");     
});

app.get("/message", (req, res) => {    
    const message = messages.shift();

    if(message) {
        res.send(message);
    } else {
        res.status(204).end();
    }
});


//4. y 8. Probar middleware de errores'
app.get("/error", (req, res) => {
    throw new Error("Error de ejemplo");
  });

//4. y 8. Middleware de errores'
app.use((err: Error, req:Request, res: Response, next: NextFunction) => {
    console.log(err.message);
    res.status(500).send("Internal Server Error");
});

app.listen(3000, () => {
  console.log("Server is running on http://localhost:3000");
});
