export interface LoginModelOut {
    email: string, token: string, errors: []
}
export interface LoginModelIn {
    email: string, password: string,
} 