import { z } from "zod";
import { localize } from "../translations/textStore";


const LoginSchema = z.object({
  email: z.string().email({ message: localize("email_label") }),
  password: z.string()
    .min(1, { message: localize("password_required_label") })
    .min(6, { message: localize("password_min_length", { count: 6 }) }),
});

export default LoginSchema;
