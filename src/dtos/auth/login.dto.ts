import { z } from "zod";

export const LoginFormBody = z.object({
  email: z.string().email(),
  password: z.string(),
});

export type LoginFormDto = z.infer<typeof LoginFormBody>;
