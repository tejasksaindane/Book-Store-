type book_fields = {
  type: string | number;
  required: boolean;
};
export interface book_interface {
  [key: string]: book_fields;
}

export interface param_interface {
  [key: string]: any;
}

export type bool_state = (a: boolean) => void;

export interface book_data {
  _id: string;
  title: string;
  author: string;
  publishYear: number;
  email: string;
  createdAt: string;
  updatedAt: string;
  __v: 0;
}

export interface user_data {
  userName: string;
  email: string;
  password: string;
}

export interface StateProviderI {
  children: React.ReactNode;
}
