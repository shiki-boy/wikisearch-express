import { z } from "zod";

export const SaveSearchObject = z.object({
  query: z.string(),
  // user: z.instanceof(Schema.Types.ObjectId),
});

export type SaveSearchDto = z.infer<typeof SaveSearchObject>;
