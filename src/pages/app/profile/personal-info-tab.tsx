import {
    TextInput,
    Group,
    Select,
    Stack,
    Button,
    Divider,
    Loader,
    Center,
} from "@mantine/core";
import { useForm } from "@mantine/form";
import { useEffect, useState } from "react";
import { VystaClient } from "@datavysta/vysta-client";
import { getVystaUrl } from "~/utils/getVystaUrl";
import { UserService } from "~/models/services";

export default function PersonalInfoTab() {
    const [loading, setLoading] = useState(true);
    const form = useForm({
        initialValues: {
            firstName: "",
            lastName: "",
            email: "",
            phone: "",
            timeZone: "",
            language: "",
        },
    });

    useEffect(() => {
        const fetchData = async () => {
            setLoading(true);

            const client = new VystaClient({
                baseUrl: getVystaUrl(),
                debug: true,
            });

            await client.login(
                import.meta.env.VITE_REACT_APP_VYSTA_USERNAME,
                import.meta.env.VITE_REACT_APP_VYSTA_PASSWORD
            );


            const userService = new UserService(client);
            const userId = localStorage.getItem("userId") || "123";
            const user = await userService.getById(userId);

            if (user) {
                form.setValues({
                    firstName: user.userName ?? "",
                    // lastName: user.lastName ?? "",
                    // email: user. ?? "",
                    // phone: user.phone ?? "",
                    // timeZone: user.timeZone ?? "",
                    // language: user.language ?? "en",
                });
            }

            setLoading(false);
        };

        fetchData();
    }, []);

    const handleSubmit = (values: typeof form.values) => {
        console.log("Submitted data:", values);
        // await api.updateUser(values);
    };

    if (loading) {
        return (
            <Center py="xl">
                <Loader />
            </Center>
        );
    }

    return (
        <form onSubmit={form.onSubmit(handleSubmit)}>
            <Stack gap="lg">
                <Group grow>
                    <TextInput
                        label="First Name"
                        placeholder="Your first name"
                        {...form.getInputProps("firstName")}
                    />
                    <TextInput
                        label="Last Name"
                        placeholder="Your last name"
                        {...form.getInputProps("lastName")}
                    />
                </Group>

                <Group grow>
                    <TextInput
                        label="Email"
                        placeholder="Your email"
                        {...form.getInputProps("email")}
                    />
                    <TextInput
                        label="Phone"
                        placeholder="Your phone number"
                        {...form.getInputProps("phone")}
                    />
                </Group>

                <Group grow>
                    <Select
                        label="Time Zone"
                        placeholder="Select timezone"
                        data={[
                            {
                                value: "america_los_angeles",
                                label: "Pacific Time (US & Canada)",
                            },
                            {
                                value: "america_new_york",
                                label: "Eastern Time (US & Canada)",
                            },
                            { value: "europe_london", label: "London" },
                            { value: "asia_tokyo", label: "Tokyo" },
                        ]}
                        {...form.getInputProps("timeZone")}
                    />
                    <Select
                        label="Language"
                        placeholder="Select language"
                        data={[
                            { value: "en", label: "English" },
                            { value: "es", label: "Spanish" },
                            { value: "fr", label: "French" },
                            { value: "de", label: "German" },
                        ]}
                        {...form.getInputProps("language")}
                    />
                </Group>

                <Divider />

                <Group justify="flex-end">
                    <Button variant="light" type="button">
                        Cancel
                    </Button>
                    <Button type="submit">Save Changes</Button>
                </Group>
            </Stack>
        </form>
    );
}
