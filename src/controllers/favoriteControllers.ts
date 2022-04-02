import Favorite from "../models/favoriteModel";
import { catchError } from "../utiles/errorHandler";

export const addFav = catchError(async (req: any, res: any) => {
  const alreadyFav = await Favorite.countDocuments({
    text: req.body.text,
    number: req.body.number,
    surahName: req.body.surahName,
    englishText: req.body.englishText,
    type: req.body.type,
    surah: req.body.surah || 0,
    user: req.user._id,
  });
  if (!alreadyFav) {
    const fav = await Favorite.create({
      text: req.body.text,
      number: req.body.number,
      englishText: req.body.englishText,
      type: req.body.type,
      surahName: req.body.surahName,
      surah: req.body.surah || 0,
      user: req.user._id,
    });
    const favs = await Favorite.find({ user: req.user._id });
    return res.status(200).json({
      status: "ok",
      data: favs,
    });
  }
  throw new Error("Already in Favorites !");
});

export const getFav = catchError(async (req: any, res: any) => {
  const favs = await Favorite.find({ user: req.user._id });
  res.status(200).json({ status: "ok", data: favs });
});

export const removeFav = catchError(async (req: any, res: any) => {
  const fav = await Favorite.findByIdAndDelete(req.params.id);
  const favs = await Favorite.find({ user: req.user._id });

  res.status(204).json({
    status: "ok",
    data: favs,
  });
});
