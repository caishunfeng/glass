import { Injectable } from '@nestjs/common';
import axios from 'axios';
import { IncomingHttpHeaders } from 'http';
import * as _ from 'lodash';
import { Env } from 'src/config/envs';

const DomainPathMap = {
  'local': '.proxy.local',
  'dev': '.proxy.dev',
  'test': '.proxy.test',
  'prod': '.proxy.prod',
}

@Injectable()
export class AppService {

  constructor() { }

  async forwarding(params: {
    hostname: string,
    method: string,
    originalUrl: string,
    body: string,
    headers: IncomingHttpHeaders,
  }) {
    const { hostname, method, originalUrl, body, headers } = params;
    const paths = _.split(originalUrl, '/');
    if (!paths || paths.length === 0) {
      throw new Error(`path parse error, path:${originalUrl}`);
    }
    const forwardDomainPredix = paths[0];
    const { env } = headers;

    let forwardRes;
    let forwardUrl: string;
    if (env && Env !== env) {
      // 不同环境下转发
      const domainPath = DomainPathMap[String(env)];
      if (!domainPath) {
        throw new Error(`error env, env: ${env}`);
      }
      const glassDomainPrefix = _.split(hostname, '.')[0];
      forwardUrl = glassDomainPrefix + domainPath + originalUrl;
    } else {
      // 当前环境转发
      const domainPath = DomainPathMap[Env];
      forwardUrl = forwardDomainPredix + domainPath + originalUrl;
    }

    try {
      switch (method) {
        case 'GET':
          forwardRes = await axios.get(forwardUrl);
          break;
        case 'POST':
          forwardRes = await axios.post(forwardUrl, body);
      }
    } catch (error) {
      console.error(`error forward request`, { forwardUrl, method, env });
      forwardRes = {
        code: -1,
        msg: 'error forward request',
        error,
      }
    }

    return forwardRes;
  }
}
