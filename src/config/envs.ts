/**
 * 环境
 */
export enum EnumENV {
    /** 生产环境 */
    Prod = 'prod',
    /** 测试环境 */
    Test = 'test',
    /** 开发环境 */
    Dev = 'dev',
    /** 本地 */
    Local = 'local',
}


const { UAE_MODE, NODE_ENV } = process.env;

export const isUAE = UAE_MODE ? true : false;

export const Env = isUAE ? UAE_MODE.toLowerCase() : NODE_ENV;

export const isLocal = Env === EnumENV.Local;

export const isDev = Env === EnumENV.Dev;

export const isTest = Env === EnumENV.Test;

export const isProd = Env === EnumENV.Prod;