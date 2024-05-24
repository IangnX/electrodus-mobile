export enum RequestStatus {
  PENDING = "Espera de aprobación", // Cuando el cliente crea la solicitud
  CANCELLED = "Cancelado", // Cuando el cliente cancela la solicitud o rechaza presupuesto
  ACCEPTED = "Aceptado",// Cuando el administrador acepta la solicitud
  REJECTED = "Rechazado",// Cuando el administrador  rechaza la solicitud
  IN_PROCESS = "En proceso", // Cuando el cliente acepta el presupuesto
  IN_REVIEW = "En revisión",// Cuando el tecnico esta revisando  la solicud
  REVIEWED = "Nuevo presupuesto",  // Cuando el tecnico genera el nuevo presupuesto
  RECHECKED = "En proceso", // Cuando el cliente acepta el nuevo presupuesto
  ABORTED = "Cancelado",  // Cuando el cliente NO ACEPTA EL NUEVO PRESUPUESTO
  UNPAID = "Por pagar", // NO HA PAGADO
  FINISHED = "Finalizado"
}

export enum RequestStatusColor {
  PENDING = "secondary",
  CANCELLED = "warning",
  ACCEPTED = "primary",
  REJECTED = "danger",
  IN_PROCESS = "tertiary",
  IN_REVIEW = "light",
  FINISHED = "success"
}
