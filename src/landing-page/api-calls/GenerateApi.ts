/* eslint-disable */
/* tslint:disable */
/*
 * ---------------------------------------------------------------
 * ## THIS FILE WAS GENERATED VIA SWAGGER-TYPESCRIPT-API        ##
 * ##                                                           ##
 * ## AUTHOR: acacode                                           ##
 * ## SOURCE: https://github.com/acacode/swagger-typescript-api ##
 * ---------------------------------------------------------------
 */

export interface CreateUrlDtoResponse {
  id: string;
  longUrl: string;
  shortUrl: string;
  /** @format date-time */
  createDateTime: string;
}

export interface CreatetUrlDtoRequest {
  longUrl: string;
}

export interface GetUrlByShortUrlDtoResponse {
  id: string;
  longUrl: string;
  shortUrl: string;
  /** @format date-time */
  createDateTime: string;
}

export interface CreateUrlHitDtoResponse {
  id: string;
  urlId: string;
  /** @format date-time */
  createDateTime: string;
}

export interface CreateUrlHitDtoRequest {
  urlId: string;
}

export interface UpdateUrlHitDto {
  id?: string;
  urlId?: string;
  /** @format date-time */
  createDateTime?: string;
}

export interface SignUpDtoRequest {
  email: string;
  password: string;
  firstName: string;
  lastName: string;
}

export interface SignInDtoResponse {
  token: string;
  refreshToken: string;
}

export interface SignInDtoRequest {
  email: string;
  password: string;
}

export interface RefreshTokenDtoRequest {
  refreshToken: string;
}

export interface VerifyEmailDtoRequest {
  emailConfirmationToken: string;
}

export interface ResendVerificationEmailDtoRequest {
  email: string;
}

import axios, { AxiosInstance, AxiosRequestConfig, AxiosResponse, HeadersDefaults, ResponseType } from "axios";

export type QueryParamsType = Record<string | number, any>;

export interface FullRequestParams extends Omit<AxiosRequestConfig, "data" | "params" | "url" | "responseType"> {
  /** set parameter to `true` for call `securityWorker` for this request */
  secure?: boolean;
  /** request path */
  path: string;
  /** content type of request body */
  type?: ContentType;
  /** query params */
  query?: QueryParamsType;
  /** format of response (i.e. response.json() -> format: "json") */
  format?: ResponseType;
  /** request body */
  body?: unknown;
}

export type RequestParams = Omit<FullRequestParams, "body" | "method" | "query" | "path">;

export interface ApiConfig<SecurityDataType = unknown> extends Omit<AxiosRequestConfig, "data" | "cancelToken"> {
  securityWorker?: (
    securityData: SecurityDataType | null
  ) => Promise<AxiosRequestConfig | void> | AxiosRequestConfig | void;
  secure?: boolean;
  format?: ResponseType;
}

export enum ContentType {
  Json = "application/json",
  FormData = "multipart/form-data",
  UrlEncoded = "application/x-www-form-urlencoded",
  Text = "text/plain"
}

export class HttpClient<SecurityDataType = unknown> {
  public instance: AxiosInstance;
  private securityData: SecurityDataType | null = null;
  private securityWorker?: ApiConfig<SecurityDataType>["securityWorker"];
  private secure?: boolean;
  private format?: ResponseType;

  constructor({ securityWorker, secure, format, ...axiosConfig }: ApiConfig<SecurityDataType> = {}) {
    this.instance = axios.create({ ...axiosConfig, baseURL: axiosConfig.baseURL || "" });
    this.secure = secure;
    this.format = format;
    this.securityWorker = securityWorker;
  }

  public setSecurityData = (data: SecurityDataType | null) => {
    this.securityData = data;
  };

  protected mergeRequestParams(params1: AxiosRequestConfig, params2?: AxiosRequestConfig): AxiosRequestConfig {
    const method = params1.method || (params2 && params2.method);

    return {
      ...this.instance.defaults,
      ...params1,
      ...(params2 || {}),
      headers: {
        ...((method && this.instance.defaults.headers[method.toLowerCase() as keyof HeadersDefaults]) || {}),
        ...(params1.headers || {}),
        ...((params2 && params2.headers) || {})
      }
    };
  }

  protected stringifyFormItem(formItem: unknown) {
    if (typeof formItem === "object" && formItem !== null) {
      return JSON.stringify(formItem);
    } else {
      return `${formItem}`;
    }
  }

  protected createFormData(input: Record<string, unknown>): FormData {
    return Object.keys(input || {}).reduce((formData, key) => {
      const property = input[key];
      const propertyContent: any[] = property instanceof Array ? property : [property];

      for (const formItem of propertyContent) {
        const isFileType = formItem instanceof Blob || formItem instanceof File;
        formData.append(key, isFileType ? formItem : this.stringifyFormItem(formItem));
      }

      return formData;
    }, new FormData());
  }

  public request = async <T = any, _E = any>({
    secure,
    path,
    type,
    query,
    format,
    body,
    ...params
  }: FullRequestParams): Promise<AxiosResponse<T>> => {
    const secureParams =
      ((typeof secure === "boolean" ? secure : this.secure) &&
        this.securityWorker &&
        (await this.securityWorker(this.securityData))) ||
      {};
    const requestParams = this.mergeRequestParams(params, secureParams);
    const responseFormat = format || this.format || undefined;

    if (type === ContentType.FormData && body && body !== null && typeof body === "object") {
      body = this.createFormData(body as Record<string, unknown>);
    }

    if (type === ContentType.Text && body && body !== null && typeof body !== "string") {
      body = JSON.stringify(body);
    }

    return this.instance.request({
      ...requestParams,
      headers: {
        ...(requestParams.headers || {}),
        ...(type && type !== ContentType.FormData ? { "Content-Type": type } : {})
      },
      params: query,
      responseType: responseFormat,
      data: body,
      url: path
    });
  };
}

/**
 * @title API gateway
 * @version 1.0
 */
export class Api<SecurityDataType extends unknown> extends HttpClient<SecurityDataType> {
  api = {
    /**
     * No description
     *
     * @tags URL
     * @name UrlControllerCreate
     * @request POST:/api/url
     */
    urlControllerCreate: (data: CreatetUrlDtoRequest, params: RequestParams = {}) =>
      this.request<CreateUrlDtoResponse, void>({
        path: `/api/url`,
        method: "POST",
        body: data,
        type: ContentType.Json,
        format: "json",
        ...params
      }),

    /**
     * No description
     *
     * @tags URL
     * @name UrlControllerFindAll
     * @request GET:/api/url
     */
    urlControllerFindAll: (params: RequestParams = {}) =>
      this.request<void, any>({
        path: `/api/url`,
        method: "GET",
        ...params
      }),

    /**
     * No description
     *
     * @tags URL
     * @name UrlControllerGetUrlByShortUrl
     * @request GET:/api/url/{shortUrl}
     */
    urlControllerGetUrlByShortUrl: (shortUrl: string, params: RequestParams = {}) =>
      this.request<GetUrlByShortUrlDtoResponse, void>({
        path: `/api/url/${shortUrl}`,
        method: "GET",
        format: "json",
        ...params
      }),

    /**
     * No description
     *
     * @tags URL
     * @name UrlControllerRemove
     * @request DELETE:/api/url/{id}
     */
    urlControllerRemove: (id: string, params: RequestParams = {}) =>
      this.request<void, any>({
        path: `/api/url/${id}`,
        method: "DELETE",
        ...params
      }),

    /**
     * No description
     *
     * @tags URL hit
     * @name UrlHitControllerCreate
     * @request POST:/api/url-hit
     */
    urlHitControllerCreate: (data: CreateUrlHitDtoRequest, params: RequestParams = {}) =>
      this.request<CreateUrlHitDtoResponse, void>({
        path: `/api/url-hit`,
        method: "POST",
        body: data,
        type: ContentType.Json,
        format: "json",
        ...params
      }),

    /**
     * No description
     *
     * @tags URL hit
     * @name UrlHitControllerFindAll
     * @request GET:/api/url-hit
     */
    urlHitControllerFindAll: (params: RequestParams = {}) =>
      this.request<void, any>({
        path: `/api/url-hit`,
        method: "GET",
        ...params
      }),

    /**
     * No description
     *
     * @tags URL hit
     * @name UrlHitControllerFindOne
     * @request GET:/api/url-hit/{id}
     */
    urlHitControllerFindOne: (id: string, params: RequestParams = {}) =>
      this.request<void, any>({
        path: `/api/url-hit/${id}`,
        method: "GET",
        ...params
      }),

    /**
     * No description
     *
     * @tags URL hit
     * @name UrlHitControllerUpdate
     * @request PATCH:/api/url-hit/{id}
     */
    urlHitControllerUpdate: (id: string, data: UpdateUrlHitDto, params: RequestParams = {}) =>
      this.request<void, any>({
        path: `/api/url-hit/${id}`,
        method: "PATCH",
        body: data,
        type: ContentType.Json,
        ...params
      }),

    /**
     * No description
     *
     * @tags URL hit
     * @name UrlHitControllerRemove
     * @request DELETE:/api/url-hit/{id}
     */
    urlHitControllerRemove: (id: string, params: RequestParams = {}) =>
      this.request<void, any>({
        path: `/api/url-hit/${id}`,
        method: "DELETE",
        ...params
      }),

    /**
     * No description
     *
     * @tags USER
     * @name UserControllerGetCurrentUser
     * @request GET:/api/user/me
     * @secure
     */
    userControllerGetCurrentUser: (params: RequestParams = {}) =>
      this.request<void, any>({
        path: `/api/user/me`,
        method: "GET",
        secure: true,
        ...params
      }),

    /**
     * No description
     *
     * @tags USER
     * @name UserControllerFindAll
     * @request GET:/api/user
     */
    userControllerFindAll: (params: RequestParams = {}) =>
      this.request<void, any>({
        path: `/api/user`,
        method: "GET",
        ...params
      }),

    /**
     * No description
     *
     * @tags AUTH
     * @name AuthControllerSignUp
     * @request POST:/api/auth/signup
     */
    authControllerSignUp: (data: SignUpDtoRequest, params: RequestParams = {}) =>
      this.request<void, any>({
        path: `/api/auth/signup`,
        method: "POST",
        body: data,
        type: ContentType.Json,
        ...params
      }),

    /**
     * No description
     *
     * @tags AUTH
     * @name AuthControllerSignIn
     * @request POST:/api/auth/signin
     */
    authControllerSignIn: (data: SignInDtoRequest, params: RequestParams = {}) =>
      this.request<SignInDtoResponse, any>({
        path: `/api/auth/signin`,
        method: "POST",
        body: data,
        type: ContentType.Json,
        format: "json",
        ...params
      }),

    /**
     * No description
     *
     * @tags AUTH
     * @name AuthControllerRefreshToken
     * @request POST:/api/auth/refresh-token
     */
    authControllerRefreshToken: (data: RefreshTokenDtoRequest, params: RequestParams = {}) =>
      this.request<void, any>({
        path: `/api/auth/refresh-token`,
        method: "POST",
        body: data,
        type: ContentType.Json,
        ...params
      }),

    /**
     * No description
     *
     * @tags AUTH
     * @name AuthControllerVerifyEmail
     * @request POST:/api/auth/verify
     */
    authControllerVerifyEmail: (data: VerifyEmailDtoRequest, params: RequestParams = {}) =>
      this.request<void, any>({
        path: `/api/auth/verify`,
        method: "POST",
        body: data,
        type: ContentType.Json,
        ...params
      }),

    /**
     * No description
     *
     * @tags AUTH
     * @name AuthControllerResendVerificationEmail
     * @request POST:/api/auth/resend-verification
     */
    authControllerResendVerificationEmail: (data: ResendVerificationEmailDtoRequest, params: RequestParams = {}) =>
      this.request<void, any>({
        path: `/api/auth/resend-verification`,
        method: "POST",
        body: data,
        type: ContentType.Json,
        ...params
      })
  };
}
