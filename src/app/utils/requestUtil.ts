import { RequestStatus, RequestStatusColor } from "../enums/requestStatus";

export function  getRequestStatus(estatusString: string): RequestStatus | undefined {
  const estatusMap: { [key: string]: RequestStatus } = {
    "PENDING": RequestStatus.PENDING,
    "CANCELLED": RequestStatus.CANCELLED,
    "IN_PROCESS": RequestStatus.IN_PROCESS,
    "ACCEPTED": RequestStatus.ACCEPTED,
    "REJECTED": RequestStatus.REJECTED,
    "IN_REVIEW": RequestStatus.IN_REVIEW,
    "FINISHED": RequestStatus.FINISHED,

  };

  return estatusMap[estatusString.toUpperCase()]; // Ensure case-insensitive matching
}

export function  getRequestStatusColor(estatusString: string): RequestStatusColor | undefined {
  const estatusMap: { [key: string]: RequestStatusColor } = {
    "PENDING": RequestStatusColor.PENDING,
    "CANCELLED": RequestStatusColor.CANCELLED,
    "IN_PROCESS": RequestStatusColor.IN_PROCESS,
    "ACCEPTED": RequestStatusColor.ACCEPTED,
    "REJECTED": RequestStatusColor.REJECTED,
    "IN_REVIEW": RequestStatusColor.IN_REVIEW,
    "FINISHED": RequestStatusColor.FINISHED,

  };

  return estatusMap[estatusString.toUpperCase()]; // Ensure case-insensitive matching
}
