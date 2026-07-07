"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = require("mongoose");
const bcrypt_1 = __importDefault(require("bcrypt"));
const userSchema = new mongoose_1.Schema({
    name: {
        type: String,
        required: true,
        trim: true,
    },
    email: {
        type: String,
        required: true,
        unique: true,
        lowercase: true,
        trim: true,
    },
    password: {
        type: String,
        required: true,
        minlength: 6,
        select: false,
    },
    role: {
        type: String,
        enum: ["admin", "manager", "employee"],
        default: "employee",
    },
    avatar: {
        type: String,
        default: "",
    },
    isDeleted: {
        type: Boolean,
        default: false,
    },
}, {
    timestamps: true,
});
// Hash password before saving
userSchema.pre("save", async function () {
    if (!this.isModified("password")) {
        return;
    }
    this.password = await bcrypt_1.default.hash(this.password, 10);
});
const User = (0, mongoose_1.model)("User", userSchema);
exports.default = User;
//# sourceMappingURL=user.model.js.map