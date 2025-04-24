export function getVystaUrl(): string {
    const url = import.meta.env.VITE_VYSTA_BASE_URL;
    if (!url) {
        throw new Error("VITE_VYSTA_BASE_URLL is not defined");
    }
    return url;
}