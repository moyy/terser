import "./lib/transform.js";
import "./lib/mozilla-ast.js";
import { minify } from "./lib/minify.js";

export { minify } from "./lib/minify.js";
export { run_cli as _run_cli } from "./lib/cli.js";

export async function _default_options() {
    const defs = {};

    Object.keys(infer_options({ 0: 0 })).forEach((component) => {
        const options = infer_options({
            [component]: {0: 0}
        });

        if (options) defs[component] = options;
    });
    return defs;
}

async function infer_options(options) {
    try {
        await minify("", options);
    } catch (error) {
        return error.defs;
    }
}

// (async function () {
//     let src = readFileSync("gui.asm.js", "utf8");
//     let {
//         code
//     } = await minify(src, {
//         shuffle_mangle: "ydzm",
//         mangle: true,
//         keep_classnames: false,
//         compress: false,
//     });

//     writeFileSync("gui.js", code, "utf-8");
// })();

// (async function () {

//     let src = `

//     function abcdefg(abc, def) {
//         let aaa = 13;
//         let bbb = 12;

//         const abcdefg = (abc, dee) => {
//             let ccc = 15;
//             let bbb = 17;

//             console.log("aaa = " + aaa);
//         }

//         aaa += bbb;

//         return aaa * 3;
//     }
//     `;

//     let r = new Set();

//     for (let i = 0; i < 10; ++i) {
//         let {
//             code
//         } = await minify(src, {
//             shuffle_mangle: "ydzm" + i,
            
//             mangle: true,
//             keep_classnames: false,
//             compress: false,
//         });
        
//         r.add(code);
//     }

//     for (let c of r) {
//         console.log(c);
//         // break;
//     }

//     console.log(r.size);
// })();