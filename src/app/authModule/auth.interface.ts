export type TLoginUser = {
  email: string;
  password: string;
};

export type TUserInfo = {
  id?: string;
  name?: string;
  email: string;
  role?: 'manager' | 'member' | 'admin';
  password: string;
  phone?: string;
  address?: string;
  needsPasswordChange?: boolean;
  passwordChangedAt?: Date;
  status?: 'in-progress' | 'blocked';
  isDeleted?: boolean;
};
