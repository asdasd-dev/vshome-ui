export type TextPart = {
    text: string;
    url?: string;
};
export declare function clampText(text: string, maxLines: number, maxChars: number): {
    text: string;
    cut: boolean;
};
export declare function linkify(text: string): TextPart[];
