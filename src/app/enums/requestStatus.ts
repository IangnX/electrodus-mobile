export enum RequestStatus {
  PENDING = "Espera de aprobación",
  CANCELLED = "Cancelado",
  ACCEPTED = "Aceptado",
  REJECTED = "Rechazado",
  IN_PROCESS = "En proceso",
  IN_REVIEW = "En revisión",
  FINISHED = "Finalizado"
}

export enum RequestStatusColor {
  PENDING = "secondary",
  CANCELLED = "warning",
  ACCEPTED = "primary",
  REJECTED = "danger",
  IN_PROCESS = "medium",
  IN_REVIEW = "light",
  FINISHED = "success"
}
