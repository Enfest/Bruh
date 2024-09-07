// code from https://gist.github.com/codler/7237990baef87ef00b9e1f7989c24ee5
import { useState, useEffect, RefObject, useCallback } from "react";

function isElementInViewport(el) {
    var rect = el.getBoundingClientRect();

    return (
        rect.bottom >= 0 &&
        rect.right >= 0 &&
        rect.top <= (window.innerHeight || document.documentElement.clientHeight) &&
        rect.left <= (window.innerWidth || document.documentElement.clientWidth)
    );
}

export function useInViewport(ref) {
    const [isVisible, setIsVisible] = useState(true);

    const update = useCallback(() => {
        if (ref.current) {
            setIsVisible(isElementInViewport(ref.current));
        }
    }, [ref]);

    useEffect(() => {
        ["scroll", "load", "DOMContentLoaded", "resize", "click"].forEach((type) => {
            window.addEventListener(type, update);
        });
        return () => {
            ["scroll", "load", "DOMContentLoaded", "resize", "click"].forEach((type) => {
                window.removeEventListener(type, update);
            });
        };
    }, [update]);
    return { isVisible, update };
}
