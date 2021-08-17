const toObject = (x) => x.reduce((p, v, k) => { p[k] = v; return p; }, {});
export const matchPattern = (pattern, value) => {
    if (Array.isArray(pattern)) {
        for (let p of pattern) {
            let matches = matchPattern(p, value);
            if (matches)
                return matches;
        }
    }
    if (pattern instanceof RegExp) {
        let matches = String(value).match(pattern);
        if (matches)
            return { ...toObject(Array.from(matches).slice(1)), ...matches.groups };
    }
    if (pattern === '*' || pattern === value)
        return {};
    return null;
};
