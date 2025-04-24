import { VystaClient } from "@datavysta/vysta-client";

// Create a function to get the client instance - this helps with SSR
function createVystaClient() {
    // Check if we're in a browser environment
    if (typeof window === "undefined") {
        // Create a minimal mock client for SSR
        // Using 'as unknown as VystaClient' safely bypasses type checking when we know
        // these methods won't actually be called during SSR
        return {
            login: async () => {},
            logout: async () => {},
            register: async () => {},
            fetchData: async () => ({ data: [] }),
            createData: async () => ({}),
            updateData: async () => ({}),
            deleteData: async () => ({}),
            // The rest of the methods would be stubbed similarly
            config: {},
            auth: { token: null },
            debug: false,
            log: () => {},
        } as unknown as VystaClient;
    }

    // Create the actual client for browser environments
    return new VystaClient({
        baseUrl: import.meta.env.VITE_VYSTA_BASE_URL,
        debug: true,
    });
}

// Export the singleton instance
export const vystaClient = createVystaClient();