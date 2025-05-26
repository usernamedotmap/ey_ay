import { getAuth } from "@clerk/express";

export const withAuth = (req, res, next) => {
  const auth = getAuth(req);
  if (!auth || !auth.userId) {
    return res.status(401).json({ message: "Unauthenticated" });
  }
 
  req.auth = auth;
  next();
};