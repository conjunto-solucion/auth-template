type user = {
    username: string,
    email: string,
    password: string
};

export type accessibleUser = {
    username: string,
    email: string
}

export type login = {
    email: string,
    password: string
}

export default user;