export interface NotificationPush {
  id:   string;
  data: Data;
}

export interface Data {
  destinationUserId?:    string;
  destinationAuthority?: string;
  body:                  string;
  largeBody:             string;
  requestId:             string;
  notificationType:      string;
}
