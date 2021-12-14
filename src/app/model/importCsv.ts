import {FormControl} from "@angular/forms";

export interface ImportCsv {

}

export enum ImportOption {
  USER_STORY_TO_PRODUCT_BACKLOG = "USER_STORY_TO_PRODUCT_BACKLOG",
  ISSUE_TO_SPRINT_BOARD = "ISSUE_TO_SPRINT_BOARD"
}

export interface ReadHeaders {
  idImportedData: string,
  headers: HeaderCommand[],
  availableFields: string[]
}

export interface HeaderCommand {
  readField: string,
  suggestedField: string,
  skipField: boolean
}

export interface SelectedHeader {
  readField: string,
  suggestedField: string,
}

export interface MapHeaderCommand {
  idImportedData: string,
  selectedHeaders: SelectedHeader[]
}

export interface MyValue {
  idImportedData: string,
  values: Value[]
}

export interface Value {
  fields: string,
  uniqueValues: string[],
  availableValue: string[]
}

export interface Result {
  idImportedData: string,
  mapValue: MapValue[];
}

export interface MapValue {
  fields: string,
  values: Val[]
}

export interface Val {
  myValue: string,
  matchValue: string
}

export interface ResultTest {
  fields: string,
  uniqueValues: Uniq[],
  availableValue: string[]
}

export interface Uniq {
  value: string,
  match: FormControl
}
