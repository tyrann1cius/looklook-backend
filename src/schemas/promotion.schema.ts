import * as mongoose from 'mongoose';

export const PromotionSchema = new mongoose.Schema({
  promoId: String,
  title: String,
  types: Array,
  partners: Array,
  description: String,
  isActive: Boolean,
  start: Date,
  end: Date,
  redeemUrl: String,
  redeemedUsers: Array,
});
