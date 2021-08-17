export type MatchParams = {
    [key: string]: string;
};

const toObject = (x: string[]) => x.reduce((p, v, k) => { p[k] = v; return p; }, {});

export const matchPattern = (pattern: any, value: any): MatchParams | null => {
    if (Array.isArray(pattern)) {
        for (let p of pattern) {
            let matches = matchPattern(p, value);
            if (matches) return matches;
        }
    }

    if (pattern instanceof RegExp) {
        let matches = String(value).match(pattern);
        if (matches)
            return {...toObject(Array.from(matches).slice(1)), ...matches.groups} as MatchParams;
    }

    if (pattern === '*' || pattern === value)
        return {} as MatchParams;

    return null;
};
