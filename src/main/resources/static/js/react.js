// HTMLで読み込んだReactをimport用に公開します
const React = window.React;
const ReactDOM = window.ReactDOM;

if (!React) {
    throw new Error("Reactの読み込みに失敗しました");
}

if (!ReactDOM) {
    throw new Error("ReactDOMの読み込みに失敗しました");
}

// Reactのフックを他のJSXファイルからimportできるようにします
const { useEffect, useMemo, useState } = React;

export {
    React,
    ReactDOM,
    useEffect,
    useMemo,
    useState
};
