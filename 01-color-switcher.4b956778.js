!function(){var t=document.querySelector("[data-start]"),e=document.querySelector("[data-stop]"),n=null;function a(){document.body.style.backgroundColor="#".concat(Math.floor(16777215*Math.random()).toString(16))}t.disabled=!1,t.addEventListener("click",(function(){t.disabled=!0,n=setInterval(a,1e3)})),e.addEventListener("click",(function(){t.disabled=!1,clearInterval(n)}))}();
//# sourceMappingURL=01-color-switcher.4b956778.js.map
