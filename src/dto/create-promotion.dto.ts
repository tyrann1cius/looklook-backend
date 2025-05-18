export class CreatePromotionDto {
  readonly promoId: string;
  readonly title: string;
  readonly types: Array<string>;
  readonly partners: Array<string>;
  readonly description: string;
  readonly isActive: boolean;
  readonly start: Date;
  readonly end: Date;
  readonly redeemUrl: string;
}
