export interface MatchParams {
    [key: string]: string;
}

const toObject = (x: string[]) => x.reduce((p, v, k) => { p[k] = v; return p; }, {});

export const matchPattern = (pattern: any, x: any): MatchParams | null => {
    if (Array.isArray(pattern)) {
        for (let p of pattern) {
            let matches = matchPattern(p, x);
            if (matches) return matches;
        }
    }

    if (pattern instanceof RegExp) {
        let matches = String(x).match(pattern);
        if (matches)
            return {...toObject(Array.from(matches).slice(1)), ...matches.groups} as MatchParams;
    }

    if (pattern === '*' || pattern === x)
        return {} as MatchParams;

    return null;
};
