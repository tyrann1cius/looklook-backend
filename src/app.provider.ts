import { Connection } from 'mongoose';
import { PromotionSchema } from './schemas/promotion.schema';

export const appProviders = [
  {
    provide: 'PROMOTION_MODEL',
    useFactory: (connection: Connection) =>
      connection.model('Promotion', PromotionSchema),
    inject: ['DATABASE_CONNECTION'],
  },
];
