import { useState } from "react";
import {
  TextInput,
  PasswordInput,
  Button,
  Text,
  Checkbox,
  Stack,
  Group,
  rem,
  Anchor,
} from "@mantine/core";
import { useForm } from "@mantine/form";
import { IconLock } from "@tabler/icons-react";
import {
  Form,
  Link,
  redirect,
  useNavigate,
  useActionData,
  type ActionFunctionArgs,
} from "react-router";
import AuthLayout from "~/components/common/AuthLayout/index";
import { vystaClient } from "~/services/VystaClient";

interface FormData {
  email: string;
  password: string;
  remember: boolean;
}

interface FormErrors {
  email?: string;
  password?: string;
  general?: string;
}

interface ActionResponse {
  ok: boolean;
  errors?: {
    email?: string;
    password?: string;
    form?: string;
  };
  connectionError?: boolean;
}

// Login action function
export async function clientAction({
                                     request,
                                   }: ActionFunctionArgs): Promise<ActionResponse | Response> {
  const formData = await request.formData();
  const email = formData.get("email") as string;
  const password = formData.get("password") as string;

  // Basic validation
  const errors: {
    email?: string;
    password?: string;
  } = {};

  if (!email) errors.email = "Email is required";
  if (!password) errors.password = "Password is required";

  // Return errors if validation fails
  if (Object.keys(errors).length > 0) {
    return { errors, ok: false };
  }

  try {
    // Call the API to login
    await vystaClient.login(email, password);

    // Redirect to dashboard after successful login
    return redirect("/app/dashboard");
  } catch (error) {
    // Handle API errors with more detailed logging
    console.error("Login error:", error);

    // Return specific error types to display appropriate UI in the component
    const isConnectionError =
        error instanceof TypeError && error.message === "Failed to fetch";

    return {
      ok: false,
      connectionError: isConnectionError,
      errors: {
        form: isConnectionError
            ? "Cannot connect to the server. Please check your network connection or server status."
            : error instanceof Error
                ? error.message
                : "Invalid email or password",
      },
    };
  }
}

export default function LoginPage() {
  const navigate = useNavigate();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [errors, setErrors] = useState<FormErrors>({});
  const actionData = useActionData<typeof clientAction>();

  const form = useForm<FormData>({
    initialValues: {
      email: "",
      password: "",
      remember: false,
    },
    validate: {
      email: (value) => (/^\S+@\S+$/.test(value) ? null : "Invalid email"),
      password: (value) => (value.length < 6 ? "Password is too short" : null),
    },
  });

  return (
      <AuthLayout
          title="Welcome back!"
          description="Enter your credentials to access your account"
          loading={isSubmitting}
      >
        <Form method="post">
          <Stack>
            <TextInput
                name="email"
                label="Email"
                placeholder="your@email.com"
                required
                error={actionData?.errors?.email || form.errors.email}
                {...form.getInputProps("email")}
            />

            <PasswordInput
                name="password"
                label="Password"
                placeholder="Your password"
                required
                error={actionData?.errors?.password || form.errors.password}
                {...form.getInputProps("password")}
                leftSection={
                  <IconLock
                      style={{ width: rem(16), height: rem(16) }}
                      stroke={1.5}
                  />
                }
            />

            {actionData?.errors?.form && (
                <Text c="red" size="sm">
                  {actionData.errors.form}
                </Text>
            )}

            <Group justify="flex-end">
              <Anchor
                  component={Link}
                  to="/auth/forgot-password"
                  c="dimmed"
                  size="sm"
              >
                Forgot password?
              </Anchor>
            </Group>

            <Button
                type="submit"
                fullWidth
                mt="sm"
                variant="filled"
                loading={isSubmitting}
            >
              Sign in
            </Button>

            <Text c="dimmed" size="sm" ta="center" mt="md">
              Don't have an account?{" "}
              <Anchor component={Link} to="/auth/signup" fw={500}>
                Sign up
              </Anchor>
            </Text>
          </Stack>
        </Form>
      </AuthLayout>
  );
}