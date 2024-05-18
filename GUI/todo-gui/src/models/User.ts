export default interface User {
    userId: number;
    firstName: string;
    lastName: string;
    email: string;
    phone: string;
    password: string;
    createdAt: Date;
    updatedAt: Date;
}