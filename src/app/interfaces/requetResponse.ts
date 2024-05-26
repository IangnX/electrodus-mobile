import { Promotion } from "./promotionResponsePage"
import { ServicePreview } from "./servicePreview"
import { User } from "./user"

export interface RequestResponse {
  id: number,
  address: string,
  equipmentSerial: string,
  idEquipmentPreliminary: string,
  equipmentImagen: string,
  status: string,
  description: string,
  created_at: string,
  revision_date: string,
  approval_date: string,
  culmination_date: string,
  equipmentName: string
  equipmentIdCategory: number
  services:ServicePreview[]
  userTechnician: User
  voucherUrl: string
}
