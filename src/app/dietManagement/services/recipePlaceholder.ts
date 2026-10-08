
export interface RecipePlaceholder {
    letter: string;
    background: string;
    color: string;
}

// Zastępcze "zdjęcie" przepisu: pierwsza litera nazwy na delikatnym kolorze.
// Kolor wynika z nazwy, więc ten sam przepis ma zawsze ten sam kolor.
export function recipePlaceholder(name: string | null | undefined): RecipePlaceholder {
    const text = (name ?? '').trim();
    let hash = 0;
    for (const char of text) {
        hash = (hash * 31 + char.charCodeAt(0)) % 360;
    }
    // Odcienie od zieleni po pomarańcz, żeby pasowały do kolorów aplikacji
    const hue = 20 + (hash % 160);
    return {
        letter: text ? text[0].toUpperCase() : '?',
        background: `hsl(${hue}, 55%, 92%)`,
        color: `hsl(${hue}, 45%, 32%)`
    };
}
