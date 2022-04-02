export const catchError = (fn: any) => {
  return (req: any, res: any, next: any) => {
    fn(req, res).catch((err: Error) => next(err));
  };
};
