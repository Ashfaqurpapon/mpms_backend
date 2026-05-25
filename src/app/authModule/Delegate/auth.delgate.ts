import { JwtPayload } from 'jsonwebtoken';
import { User } from '../../modules/userNew/user.model';
import { TUserInfo } from '../auth.interface';

export { TUserRole } from '../../modules/userNew/user.interface';
export { USER_ROLE } from '../../modules/userNew/user.constant';

/* This function checks if a user exists based on the provided payload.
if no user found it will return undefined whereas if found it will return 
true or false */
const getTheUserInfo = async (userId: string): Promise<TUserInfo | null> => {
  const user = await User.isUserExistsID(userId);
  /**
   * @papon changed here
   */
  // need to dicuss with papon changed here
  // const user = await User.findById(userId);
  //
  return user ?? null;
};

const getTheUserInfoByPhone = async (
  email: string,
): Promise<TUserInfo | null> => {
  const user = await User.isUserExistsByEmail(email);
  return user ?? null;
};

const isPasswordMatched = async (
  plainTextPassword: string,
  hashedPassword: string,
): Promise<boolean> => {
  return User.isPasswordMatched(plainTextPassword, hashedPassword);
};

const updateUserInDB = async (
  userID: string,
  userRole: string,
  newHashedPassword: string,
) => {
  await User.findOneAndUpdate(
    {
      _id: userID,
      role: userRole,
    },
    {
      password: newHashedPassword,
      needsPasswordChange: false,
      passwordChangedAt: new Date(),
    },
  );
};

const isJWTIssuedBeforePasswordChanged = (
  user: JwtPayload,
  iat: number,
): boolean => {
  return User.isJWTIssuedBeforePasswordChanged(user.passwordChangedAt, iat);
};

export const AuthDelegate = {
  getTheUserInfo,
  getTheUserInfoByPhone,
  isPasswordMatched,
  updateUserInDB,
  isJWTIssuedBeforePasswordChanged,
};
