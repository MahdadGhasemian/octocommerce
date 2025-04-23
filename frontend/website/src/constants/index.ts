import {
  ClientSession,
  DefaultUserFirstName,
  DefaultUserLastName,
  MapCenterLatitude,
  MapCenterLongitude,
  PageSizeNumber,
} from '@/configs/settings';

export const AUTH_TOKEN_KEY = ClientSession as string;
export const PageSize = PageSizeNumber as number;
export const MapCenterLat = MapCenterLatitude as number;
export const MapCenterLng = MapCenterLongitude as number;
export const DefaultFirstName = DefaultUserFirstName as string;
export const DefaultLastName = DefaultUserLastName as string;
