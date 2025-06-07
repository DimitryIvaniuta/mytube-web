import React from "react";


interface DeepMergePresentationProps {
    /**
     * The object to merge *into* (its keys win only
     * when both sides have non‐object values).
     */
    initialTarget: object;
    /**
     * The object to merge *from* (its keys override
     * target when there’s no nested object).
     */
    initialSource: object;
}

/**
 * Simple guard to exclude null and arrays, but will still treat Date/Map/etc. as objects.
 */
export const isObject = (
    value: unknown
): value is Record<string, unknown> =>
    value !== null && typeof value === "object" && !Array.isArray(value);

/**
 * Returns `true` only for “plain” JS objects:
 *  - Created with `{}` or `new Object()`
 *  - Not arrays, dates, regexes, class instances, etc.
 */
export function isPlainObject<
    T extends Record<string, unknown> = Record<string, unknown>
>(value: unknown): value is T {
    if (Object.prototype.toString.call(value) !== "[object Object]") {
        return false;
    }
    const proto = Object.getPrototypeOf(value);
    // Either no prototype (Object.create(null)) or exactly Object.prototype
    return proto === null || proto === Object.prototype;
}


/**
 * Deeply merges two objects.
 * - If both sides have an object at a given key, merges recursively.
 * - Otherwise source’s value overwrites target’s.
 */
export function deepMerge<
    T extends object,
    U extends object
>(target: T, source: U): T & U {
    const output: any = { ...target };
    if (isObject(target) && isObject(source)) {
        for (const key of Object.keys(source)) {
            const sourceVal = (source as any)[key];
            const targetVal = (target as any)[key];
            if (isObject(sourceVal) && isObject(targetVal)) {
                output[key] = deepMerge(targetVal, sourceVal);
            } else {
                output[key] = sourceVal;
            }
        }
    }
    return output as T & U;
}

// 3) Presentation Component
const DeepMergePresentation: React.FC<DeepMergePresentationProps> = ({
                                                                         initialTarget,
                                                                         initialSource,
                                                                     }) => {
    // 3.1 Controlled JSON‐text state
    const [targetJson, setTargetJson] = React.useState(
        () => JSON.stringify(initialTarget, null, 2)
    );
    const [sourceJson, setSourceJson] = React.useState(
        () => JSON.stringify(initialSource, null, 2)
    );

    // 3.2 Parsed result or error
    const [mergedResult, setMergedResult] = React.useState<object | null>(null);
    const [error, setError] = React.useState<string>("");

    // 3.3 Handler to run on button click
    const handleMerge = () => {
        setError("");
        try {
            const tgt = JSON.parse(targetJson);
            const src = JSON.parse(sourceJson);

            // ensure both are objects
            if (!isObject(tgt) || !isObject(src)) {
                throw new Error("Both inputs must be JSON objects.");
            }

            const merged = deepMerge(tgt, src);
            setMergedResult(merged);
        } catch (e: any) {
            setMergedResult(null);
            setError(e.message);
        }
    };

    return (
        <div
            style={{
                maxWidth: 700,
                margin: "2rem auto",
                padding: "1.5rem",
                border: "1px solid #ddd",
                borderRadius: 8,
                boxShadow: "0 2px 8px rgba(0,0,0,0.05)",
                fontFamily: "Arial, sans-serif",
                backgroundColor: "#fff",
            }}
        >
            <h1 style={{ marginTop: 0, fontSize: "1.75rem" }}>
                Deep Merge Demo
            </h1>

            <div style={{ display: "flex", gap: "1rem" }}>
                <div style={{ flex: 1 }}>
                    <label
                        htmlFor="target-input"
                        style={{ display: "block", marginBottom: 4, fontWeight: 500 }}
                    >
                        Target Object
                    </label>
                    <textarea
                        id="target-input"
                        value={targetJson}
                        onChange={(e) => setTargetJson(e.target.value)}
                        style={{
                            width: "100%",
                            height: 160,
                            fontFamily: "monospace",
                            fontSize: "0.9rem",
                            padding: 8,
                            borderRadius: 4,
                            border: "1px solid #ccc",
                        }}
                    />
                </div>

                <div style={{ flex: 1 }}>
                    <label
                        htmlFor="source-input"
                        style={{ display: "block", marginBottom: 4, fontWeight: 500 }}
                    >
                        Source Object
                    </label>
                    <textarea
                        id="source-input"
                        value={sourceJson}
                        onChange={(e) => setSourceJson(e.target.value)}
                        style={{
                            width: "100%",
                            height: 160,
                            fontFamily: "monospace",
                            fontSize: "0.9rem",
                            padding: 8,
                            borderRadius: 4,
                            border: "1px solid #ccc",
                        }}
                    />
                </div>
            </div>

            <button
                onClick={handleMerge}
                style={{
                    marginTop: "1rem",
                    padding: "0.6rem 1.2rem",
                    fontSize: "1rem",
                    borderRadius: 4,
                    border: "none",
                    backgroundColor: "#0070f3",
                    color: "#fff",
                    cursor: "pointer",
                }}
            >
                Merge
            </button>

            {error && (
                <div
                    style={{
                        marginTop: "1rem",
                        color: "#c00",
                        fontWeight: 500,
                    }}
                >
                    Error: {error}
                </div>
            )}

            {mergedResult && (
                <div style={{ marginTop: "1.5rem" }}>
                    <h2 style={{ marginBottom: "0.5rem" }}>Merged Result</h2>
                    <pre
                        style={{
                            backgroundColor: "#f5f5f5",
                            padding: 12,
                            borderRadius: 4,
                            overflowX: "auto",
                        }}
                    >
            {JSON.stringify(mergedResult, null, 2)}
          </pre>
                </div>
            )}
        </div>
    );
};

export default DeepMergePresentation;