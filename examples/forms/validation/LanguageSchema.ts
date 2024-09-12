import { z } from "zod";

enum Language {
  Dutch = "Dutch",
  German = "German",
  Polish = "Polish",
}

export const LanguageSchema = z.object({
  languages: z.array(z.nativeEnum(Language)),
});

export default LanguageSchema;