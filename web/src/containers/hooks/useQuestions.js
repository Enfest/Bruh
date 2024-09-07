//react import
import { useEffect, useState, useCallback } from "react";
// const backendHost = "http://localhost:4000";
const backendHost = `http://${window.location.hostname}:4000`;
const getQuestion = async (location) => {
    const myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/json");

    const searchParams = new URLSearchParams(location.search);
    const requestID = searchParams.get("hash") ?? "0";
    const url =
        `${backendHost}/api/category/getFormPage?` +
        new URLSearchParams({ hash: requestID }).toString();
    console.log("GET ", url);
    const myRequest = new Request(url, {
        method: "GET",
        headers: myHeaders,
    });

    const response = fetch(myRequest);
    return response;
};
const postQuestion = async (location, options) => {
    const myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/json");

    const searchParams = new URLSearchParams(location.search);
    // check hash is uuid4
    const validHash = /^[0-9a-f]{12}4[0-9a-f]{3}[89ab][0-9a-f]{15}\Z$/;
    const hash = searchParams.get("hash");
    console.log("hash: ", hash);
    let postParams = { hash: !validHash.test(hash) ? hash : "0", answers: {} };
    for (const option of options) {
        const id = option.id;
        if (option.type === "TEXT") {
            const text = searchParams.get(id);
            postParams["answers"][id] = text;
            continue;
        }
        const subOptions = option.options;
        const selected = searchParams.getAll(id);
        const found = (text) => (e) => e.text === text;
        const selectedIndex = selected.map((text) => subOptions.findIndex(found(text)));
        postParams["answers"][id] = selectedIndex;
    }

    const url = `${backendHost}/api/category/submitFormPage`;
    console.log("POST ", url);

    const myRequest = new Request(url, {
        method: "POST",
        body: JSON.stringify(postParams),
        headers: myHeaders,
    });
    console.log("myRequest: ", myRequest);
    console.log("body: ", JSON.stringify(postParams));
    const response = fetch(myRequest);
    return response;
};

export { getQuestion, postQuestion };
