import * as mongoose from 'mongoose';

export const PromotionSchema = new mongoose.Schema({
  id: String,
  title: String,
  types: Array,
  partners: Array,
  description: String,
  isActive: Boolean,
  start: Date,
  end: Date,
  redeemUrl: String,
});
