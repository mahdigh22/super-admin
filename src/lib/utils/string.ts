import { getObjectKeys } from '~/lib/utils/ts-utils';

export function toQueryString(params: Record<string, string | number | boolean | undefined>) {
  const str = getObjectKeys(params)
    .filter((key) => params[key] !== undefined)
    .map((key) => `${encodeURIComponent(key)}=${encodeURIComponent(params[key]!)}`)
    .join('&');

  return str ? `?${str}` : '';
}
