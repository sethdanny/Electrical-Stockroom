import asyncHandler from 'express-async-handler';
export const register  = asyncHandler(
    async (req, res) => {
        res.json({message: "user registered"})
    }
);