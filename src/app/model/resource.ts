export interface ResourceHash {
  id: number,
  name: string,
  coverId: number
}

export interface ResourceDescription {
  id: number,
  name: string,
  description: string,
  username: string,
  coverId: number
}

export interface ResourceInformation {
  id: number;
  name: string;
  accessCode: string;
  description: string;
  username: string;
  coverId: number;
}
