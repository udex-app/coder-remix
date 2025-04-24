import { useState } from "react";
import {
  TextInput,
  PasswordInput,
  Paper,
  Title,
  Container,
  Button,
  Text,
  Stack,
  Group,
  rem,
  Divider,
  LoadingOverlay,
} from "@mantine/core";
import { useForm } from "@mantine/form";
import { IconMail, IconLock, IconUser } from "@tabler/icons-react";
import { Link, useNavigate } from "react-router";
import bcrypt from "bcryptjs";
import { UserService } from "~/models/services";
import { VystaClient } from "@datavysta/vysta-client";
import { getVystaUrl } from "~/utils/getVystaUrl";
import { WorkflowService } from "~/models/workflows";
import { v4 as uuidv4 } from "uuid";
import AuthLayout from "~/components/pages/auth/AuthLayout";

interface FormData {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  confirmPassword: string;
}

interface FormErrors {
  firstName?: string;
  lastName?: string;
  email?: string;
  password?: string;
  confirmPassword?: string;
  general?: string;
}

export default function SignupPage() {
  const navigate = useNavigate();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [errors, setErrors] = useState<FormErrors>({});

  const form = useForm<FormData>({
    initialValues: {
      firstName: "",
      lastName: "",
      email: "",
      password: "",
      confirmPassword: "",
    },
    validate: {
      firstName: (value) =>
        value.length < 2 ? "First name is too short" : null,
      lastName: (value) => (value.length < 2 ? "Last name is too short" : null),
      email: (value) => (/^\S+@\S+$/.test(value) ? null : "Invalid email"),
      password: (value) =>
        value.length < 8 ? "Password must be at least 8 characters" : null,
      confirmPassword: (value, values) =>
        value !== values.password ? "Passwords do not match" : null,
    },
  });

  const handleSubmit = async (values: FormData) => {
    setIsSubmitting(true);
    setErrors({});

    // Create Vysta client and authenticate
    const client = new VystaClient({
      baseUrl: getVystaUrl(),
      debug: true,
    });

    await client.login(
      import.meta.env.VITE_REACT_APP_VYSTA_USERNAME,
      import.meta.env.VITE_REACT_APP_VYSTA_PASSWORD
    );

    const userService = new UserService(client);
    const workflowService = new WorkflowService(client);

    try {
      // Hash the password
      const salt = await bcrypt.genSalt(10);
      const hashedPassword = await bcrypt.hash(values.password, salt);

      // Create the user
      const newUser = await userService.create({
        userID: uuidv4(),
        userName: values.email,
        password: hashedPassword,
        fullName: `${values.firstName} ${values.lastName}`,
        addedOn: new Date().toISOString(),
        changedOn: new Date().toISOString()
      });

      if (newUser) {
        // await workflowService.insertUserGroupsOnCreate();

        navigate("/auth/login");
      } else {
        throw new Error("Failed to create user");
      }
    } catch (error) {
      console.error("Signup error:", error);
      setErrors({
        general: "Failed to create account. Please try again.",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <AuthLayout
      title="Create an account"
      description="Enter your details to get started"
      loading={isSubmitting}
    >
      <form onSubmit={form.onSubmit(handleSubmit)}>
        <Stack>
          <Group grow>
            <TextInput
              label="First name"
              placeholder="John"
              required
              error={errors.firstName}
              {...form.getInputProps("firstName")}
              leftSection={
                <IconUser
                  style={{ width: rem(16), height: rem(16) }}
                  stroke={1.5}
                />
              }
            />
            <TextInput
              label="Last name"
              placeholder="Doe"
              required
              error={errors.lastName}
              {...form.getInputProps("lastName")}
              leftSection={
                <IconUser
                  style={{ width: rem(16), height: rem(16) }}
                  stroke={1.5}
                />
              }
            />
          </Group>

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

          <PasswordInput
            label="Password"
            placeholder="Create a password"
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
            placeholder="Confirm your password"
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
            Create account
          </Button>

          <Divider
            label="Already have an account?"
            labelPosition="center"
            my="lg"
          />

          <Button
            variant="subtle"
            component={Link}
            to="/auth/login"
            fullWidth
            color="blue"
          >
            Sign in
          </Button>
        </Stack>
      </form>
    </AuthLayout>
  );
}
