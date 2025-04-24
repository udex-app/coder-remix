import { useState, useEffect } from "react";
import {
  PasswordInput,
  Paper,
  Title,
  Container,
  Button,
  Text,
  Stack,
  rem,
  LoadingOverlay,
} from "@mantine/core";
import { useForm } from "@mantine/form";
import { IconLock } from "@tabler/icons-react";
import { Link, useNavigate, useSearchParams } from "react-router";
import AuthLayout from "~/components/pages/auth/AuthLayout";
// import { findUserByResetToken, updateUserPassword } from "~/utils/auth";
// import { UserService } from "~/models/services";
// import { getAuthenticatedClient } from "~/utils/auth";

interface FormData {
  password: string;
  confirmPassword: string;
}

interface FormErrors {
  password?: string;
  confirmPassword?: string;
  general?: string;
}

export default function ResetPasswordPage() {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isValidating, setIsValidating] = useState(true);
  const [isValidToken, setIsValidToken] = useState(false);
  const [errors, setErrors] = useState<FormErrors>({});

  const form = useForm<FormData>({
    initialValues: {
      password: "",
      confirmPassword: "",
    },
    validate: {
      password: (value) =>
        value.length < 8 ? "Password must be at least 8 characters" : null,
      confirmPassword: (value, values) =>
        value !== values.password ? "Passwords do not match" : null,
    },
  });

  useEffect(() => {
    async function validateToken() {
      // const token = searchParams.get("token");
      // if (!token) {
      //   setIsValidating(false);
      //   return;
      // }

      // try {
      //   const user = await findUserByResetToken(token);
      //   setIsValidToken(!!user);
      // } catch (error) {
      //   console.error("Token validation error:", error);
      // }

      setIsValidating(false);
    }

    validateToken();
  }, [searchParams]);

  const handleSubmit = async (values: FormData) => {
    setIsSubmitting(true);
    setErrors({});

    // try {
    //   const token = searchParams.get("token");
    //   const user = await findUserByResetToken(token || "");

    //   if (!user) {
    //     throw new Error("Invalid or expired token");
    //   }

    //   // Update user with new password and clear reset token
    //   await updateUserPassword(user, values.password);

    //   // Clear reset token
    //   const client = await getAuthenticatedClient();
    //   const userService = new UserService(client);
    //   await userService.update(user.userID, {
    //     ...user,
    //     resetToken: undefined,
    //     resetTokenExpires: undefined,
    //   });

    //   navigate("/auth/login", { replace: true });
    // } catch (error) {
    //   console.error("Reset password error:", error);
    //   setErrors({
    //     general: "Failed to reset password. Please try again.",
    //   });
    // } finally {
    //   setIsSubmitting(false);
    // }
  };

  if (isValidating) {
    return (
      <Container size={420} my={40}>
        <Paper withBorder shadow="md" p={30} radius="md" pos="relative">
          <LoadingOverlay
            visible={true}
            zIndex={1000}
            overlayProps={{ radius: "sm", blur: 2 }}
            loaderProps={{ type: "dots", color: "blue", size: "md" }}
          />
        </Paper>
      </Container>
    );
  }

  if (!isValidToken) {
    return (
      <Container size={420} my={40}>
        <Paper withBorder shadow="md" p={30} radius="md">
          <Stack>
            <Text ta="center" c="red">
              Invalid or expired password reset link. Please request a new one.
            </Text>
            <Button
              component={Link}
              to="/auth/forgot-password"
              fullWidth
              color="blue"
            >
              Request new reset link
            </Button>
          </Stack>
        </Paper>
      </Container>
    );
  }

  return (
    <AuthLayout
      title="Reset your password"
      description="Enter your new password below"
      loading={isSubmitting}
    >
      <form onSubmit={form.onSubmit(handleSubmit)}>
        <Stack>
          <PasswordInput
            label="New password"
            placeholder="Enter your new password"
            required
            error={errors.password}
            {...form.getInputProps("password")}
            leftSection={
              <IconLock
                style={{ width: rem(16), height: rem(16) }}
                stroke={1.5}
              />
            }
          />

          <PasswordInput
            label="Confirm password"
            placeholder="Confirm your new password"
            required
            error={errors.confirmPassword}
            {...form.getInputProps("confirmPassword")}
            leftSection={
              <IconLock
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

          <Button type="submit" fullWidth mt="xl" color="blue" variant="filled">
            Reset password
          </Button>
        </Stack>
      </form>
    </AuthLayout>
  );
}
