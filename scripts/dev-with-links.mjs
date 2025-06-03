// scripts/dev-with-links.mjs  (final version)
import { spawn } from "node:child_process";
import path from "node:path";
import { cwd, platform } from "node:process";

const root   = cwd();
const isWin  = platform === "win32";

/* ------------------------------------------------------------ */
/* 1. Start the real Next-dev target through Nx                  */
/* ------------------------------------------------------------ */
const dev = spawn(
    "nx",
    ["run", "web:dev"],
    { stdio: ["inherit", "pipe", "pipe"], shell: isWin }
);

/* ------------------------------------------------------------ */
/* 2. Re-write stack-trace paths → clickable file:// links       */
/* ------------------------------------------------------------ */
function linkify(chunk) {
    return chunk.toString().replace(
        // capture: <rel/or/abs/path>   :line :col
        // works with / or \ separators
        /([\w./\\:-]+\.(?:c|m)?[jt]sx?):(\d+):(\d+)/g,
        (_, file, line, col) => {
            // ignore if already a URI we produced earlier
            if (_ .startsWith("file:///")) return _;
            const abs = path.isAbsolute(file)
                ? file
                : path.resolve(root, "web", file);

            // IntelliJ & VS Code expect:  file:///C://path/to/file.tsx:line:col
            const uriReplacement = abs.replace(/\\/g, "/");
            const uri = "file:///" + uriReplacement;
            return `${uri}:${line}:${col}`;
        }
    );
}

const pipe = (stream, dest) =>
    stream.on("data", (c) => dest.write(linkify(c)));

pipe(dev.stdout, process.stdout);
pipe(dev.stderr, process.stderr);

dev.on("exit", (code) => process.exit(code ?? 0));
