import qs from 'qs';
import { message } from 'antd';
import config from '@/config';
import { StatusCode } from '@/constants/statusCode';

export interface RequestOptions extends RequestInit {
  // 不显示错误提示
  noErrorMessage?: boolean;
}

export interface ResponseOptions<T = unknown> {
  code: number;
  msg: string | null;
  data?: T | null;
}

function errorHandler(data: ResponseOptions, noErrorMessage = false) {
  if (data.code === StatusCode.Success) {
    return data;
  }

  if (!noErrorMessage) {
    message.warning(data.msg);
  }

  return data;
}

function resolveUrl(url: string) {
  return /^(http|https)/.test(url) ? url : `${config.serverUrl}${url}`;
}

export default async function request<T = unknown>(url: string, options: RequestOptions) {
  const { noErrorMessage, ...restOptions } = options;
  const options_: RequestInit = {};

  Object.assign(options_, {
    mode: 'cors',
    credentials: 'include',
    ...restOptions,
    headers: {
      'Content-Type': 'application/json;charset=utf-8',
      ...restOptions.headers,
    },
  });

  try {
    const response = await fetch(resolveUrl(url), options_);
    const data = (await response.json()) as ResponseOptions<T>;
    return errorHandler(data, noErrorMessage);
  } catch (error) {
    const errData = {
      code: StatusCode.NetworkError,
      msg: '网络错误，请稍后重试！',
    };
    return errorHandler(errData, noErrorMessage);
  }
}

export function get<T>(url: string, params: Record<string, string | number>, opts: ResponseOptions) {
  const url_ = params ? `${url}?${qs.stringify(params)}` : url;
  return request<T>(url_, { ...opts, method: 'GET' });
}

export function post<T>(url: string, data: Record<string, any>, opts: ResponseOptions) {
  return request<T>(url, { ...opts, method: 'POST', body: JSON.stringify(data) });
}

export function del<T>(url: string, params: Record<string, string | number>, opts: ResponseOptions) {
  const url_ = params ? `${url}?${qs.stringify(params)}` : url;
  return request<T>(url_, { ...opts, method: 'DELETE' });
}

export function put<T>(url: string, data: Record<string, any>, opts: ResponseOptions) {
  return request<T>(url, { ...opts, method: 'PUT', body: JSON.stringify(data) });
}

export function patch<T>(url: string, data: Record<string, any>, opts: ResponseOptions) {
  return request<T>(url, { ...opts, method: 'PATCH', body: JSON.stringify(data) });
}
