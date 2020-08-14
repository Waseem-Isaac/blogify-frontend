export interface Post {
    content: string;
    comments?: [any];
    user_id?: any;
    user?: {name , picture};
    _id?: string;
}
