import { catchError } from "../utiles/errorHandler";
import Death from "../models/deathModel";

export const addName = catchError(async (req: any, res: any) => {
  await Death.create({
    name: req.body.name,
    date: req.body.date,
  });
  const deaths = await Death.find();

  res.status(200).json({
    status: "ok",
    data: deaths,
  });
});

export const getNames = catchError(async (req: any, res: any) => {
  const deaths = await Death.find();

  res.status(200).json({
    status: "ok",
    data: deaths,
  });
});

export const removeName = catchError(async (req: any, res: any) => {
  const deaths = await Death.findByIdAndDelete(req.query.id);

  res.status(204).json({});
});
