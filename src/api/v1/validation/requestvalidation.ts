import Joi from "joi";

export const requestSchema = Joi.object({
  binId: Joi.string().required(),
  residentName: Joi.string().min(2).required(),
  description: Joi.string().min(5).required(),
  status: Joi.string().valid("open", "in_progress", "completed").required()
});
