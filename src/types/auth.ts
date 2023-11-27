/** External */
import express from "express";

interface AuthenticatedRequest extends express.Request {
  user?: any;
}

export { AuthenticatedRequest };
