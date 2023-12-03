import {UserInterface} from "../User/user.interfaces.ts";
import {ProductInterfaces} from "../Product/product.interfaces.ts";

export interface ReviewInterface {
    review_id:      number,
    user_id:        number,
    product_id:     number,
    comment:        string,
    stars:          number,
    review_date:    Date,
    user:           UserInterface,
    product:        ProductInterfaces
}

export interface ReviewFormInterface {
    user_id:        number,
    product_id:     number,
    comment:        string,
    stars:          number,
    review_date:    Date,
}