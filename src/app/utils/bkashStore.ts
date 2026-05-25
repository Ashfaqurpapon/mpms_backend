// utils/bkashStore.ts
let idToken: string | null = null;
let userId: string | null = null;

export const setIdToken = (token: string) => {
    idToken = token;
};

export const getIdToken = () => idToken;

export const clearIdToken = () => {
    idToken = null;
};

export const setUserId = (id: string) => {
    userId = id;
};

export const getUserId = () => userId;
