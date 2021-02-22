const walk = require("walkdir");

const {
    minify
} = require("terser");

const {
    readFileSync,
    writeFileSync,
    mkdirSync,
    accessSync
} = require("fs");

const { relative, dirname } = require("path");

let srcNames = [];

walk.sync("./src", (path, stat) => {    
    if (stat.isDirectory()) {
        return;
    }

    if (!path.endsWith(".js")) {
        return;
    }

    path = relative(".", path);
    console.log("path = " + path);

    srcNames.push(path);
});

console.log("==========================");


(async function () {
    for (let path of srcNames) {
        let src = readFileSync(path, "utf8");

        let {
            code
        } = await minify(src, {
            shuffle_mangle: "ydzm",
        
            mangle: true,
            keep_classnames: false,
            compress: false,
        });
        
        let dstPath = path.replace(/^src/, "dst");
        console.log("dstPath = " + dstPath);
        mkdirSync(dirname(dstPath), {"recursive": true});
        
        writeFileSync(dstPath, code, "utf-8");
    }
})();