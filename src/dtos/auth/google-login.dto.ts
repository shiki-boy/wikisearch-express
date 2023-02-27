import { z } from "zod";

export const GoogleLoginFormBody = z.object({
  access_token: z.string(),
});

export type GoogleLoginFormDto = z.infer<typeof GoogleLoginFormBody>;
