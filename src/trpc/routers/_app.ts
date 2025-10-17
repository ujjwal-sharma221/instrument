import { z } from "zod";
import { inngest } from "@/inngest/client";

import prisma from "@/lib/db";
import { baseProcedure, createTRPCRouter, protectedProcedure } from "../init";

export const appRouter = createTRPCRouter({
  getWorkflows: protectedProcedure.query(({ ctx }) => {
    return prisma.workflow.findMany({});
  }),

  createWorkflow: protectedProcedure.mutation(async () => {
    await inngest.send({
      name: "test/hello.world",
      data: { email: "mail@mail.com" },
    });

    return prisma.workflow.create({
      data: {
        name: "test",
      },
    });
  }),
});

export type AppRouter = typeof appRouter;
