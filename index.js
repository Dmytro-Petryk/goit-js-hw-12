import{a as f,S as m,i as a}from"./assets/vendor-Db2TdIkw.js";(function(){const o=document.createElement("link").relList;if(o&&o.supports&&o.supports("modulepreload"))return;for(const e of document.querySelectorAll('link[rel="modulepreload"]'))i(e);new MutationObserver(e=>{for(const t of e)if(t.type==="childList")for(const n of t.addedNodes)n.tagName==="LINK"&&n.rel==="modulepreload"&&i(n)}).observe(document,{childList:!0,subtree:!0});function r(e){const t={};return e.integrity&&(t.integrity=e.integrity),e.referrerPolicy&&(t.referrerPolicy=e.referrerPolicy),e.crossOrigin==="use-credentials"?t.credentials="include":e.crossOrigin==="anonymous"?t.credentials="omit":t.credentials="same-origin",t}function i(e){if(e.ep)return;e.ep=!0;const t=r(e);fetch(e.href,t)}})();const p="49659545-2259a1a5c522b42738e4f2b2d",y="https://pixabay.com/api/";async function g(s){return(await f.get(y,{params:{key:p,q:s,image_type:"photo",orientation:"horizontal",safesearch:!0}})).data}const l=document.querySelector(".gallery");document.querySelector(".loader");const h=new m(".gallery a");function b(s){const o=s.map(r=>`
    <li class="gallery-item">
      <a href="${r.largeImageURL}">
        <img class="images" src="${r.webformatURL}" alt="${r.tags}" />
      </a>
      <div class="info">
        <p><b>Likes:</b><br> ${r.likes}</p>
        <p><b>Views:</b><br>${r.views}</p>
        <p><b>Comments:</b><br> ${r.comments}</p>
        <p><b>Downloads:</b><br> ${r.downloads}</p>
      </div>
    </li>
  `).join("");l.insertAdjacentHTML("beforeend",o),h.refresh()}function L(){l.innerHTML=""}const u=document.querySelector(".loader-container");function w(){u.classList.add("visible")}function c(){u.classList.remove("visible")}const d=document.querySelector(".form"),v=d.elements["search-text"];d.addEventListener("submit",async s=>{s.preventDefault();const o=v.value.trim();if(!o){a.warning({title:"Oops",message:"Please enter a search term!"});return}L(),w();try{const r=await g(o);if(c(),r.hits.length===0){a.error({title:"No results",message:"Sorry, there are no images matching your search query."});return}b(r.hits)}catch{c(),a.error({title:"Error",message:"Something went wrong. Please try again later."})}});
//# sourceMappingURL=index.js.map
