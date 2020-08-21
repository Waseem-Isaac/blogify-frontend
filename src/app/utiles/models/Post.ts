import { Category } from './category';

export interface Post {
    content: string;
    comments?: [any];
    user_id?: any;
    user?: {name , picture};
    likes?: [String];
    category?: Category;
    _id?: string;
}
