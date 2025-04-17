import { atom } from 'jotai';

/** 查看广告查询 */
export const faceBookConfigQueryAtom = atom<any>(undefined);
/** 注册数据排序字段 */
export const faceBookOrderRegisterAtom = atom<string>('');
/** 充值订阅排序字段 */
export const faceBookOrderPaySubAtom = atom<string>('');
/** 首日付费率排序字段 */
export const faceBookOrderFirstDayPayRateAtom = atom<string>('');  
/** 广告账户余额 */
export const faceBookAvailableSpentAtom = atom<string>('');
/** 广告账户消费金额 */
export const faceBookSpendAtom = atom<string>('');
/** 回收金额 */
export const faceBookOrderAmountAtom = atom<string>('');
/** roi */
export const faceBookRoiAtom = atom<string>('');

