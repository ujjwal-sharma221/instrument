import { cache } from "react";
import { headers } from "next/headers";
import { initTRPC, TRPCError } from "@trpc/server";

import { auth } from "@/lib/auth/auth";
import { polarClient } from "@/lib/polar";

export const createTRPCContext = cache(async () => {
  return { userId: "user_123" };
});

const t = initTRPC.create({
  // transformer: superjson,
});

export const createTRPCRouter = t.router;
export const createCallerFactory = t.createCallerFactory;
export const baseProcedure = t.procedure;

export const protectedProcedure = baseProcedure.use(async ({ ctx, next }) => {
  const session = await auth.api.getSession({ headers: await headers() });

  if (!session)
    throw new TRPCError({
      code: "UNAUTHORIZED",
      message: "You are not authenticated",
    });

  return next({ ctx: { ...ctx, auth: session } });
});

export const premiumprotectedProcedure = protectedProcedure.use(
  async ({ ctx, next }) => {
    const customer = await polarClient.customers.getStateExternal({
      externalId: ctx.auth.user.id,
    });

    if (
      !customer.activeSubscriptions ||
      customer.activeSubscriptions.length === 0
    ) {
      throw new TRPCError({
        code: "FORBIDDEN",
        message: "An active subscription is required for this action",
      });
    }

    return next({ ctx: { ...ctx, customer } });
  },
);
