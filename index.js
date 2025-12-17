import{a as E,i as m,A as I}from"./assets/vendor-ezcAIXsn.js";(function(){const t=document.createElement("link").relList;if(t&&t.supports&&t.supports("modulepreload"))return;for(const i of document.querySelectorAll('link[rel="modulepreload"]'))c(i);new MutationObserver(i=>{for(const s of i)if(s.type==="childList")for(const l of s.addedNodes)l.tagName==="LINK"&&l.rel==="modulepreload"&&c(l)}).observe(document,{childList:!0,subtree:!0});function a(i){const s={};return i.integrity&&(s.integrity=i.integrity),i.referrerPolicy&&(s.referrerPolicy=i.referrerPolicy),i.crossOrigin==="use-credentials"?s.credentials="include":i.crossOrigin==="anonymous"?s.credentials="omit":s.credentials="same-origin",s}function c(i){if(i.ep)return;i.ep=!0;const s=a(i);fetch(i.href,s)}})();const O="https://paw-hut.b.goit.study/api",v={animals:"/animals",categories:"/categories",orders:"/orders",feedbacks:"/feedbacks"},$=E.create({baseURL:O}),r={categoryList:document.querySelector(".js-category-list"),petsList:document.querySelector(".js-pets-list"),loader:document.querySelector(".js-loader"),petsLoadMoreBtn:document.querySelector(".js-pets-load-more-btn"),petsListPagination:document.querySelector(".pagination")};function p(e,t){try{localStorage.setItem(e,JSON.stringify(t))}catch(a){console.error("Error saving to LocalStorage:",a)}}function P(e){try{const t=localStorage.getItem(e);return t?JSON.parse(t):null}catch(t){return console.error("Error loading from LocalStorage:",t),null}}let S=j(),o=P("page")||1,B,n=P("categoryId")??null;document.addEventListener("DOMContentLoaded",R);r.petsLoadMoreBtn.addEventListener("click",N);r.categoryList.addEventListener("click",H);r.petsListPagination.addEventListener("click",x);function j(){return window.innerWidth>=1440?9:8}function A(){return Math.ceil(B/S)}async function R(e){L();try{if(n){const t=await M(),a=await h(n,o);T(t),g(a),f(),u()}else{const t=await M(),a=await y();T(t),g(a),f(),u()}}catch{m.error({title:"Помилка",message:"Щось пішло не так",position:"topRight"})}finally{b()}}async function H(e){if(e.target.nodeName!=="BUTTON")return;const t=e.target.textContent;n=e.target.closest("li").dataset.id,o=1,L(),r.categoryList.querySelectorAll(".category-btn").forEach(i=>{i.classList.remove("current")}),e.target.classList.add("current");try{let i=await y();t!=="Всі"&&(i=await h(n,o)),g(i),u(),f()}catch{m.error({title:"Помилка",message:"Щось пішло не так",position:"topRight"})}finally{b(),p("categoryId",n),p("page",o)}}async function N(){o+=1,r.loader.classList.add("loader-center"),L();try{if(n){u();const t=await h(n,o),a=w(t);r.petsList.insertAdjacentHTML("beforeend",a)}else{u();const t=await y(o),a=w(t);r.petsList.insertAdjacentHTML("beforeend",a)}const e=r.petsList.querySelector("li");if(e){const t=e.getBoundingClientRect();window.scrollBy({top:t.height,behavior:"smooth"})}}catch{m.error({title:"Помилка",message:"Щось пішло не так",position:"topRight"})}finally{b(),p("page",o),r.loader.classList.remove("loader-center")}}async function x(e){const t=e.target.closest("button");if(!t)return;let a;const c=A();t.dataset.action==="prev"&&o>1&&(o-=1),t.dataset.action==="next"&&o<c&&(o+=1),t.dataset.page&&(o=Number(t.dataset.page)),L();try{n?a=await h(n,o):a=await y(o),g(a),f(),window.scrollTo({top:r.petsList.offsetTop-160,behavior:"smooth"})}catch{m.error({title:"Помилка",message:"Щось пішло не так",position:"topRight"})}finally{b(),p("page",o)}}async function M(e){return(await $.get(`${v.categories}`)).data}async function y(e){const t=await $.get(`${v.animals}`,{params:{limit:S,page:e}});return B=t.data.totalItems,t.data.animals}async function h(e,t){const a=await $.get(`${v.animals}?categoryId=${e}`,{params:{limit:S,page:t}});return B=a.data.totalItems,a.data.animals}function U(e){const t=e._id===n;return`
     <li class="category-item" data-id="${e._id}">
        <button class="category-btn ${t?"current":""}" type="button">${e.name}</button>
      </li>`}function _(e){return e.reverse().map(U).join("")}function T(e){const a=` <li class="category-item">
        <button class="category-btn ${!n?"current":""}" type="button">Всі</button>
      </li>${_(e)}`;r.categoryList.innerHTML=a}function D({_id:e,name:t,image:a,species:c,age:i,gender:s,categories:l,description:q}){const C=l.map(k=>`<li class="pets-category-item">${k.name}</li>`).join("");return`
     <li class="pets-item" data-id="${e}">
     <div class="pets-img-wrapper"><img class="pets-img" src="${a}" alt="${t} - ${c}" /></div>
        <div class="pets-list-wrapper">
          <p class="pets-category">${c}</p>
          <h3 class="pets-name">${t}</h3>
          <ul class="pets-category-list">${C}</ul>
          <div class="descriprion-wrapper">
            <ul class="descriprion-list">
              <li class="descriprion-item">${i}</li>
              <li class="descriprion-item">${s}</li>
            </ul>
            <p class="pets-descriprion">${q}</p>
            <button class="pets-button" type="button">Дізнатись більше</button>
          </div>
        </div>
      </li>`}function w(e){return e.map(D).join("")}function g(e){const t=w(e);r.petsList.innerHTML=t}function f(){const e=A();if(e<=1)return;let t="";if(t+=`<li>
      <button class="pagination-btn-arrow" data-action="prev aria-label="Попередня сторінка"" ${o===1?"disabled":""}>
        <svg class="arrow-icon" width="24" height="24">
          <use href="/img/sprite.svg#icon-arrow-back"></use>
        </svg>
      </button>
    </li>`,o===1){for(let a=1;a<=Math.min(3,e);a+=1)t+=d(a);e>3&&(t+='<li class="dots">…</li>',t+=d(e))}else{t+=d(1),o>3&&(t+='<li class="dots">…</li>');for(let a=o-1;a<=o+1;a+=1)a>1&&a<e&&(t+=d(a));o<e-2&&(t+='<li class="dots">…</li>'),e>1&&(t+=d(e))}t+=`<li>
      <button class="pagination-btn-arrow" data-action="next" aria-label="Наступна сторінка" ${o===e?"disabled":""}>
        <svg class="arrow-icon" width="24" height="24">
          <use href="/img/sprite.svg#icon-arrow-forward"></use>
        </svg>
      </button>
    </li>`,r.petsListPagination.innerHTML=t}function d(e){return`
    <li>
      <button
        class="pagination-btn ${o===e?"current":""}"
        aria-label="Сторінка ${e}"
        data-page="${e}">
        ${e}
      </button>
    </li>
  `}function L(){r.loader.classList.remove("loader-hidden")}function b(){r.loader.classList.add("loader-hidden")}function F(){r.petsLoadMoreBtn.classList.remove("pets-load-more-btn-hidden")}function J(){r.petsLoadMoreBtn.classList.add("pets-load-more-btn-hidden")}function u(){const e=A();o>=e?J():F()}new I(".accordion-container",{showMultiple:!1,collapse:!0,duration:300,onOpen(e){const t=e.querySelector(".ac-panel");if(!t)return;const a=t.getBoundingClientRect();if(a.bottom>window.innerHeight){const c=a.bottom-window.innerHeight+20;window.scrollBy({top:c,behavior:"smooth"})}}});const z=document.querySelectorAll(".faq-question-btn");z.forEach(e=>{e.addEventListener("click",()=>{const t=e.getAttribute("aria-expanded")==="true";e.setAttribute("aria-label",t?"Закрити відповідь":"Відкрити відповідь")})});
//# sourceMappingURL=index.js.map
