"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.planRouter = void 0;
const express_1 = __importDefault(require("express"));
const plan_1 = require("../controllers/plan");
const middleware_1 = require("../middleware");
exports.planRouter = express_1.default.Router();
exports.planRouter.get("/plans", middleware_1.isLoggedIn, plan_1.getPlan);
//you only modify your  current plan
exports.planRouter.put("/plans", middleware_1.isLoggedIn, plan_1.validatePlan, plan_1.putPlan);
//# sourceMappingURL=plan.js.map