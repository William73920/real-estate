import listing from "../models/listing.js";

export const createListing = async (req, res, next) => {
  try {
    const newListing = await listing.create(req.body);
    res.status(201).json(newListing);
  } catch (error) {
    next(error);
  }
};
