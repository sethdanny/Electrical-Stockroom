import asyncHandler from 'express-async-handler';
import db from '../models/index.js';

const User = db.User;
const Product = db.Product;


export const createProduct = asyncHandler(
    async (req, res) => {
        const {name, quantity, price, description, brand, creatorId} = req.body;
        const maxLength = 255;
        const uuidRegex = /^[a-f\d]{8}-[a-f\d]{4}-[a-f\d]{4}-[a-f\d]{4}-[a-f\d]{12}$/i;

        if (!uuidRegex.test(creatorId)) {
            res.status(400);
            throw new Error('Invalid creatorId format');
        }

        if (!name || !quantity || !price || ! description || !brand) {
            res.status(400);
            throw new Error('Please fill in all fields');
        }

        if (isNaN(price) || price <= 0) {
            res.status(400);
            throw new Error('Please enter a valid positive price');
        }

        if (!Number.isInteger(quantity) || quantity < 0) {
            res.status(400);
            throw new Error('Please enter a valid non-negative quantity');
        }

        if (name.length > maxLength || description.length > maxLength || brand.length > maxLength) {
            res.status(400);
            throw new Error(`Fields must be at most ${maxLength} characters long`);
}
        const userExists = await User.findByPk(creatorId)
        if (!userExists) {
            res.status(404);
            throw new Error('User not found');
        }
        if (userExists) {
            const product = await Product.create({
                name,
                quantity,
                price,
                description,
                brand,
                creatorId

            })
            return res.status(201).json(product);
        } else {
            res.status(500);
            throw new Error('Internal server Error');
        }
        }
);