const toObject = (x) => x.reduce((p, v, k) => { p[k] = v; return p; }, {});
export const matchPattern = (pattern, x) => {
    if (Array.isArray(pattern)) {
        for (let p of pattern) {
            let matches = matchPattern(p, x);
            if (matches)
                return matches;
        }
    }
    if (pattern instanceof RegExp) {
        let matches = String(x).match(pattern);
        if (matches)
            return { ...toObject(Array.from(matches).slice(1)), ...matches.groups };
    }
    if (pattern === '*' || pattern === x)
        return {};
    return null;
};
