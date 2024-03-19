export interface ApiError {
  apiMessage: string,
  message: string,
  url: string,
  method: string,
  timestamp: string,
  messages: string[]
}
