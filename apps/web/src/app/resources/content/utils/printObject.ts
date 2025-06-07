/**
 * Recursively prints every key/value in an object or array, with indentation.
 * @param data  The object or array to traverse.
 * @param indent  Prefix for current depth (e.g. "  ").
 */
export const printTree = (data: any, indent = ""): void => {
    // If it's an array, iterate by index:
    if (Array.isArray(data)) {
        data.forEach((item, idx) => {
            // Use the index as the “key”
            if (item !== null && typeof item === "object") {
                console.log(`${indent}[${idx}]:`);
                printTree(item, indent + "  ");
            } else {
                console.log(`${indent}[${idx}]: ${item}`);
            }
        });
        return;
    }

    // If it's an object, iterate its own entries:
    if (data !== null && typeof data === "object") {
        for (const [key, value] of Object.entries(data)) {
            if (value !== null && typeof value === "object") {
                // Print the key, then recurse
                console.log(`${indent}${key}:`);
                printTree(value, indent + "  ");
            } else {
                // Primitive (string/number/boolean/etc.)
                console.log(`${indent}${key}: ${value}`);
            }
        }
        return;
    }

    // If it's a primitive at the root:
    console.log(`${indent}${data}`);
}
