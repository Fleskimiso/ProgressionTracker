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
Object.defineProperty(exports, "__esModule", { value: true });
exports.validatePlan = exports.putPlan = exports.getPlan = void 0;
const UserModel_1 = require("../models/UserModel");
const PlanModel_1 = require("../models/PlanModel");
const plan_1 = require("../validators/plan");
const getPlan = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    var _a;
    if (req.session.currentUser) {
        try {
            const user = yield UserModel_1.UserModel.findById((_a = req.session.currentUser) === null || _a === void 0 ? void 0 : _a._id)
                .populate("plan");
            if (user) {
                return res.status(200).json({
                    plan: user.plan
                });
            }
            else {
                res.status(404).json({ message: "plan not found" });
            }
        }
        catch (error) {
            res.status(500).json({ message: "Internal server error" });
        }
    }
});
exports.getPlan = getPlan;
const putPlan = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    var _b;
    if (req.session.currentUser) {
        try {
            const user = yield UserModel_1.UserModel.findById((_b = req.session.currentUser) === null || _b === void 0 ? void 0 : _b._id);
            if (user) {
                const userPlan = yield PlanModel_1.PlanModel.findById(user.plan);
                if (userPlan) {
                    userPlan.currentDay = req.body.plan.currentDay;
                    userPlan.workouts = req.body.plan.workouts;
                    yield userPlan.save();
                    return res.status(200).json({
                        message: "plan updated"
                    });
                }
                else {
                    res.status(404).json({ message: "Server was not able to modify plan" });
                }
            }
            else {
                res.status(404).json({ message: "User was not found" });
            }
        }
        catch (error) {
            res.status(500).json({ message: "Plan update failed" });
        }
    }
});
exports.putPlan = putPlan;
const validatePlan = (req, res, next) => {
    const { error } = plan_1.planFormSchema.validate(req.body);
    if (!error) {
        return next();
    }
    res.status(400).json({ message: error === null || error === void 0 ? void 0 : error.message });
};
exports.validatePlan = validatePlan;
//# sourceMappingURL=plan.js.map