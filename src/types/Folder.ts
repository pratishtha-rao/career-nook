export interface Folder {
  id: number;

  name: string;

  description?: string | null;

  color?: string | null;

  icon?: string | null;

  order: number;

  collapsed: boolean;

  favorite: boolean;
  
    archived: boolean;

}