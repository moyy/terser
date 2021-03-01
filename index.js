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

// import * as walk from "walkdir";
// import {minify} from "terser";
// import { readFileSync, writeFileSync, mkdirSync, accessSync } from "fs";
// import { relative, dirname } from "path";

let srcNames = [];

walk.sync("./minigame_release", (path, stat) => {    
    if (stat.isDirectory()) {
        return;
    }
    
    path = relative(".", path);
    
    if (path.endsWith(".js")) {
        console.log("path = " + path);
        srcNames.push(path);
    } else {
        
        let dstPath = path.replace(/^minigame_release/, "minigame_release_mangle");
        console.log("dstPath = " + dstPath);

        mkdirSync(dirname(dstPath), {"recursive": true});
        
        let code = readFileSync(path, "utf8");
        writeFileSync(dstPath, code, "utf-8");
    }
});

console.log("==========================");


(async function () {
    for (let path of srcNames) {
        let src = readFileSync(path, "utf8");

        let {
            code
        } = await minify(src, {
            shuffle_mangle: "golf",
        
            mangle: true,
            keep_classnames: false,
            compress: false,
        });
        
        let dstPath = path.replace(/^minigame_release/, "minigame_release_mangle");
        console.log("dstPath = " + dstPath);
        mkdirSync(dirname(dstPath), {"recursive": true});
        
        writeFileSync(dstPath, code, "utf-8");
    }
})();
