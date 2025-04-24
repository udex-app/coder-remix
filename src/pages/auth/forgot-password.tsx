import { useState } from "react";
import {
  TextInput,
  Paper,
  Title,
  Container,
  Button,
  Text,
  Stack,
  Group,
  rem,
  LoadingOverlay,
} from "@mantine/core";
import { useForm } from "@mantine/form";
import { IconArrowLeft, IconMail } from "@tabler/icons-react";
import { Link, useNavigate } from "react-router";
// import { VystaClient } from "@datavysta/vysta-client";
// import { getVystaUrl } from "~/utils/getVystaUrl";
// import { UserService } from "~/models/services";
// import { WorkflowService } from "~/models/workflows";
import { v4 as uuidv4 } from "uuid";
import AuthLayout from "~/components/pages/auth/AuthLayout";
interface FormData {
  email: string;
}

interface FormErrors {
  email?: string;
  general?: string;
}

export default function ForgotPasswordPage() {
  const navigate = useNavigate();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [errors, setErrors] = useState<FormErrors>({});
  const [isSuccess, setIsSuccess] = useState(false);

  const form = useForm<FormData>({
    initialValues: {
      email: "",
    },
    validate: {
      email: (value) => (/^\S+@\S+$/.test(value) ? null : "Invalid email"),
    },
  });

  const handleSubmit = async (values: FormData) => {
    setIsSubmitting(true);
    setErrors({});

    // try {
    //   // Create Vysta client and authenticate
    //   const client = new VystaClient({
    //     baseUrl: getVystaUrl(),
    //     debug: true,
    //   });

    //   await client.login(
    //     import.meta.env.VITE_REACT_APP_VYSTA_USERNAME,
    //     import.meta.env.VITE_REACT_APP_VYSTA_PASSWORD
    //   );

    //   const userService = new UserService(client);
    //   const workflowService = new WorkflowService(client);

    //   // Find user by email
    //   const users = await userService.getAll();
    //   const user = users.data.find((u) => u.userName === values.email);

    //   if (!user) {
    //     // Don't reveal that the user doesn't exist
    //     setIsSuccess(true);
    //     return;
    //   }

    //   // Generate reset token and update user
    //   const resetToken = uuidv4();
    //   await userService.update(user.userID, {
    //     ...user,
    //     resetToken,
    //     resetTokenExpires: new Date(Date.now() + 3600000).toISOString(), // 1 hour expiry
    //   });

    //   if (!user.userName) {
    //     throw new Error("User email is required");
    //   }

    //   const resetLink = `${window.location.origin}/auth/reset-password?token=${resetToken}`;
    //   const emailSubject = "Reset Your Password";
    //   const emailMessage = `
    //     <!DOCTYPE html>
    //     <html>
    //       <body style="font-family: Arial, sans-serif; line-height: 1.6; color: #333; max-width: 600px; margin: 0 auto; padding: 20px;">
    //         <h2 style="color: #2B3674; margin-bottom: 20px;">Password Reset Request</h2>
    //         <p>Hello ${user.fullName || "there"},</p>
    //         <p>We received a request to reset your password for your Vigil CRM account. Click the button below to set a new password:</p>
    //         <p style="text-align: center; margin: 30px 0;">
    //           <a href="${resetLink}"
    //              style="background-color: #2B3674;
    //                     color: white;
    //                     padding: 12px 24px;
    //                     text-decoration: none;
    //                     border-radius: 4px;
    //                     display: inline-block;">
    //             Reset Password
    //           </a>
    //         </p>
    //         <p>If you did not request this password reset, please ignore this email or contact support if you have concerns.</p>
    //         <p>This link will expire in 1 hour for security purposes.</p>
    //         <hr style="border: none; border-top: 1px solid #eee; margin: 30px 0;">
    //         <p style="color: #666; font-size: 14px;">
    //           Best regards,<br>
    //           The Vigil CRM Team
    //         </p>
    //       </body>
    //     </html>`;

    //   // Send reset email
    //   await workflowService.email({
    //     email: user.userName,
    //     subject: emailSubject,
    //     message: emailMessage,
    //   });

    //   // For now, just log the reset link
    //   console.log("Reset link:", resetLink);

    //   setIsSuccess(true);
    // } catch (error) {
    //   setErrors({
    //     general: "Failed to send reset instructions. Please try again.",
    //   });
    // } finally {
    //   setIsSubmitting(false);
    // }
  };

  return (
    <AuthLayout
      title="Forgot your password?"
      description="Enter your email to get a reset link"
      loading={isSubmitting}
    >
      {isSuccess ? (
        <Stack>
          <Text ta="center" c="green">
            If an account exists with this email address, you will receive
            password reset instructions shortly.
          </Text>
          <Button
            variant="subtle"
            leftSection={
              <IconArrowLeft style={{ width: rem(16), height: rem(16) }} />
            }
            component={Link}
            to="/auth/login"
            fullWidth
            color="blue"
          >
            Back to login
          </Button>
        </Stack>
      ) : (
        <form onSubmit={form.onSubmit(handleSubmit)}>
          <Stack>
            <TextInput
              label="Email"
              placeholder="your@email.com"
              required
              error={errors.email}
              {...form.getInputProps("email")}
              leftSection={
                <IconMail
                  style={{ width: rem(16), height: rem(16) }}
                  stroke={1.5}
                />
              }
            />

            {errors.general && (
              <Text c="red" size="sm">
                {errors.general}
              </Text>
            )}

            <Button
              type="submit"
              fullWidth
              mt="xl"
              color="blue"
              variant="filled"
            >
              Reset password
            </Button>

            <Text c="dimmed" size="sm" ta="center" mt="md">
              Remember your password?{" "}
              <Link
                to="/auth/login"
                style={{
                  color: "var(--mantine-color-blue-6)",
                  textDecoration: "none",
                  fontWeight: 500,
                }}
              >
                Back to login
              </Link>
            </Text>
          </Stack>
        </form>
      )}
    </AuthLayout>
  );
}
