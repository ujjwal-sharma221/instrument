import { z } from "zod";
import { generateText } from "ai";
import { google } from "@ai-sdk/google";
import { inngest } from "@/inngest/client";

import prisma from "@/lib/db";
import { baseProcedure, createTRPCRouter, protectedProcedure } from "../init";

export const appRouter = createTRPCRouter({
  getWorkflows: protectedProcedure.query(({ ctx }) => {
    return prisma.workflow.findMany({});
  }),

  testAi: protectedProcedure.mutation(async () => {
    await inngest.send({ name: "execute/ai" });
    return { success: true };
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
