// All requests and responses to backend are typed, so somebody can be sure that it sends and receive correct data
export interface ProductByUserAddRequest{
    date: string;
    userID: number;
    productID: number;
    weight: number;
    time: number;
}