import { baseProcedure, createTRPCRouter } from "../init";
import { workflowRouter } from "@/features/workflows/server/router";

export const appRouter = createTRPCRouter({
  workflows: workflowRouter,
});

export type AppRouter = typeof appRouter;
