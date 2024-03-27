import listing from "../models/listing.js";

export const createListing = async (req, res, next) => {
  try {
    const newListing = await listing.create(req.body);
    res.status(201).json(newListing);
  } catch (error) {
    next(error);
  }
};

export const deleteListing = async (req, res, next) => {
  const deletedListing = await listing.findById(req.params.id);

  if (!deletedListing) {
    return next(createError(404, "Listing not found"));
  }

  if (deletedListing.userRef !== req.user.id) {
    return next(createError(403, "You can only delete your listings"));
  }
  try {
    await listing.findByIdAndDelete(req.params.id);

    res.status(200).json("Listing has been deleted");
  } catch (error) {
    next(error);
  }
};
