
export interface RecipePlaceholder {
    letter: string;
    background: string;
    color: string;
}

// I made this function to replace not included yet images of recipes
export function recipePlaceholder(name: string | null | undefined): RecipePlaceholder {
    const text = (name ?? '').trim();
    let hash = 0;
    for (const char of text) {
        hash = (hash * 31 + char.charCodeAt(0)) % 360;
    }

    const hue = 20 + (hash % 160);
    return {
        letter: text ? text[0].toUpperCase() : '?',
        background: `hsl(${hue}, 55%, 92%)`,
        color: `hsl(${hue}, 45%, 32%)`
    };
}
