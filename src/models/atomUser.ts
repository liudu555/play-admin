import { atomWithStorage, createJSONStorage } from 'jotai/utils'

/** 用户信息 */
export const userAtom = atomWithStorage('userInfo', undefined,createJSONStorage(() => localStorage))

/** token */
export const tokenAtom = atomWithStorage('token',undefined,createJSONStorage(() => window.localStorage))

/** refreshToken */
export const refreshTokenAtom = atomWithStorage('refreshToken', undefined,createJSONStorage(() => localStorage))


/** token过期时间 */
export const accessExpireAtom = atomWithStorage('accessExpire', undefined,createJSONStorage(() => localStorage))


