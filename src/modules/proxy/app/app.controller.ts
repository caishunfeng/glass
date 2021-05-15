import { Controller, All, Post, Req, RequestMethod, Inject } from '@nestjs/common';
import { Request } from 'express';
import { AppService } from './app.service';

@Controller()
export class AppController {

  @Inject()
  private appService: AppService;

  @All('*')
  forwarding(@Req() request: Request) {
    const { url, originalUrl, baseUrl, hostname, path, method, headers, ip, ips, protocol, subdomains, params, body, } = request;
    console.log({ url, originalUrl, baseUrl, hostname, path, method, headers, ip, ips, protocol, subdomains, params, body, });
    return this.appService.forwarding({ hostname, originalUrl, method, body, headers });
  }
}
