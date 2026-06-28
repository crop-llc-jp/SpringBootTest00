(function () {
    // importされる側から順番に並べます
    const files = [
        "/js/react.js",
        "/js/api.js",
        "/js/router.js",
        "/js/views/LoginView.jsx",
        "/js/views/LoginResultView.jsx",
        "/js/views/ListView.jsx",
        "/js/App.jsx",
        "/js/main.jsx"
    ];

    // import文の from "./xxx" の部分だけを探します
    const importPathPattern = /(\bfrom\s*)(["'])(\.{1,2}\/[^"']+)\2/g;

    // 元ファイルのパスと、変換後のBlob URLを対応させます
    const moduleUrls = {};

    // 相対パスを /js/... のような絶対パスへ変換します
    function resolveModulePath(fromFile, importPath) {
        return new URL(importPath, window.location.origin + fromFile).pathname;
    }

    // import先を、変換済みのBlob URLへ置き換えます
    function rewriteImportPaths(source, fromFile) {
        return source.replace(importPathPattern, function (match, prefix, quote, importPath) {
            const modulePath = resolveModulePath(fromFile, importPath);
            return prefix + quote + moduleUrls[modulePath] + quote;
        });
    }

    // 1ファイルを読み込み、Babelで変換して、Blob URLとして保存します
    function loadFile(file) {
        return fetch(file)
            .then(function (response) {
                if (!response.ok) {
                    throw new Error(file + " の読み込みに失敗しました");
                }
                return response.text();
            })
            .then(function (source) {
                const sourceWithBlobImports = rewriteImportPaths(source, file);
                const result = Babel.transform(sourceWithBlobImports, {
                    filename: file,
                    sourceType: "module",
                    presets: [["react", { runtime: "classic" }]]
                });
                const blob = new Blob([result.code], { type: "text/javascript" });

                moduleUrls[file] = URL.createObjectURL(blob);
            });
    }

    // 配列の順番どおりにファイルを変換します
    files.reduce(function (promise, file) {
        return promise.then(function () {
            return loadFile(file);
        });
    }, Promise.resolve()).then(function () {
        const script = document.createElement("script");

        script.type = "module";
        script.src = moduleUrls["/js/main.jsx"];
        document.body.appendChild(script);
    }).catch(function (error) {
        const root = document.getElementById("root");
        root.innerHTML = '<main class="page"><section class="panel"><p class="error">画面の読み込みに失敗しました</p></section></main>';
        console.error(error);
    });
})();
