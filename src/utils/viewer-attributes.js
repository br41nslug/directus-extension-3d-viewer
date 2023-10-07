export const VIEWER_DEFAULTS = {
    'camera-controls': true,
    'auto-rotate': true,
    'shadow-intensity': 1,
};

export function viewerAttributes(source, options = {}) {
    const result = {
        ...VIEWER_DEFAULTS,
        ...options,
        src: source,
    }
    return Object.fromEntries(Object.entries(result).filter(([_k, v]) => !!v));
}