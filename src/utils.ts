export const APP_CONTAINER_WIDTH = 800;
export const APP_CONTAINER_HEIGHT = 500;
export const DRAGGABLE_BOX_SIZE = 80;
export const DRAGGABLE_BOXES_COUNT = 5;
export const STATIC_BOX_SIZE = 300;

export default function cx(...inputs: (string | undefined | null | false)[]): string {
    return [...inputs].filter(Boolean).join(' ');
}