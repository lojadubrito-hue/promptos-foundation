export type ID = string;
export type ISODateString = string;

export interface Timestamps {
  createdAt: ISODateString;
  updatedAt: ISODateString;
}

export interface Entity extends Timestamps {
  id: ID;
}

export type Status = "draft" | "active" | "archived";
export type Language = "pt-BR" | "en-US" | "es-ES" | "fr-FR";
