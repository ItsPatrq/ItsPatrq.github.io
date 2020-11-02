---
---

(function() {
    window.addEventListener("load", () => {
        //GA
        const scriptElement = document.createElement("script");
        scriptElement.setAttribute("src", "https://www.googletagmanager.com/gtag/js?id=G-K70JKXSJMS");
        scriptElement.setAttribute("async", "");
        document.body.appendChild(scriptElement);
        window.dataLayer = window.dataLayer || [];
        function gtag(){dataLayer.push(arguments);}
        gtag('js', new Date());
        gtag('config', 'G-K70JKXSJMS');
    });
})();