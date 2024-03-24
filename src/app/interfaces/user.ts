export interface User {
  id: number,
  name: string,
  lastName: string,
  urlImage: string,
  role: string,
  state: string,
  city: string,
  phoneNumber: string,
  gender: string,
  email: string,
  dni: string,
  birthday: string,
  authorities: authorities[]
}

interface authorities {
  authority: string
}
