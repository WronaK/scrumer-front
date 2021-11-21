export interface ResourceHash {
  id: number,
  name: string,
  coverId: string
}

export interface ResourceDescription {
  id: number,
  name: string,
  description: string,
  username: string,
  coverId: string
}

export interface ResourceInformation {
  id: number;
  name: string;
  accessCode: string;
  description: string;
  username: string;
  idCover: string;
}
