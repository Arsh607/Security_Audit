import Joi from "joi";

export const binSchema = Joi.object({
  location: Joi.string().min(3).required(),
  type: Joi.string().valid("recyclable", "organic", "general").required(),
  fillLevel: Joi.number().integer().min(0).max(100).required()
});
