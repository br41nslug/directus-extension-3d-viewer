export const VIEWER_DEFAULTS = {
    'camera-controls': true,
    'auto-rotate': true,
    'shadow-intensity': 1,
};

export function viewerAttributes(file_id, options = {}) {
    const result = {
        ...VIEWER_DEFAULTS,
        ...options,
        src: `/assets/${file_id}?access_token=admin`
    }
    return Object.fromEntries(Object.entries(result).filter(([_k, v]) => !!v));
}