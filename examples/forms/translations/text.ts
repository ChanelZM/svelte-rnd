export const text = {
    // error labels
    email_label: "Invalid email address",
    password_required_label: "Password is required",
    password_min_length: "Password must be at least {count} characters long"
} as const;

export type TextKey = keyof typeof text;