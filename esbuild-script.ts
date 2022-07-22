import path from "path";
import { build } from "esbuild";
import { copy } from "esbuild-plugin-copy";

const watch = process.argv[3] === "watch";

const modulesPath = "C:/Users/LukiAdmin/AppData/Local/FoundryVTT/Data/modules";
const outPath = watch ? path.resolve(modulesPath, "pf2e-inline-traits") : "./dist";

const options = {
    entryPoints: ["./src/inline-traits.ts"],
    bundle: true,
    minify: true,
    sourcemap: true,
    watch,
    outfile: path.resolve(outPath, "bundle.js"),
    plugins: [
        copy({
            resolveFrom: "cwd",
            assets: [
                {
                    from: ["./module.json"],
                    to: [path.resolve(outPath, "module.json")],
                },
            ],
        }),
    ],
};

build(options).catch((err) => {
    console.log(err)
    process.exit(1)
});
