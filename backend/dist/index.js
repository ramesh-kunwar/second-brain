"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
const express_1 = __importDefault(require("express"));
const bcryptjs_1 = __importDefault(require("bcryptjs"));
const user_model_1 = require("./models/user.model");
const connectDb_1 = require("./config/connectDb");
const app = (0, express_1.default)();
app.use(express_1.default.json());
(0, connectDb_1.connectDb)();
console.log(process.env.DATABASE_URL);
app.get("/ping", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    res.json({
        msg: "Ping...",
    });
}));
app.post("/api/v1/signup", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { username, email, password } = req.body;
    try {
        if (!email || !password) {
            throw new Error("All fields are required");
        }
        const hashedPassword = bcryptjs_1.default.hashSync(password, 10);
        const user = yield user_model_1.UserModel.create({
            username,
            email,
            password: hashedPassword,
        });
        res.status(201).json({
            success: true,
            msg: "User created successfully",
            data: user,
        });
    }
    catch (error) {
        console.log(error);
        res.status(500).json({
            success: false,
            error: "Sing Up failed",
        });
    }
}));
app.post("/api/v1/content", (req, res) => { });
app.delete("/api/v1/content", (req, res) => { });
app.get("/api/v1/brain/:shareLink", (req, res) => { });
app.listen(4000, () => {
    console.log(`App is running at port 4000`);
});
