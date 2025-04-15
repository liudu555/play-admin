import { atomWithStorage } from 'jotai/utils'

/** 用户信息 */
export const userAtom = atomWithStorage('userInfo', undefined)

/** token */
export const tokenAtom = atomWithStorage('token', undefined)

/** refreshToken */
export const refreshTokenAtom = atomWithStorage('refreshToken', undefined)

