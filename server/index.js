import { config } from "dotenv";
import  express  from "express";
import cors from "cors";
import { connectdb } from "./db.js";
import userRoutes from "./routes/users.js"
import authRoutes from "./routes/auth.js"
config();

connectdb();
const app = express();
app.use(express.json())
app.use(cors());

app.use("/user",userRoutes)
app.use("/auth",authRoutes)

const port = process.env.port || 8080;
app.listen(port,() => console.log(`Server running on port : ${port}...`))


