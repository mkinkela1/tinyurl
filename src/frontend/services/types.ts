//@ts-nocheck
/**
 * AUTO_GENERATED Do not change this file directly, use config.ts file instead
 *
 * @version 6
 */

export interface CreateUrlDtoResponse {
  /**
   *
   * - Format: date-time
   */
  createDateTime: string;
  id: string;
  longUrl: string;
  shortUrl: string;
}

export interface CreateUrlHitDtoRequest {
  urlId: string;
}

export interface CreateUrlHitDtoResponse {
  /**
   *
   * - Format: date-time
   */
  createDateTime: string;
  id: string;
  urlId: string;
}

export interface CreatetUrlDtoRequest {
  longUrl: string;
}

export interface GetUrlByShortUrlDtoResponse {
  /**
   *
   * - Format: date-time
   */
  createDateTime: string;
  id: string;
  longUrl: string;
  shortUrl: string;
}

export interface UpdateUrlHitDto {
  /**
   *
   * - Format: date-time
   */
  createDateTime?: string;
  id?: string;
  urlId?: string;
}
