import * as user  from './user.js';
import * as category from './category.js';
import * as restro from './restro.js';
import * as sellerRequest from './sellerRequest.js';
import * as admin from './admin.js';
import * as menu from './menuItems.js'

const Controller = {
    ...user,
    ...category,
    ...restro,
    ...sellerRequest,
    ...admin,
    ...menu
};

export default Controller;