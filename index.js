import{a as E,i as m}from"./assets/vendor-B4ZCAipb.js";(function(){const t=document.createElement("link").relList;if(t&&t.supports&&t.supports("modulepreload"))return;for(const o of document.querySelectorAll('link[rel="modulepreload"]'))c(o);new MutationObserver(o=>{for(const r of o)if(r.type==="childList")for(const l of r.addedNodes)l.tagName==="LINK"&&l.rel==="modulepreload"&&c(l)}).observe(document,{childList:!0,subtree:!0});function a(o){const r={};return o.integrity&&(r.integrity=o.integrity),o.referrerPolicy&&(r.referrerPolicy=o.referrerPolicy),o.crossOrigin==="use-credentials"?r.credentials="include":o.crossOrigin==="anonymous"?r.credentials="omit":r.credentials="same-origin",r}function c(o){if(o.ep)return;o.ep=!0;const r=a(o);fetch(o.href,r)}})();const j="https://paw-hut.b.goit.study/api",v={animals:"/animals",categories:"/categories",orders:"/orders",feedbacks:"/feedbacks"},$=E.create({baseURL:j}),i={categoryList:document.querySelector(".js-category-list"),petsList:document.querySelector(".js-pets-list"),loader:document.querySelector(".js-loader"),petsLoadMoreBtn:document.querySelector(".js-pets-load-more-btn"),petsListPagination:document.querySelector(".pagination")};function p(e,t){try{localStorage.setItem(e,JSON.stringify(t))}catch(a){console.error("Error saving to LocalStorage:",a)}}function C(e){try{const t=localStorage.getItem(e);return t?JSON.parse(t):null}catch(t){return console.error("Error loading from LocalStorage:",t),null}}const T="/fluffy_team/assets/sprite-C5gMIK71.svg";let S=q(),s=C("page")||1,B,n=C("categoryId")??null;document.addEventListener("DOMContentLoaded",N);i.petsLoadMoreBtn.addEventListener("click",H);i.categoryList.addEventListener("click",R);i.petsListPagination.addEventListener("click",x);function q(){return window.innerWidth>=1440?9:8}function M(){return Math.ceil(B/S)}async function N(e){L();try{if(n){const t=await A(),a=await h(n,s);P(t),g(a),f(),u()}else{const t=await A(),a=await y();P(t),g(a),f(),u()}}catch{m.error({title:"Помилка",message:"Щось пішло не так",position:"topRight"})}finally{b()}}async function R(e){if(e.target.nodeName!=="BUTTON")return;const t=e.target.textContent;n=e.target.closest("li").dataset.id,s=1;let c;L(),i.categoryList.querySelectorAll(".category-btn").forEach(r=>{r.classList.remove("current")}),e.target.classList.add("current");try{t!=="Всі"?c=await h(n,s):(n=null,c=await y()),g(c),u(),f()}catch{m.error({title:"Помилка",message:"Щось пішло не так",position:"topRight"})}finally{b(),p("categoryId",n),p("page",s)}}async function H(){s+=1,i.loader.classList.add("loader-center"),L();try{if(n){u();const t=await h(n,s),a=w(t);i.petsList.insertAdjacentHTML("beforeend",a)}else{u();const t=await y(s),a=w(t);i.petsList.insertAdjacentHTML("beforeend",a)}const e=i.petsList.querySelector("li");if(e){const t=e.getBoundingClientRect();window.scrollBy({top:t.height,behavior:"smooth"})}}catch{m.error({title:"Помилка",message:"Щось пішло не так",position:"topRight"})}finally{b(),p("page",s),i.loader.classList.remove("loader-center")}}async function x(e){const t=e.target.closest("button");if(!t)return;let a;const c=M();t.dataset.action==="prev"&&s>1&&(s-=1),t.dataset.action==="next"&&s<c&&(s+=1),t.dataset.page&&(s=Number(t.dataset.page)),L();try{n?a=await h(n,s):a=await y(s),g(a),f(),window.scrollTo({top:i.petsList.offsetTop-80,behavior:"smooth"})}catch{m.error({title:"Помилка",message:"Щось пішло не так",position:"topRight"})}finally{b(),p("page",s)}}async function A(e){return(await $.get(`${v.categories}`)).data}async function y(e){const t=await $.get(`${v.animals}`,{params:{limit:S,page:e}});return B=t.data.totalItems,t.data.animals}async function h(e,t){const a=await $.get(`${v.animals}?categoryId=${e}`,{params:{limit:S,page:t}});return B=a.data.totalItems,a.data.animals}function U(e){const t=e._id===n;return`
     <li class="category-item" data-id="${e._id}">
        <button class="category-btn ${t?"current":""}" type="button">${e.name}</button>
      </li>`}function _(e){return e.reverse().map(U).join("")}function P(e){const a=` <li class="category-item">
        <button class="category-btn ${!n?"current":""}" type="button">Всі</button>
      </li>${_(e)}`;i.categoryList.innerHTML=a}function D({_id:e,name:t,image:a,species:c,age:o,gender:r,categories:l,description:I}){const k=l.map(O=>`<li class="pets-category-item">${O.name}</li>`).join("");return`
     <li class="pets-item" data-id="${e}">
     <div class="pets-img-wrapper"><img class="pets-img" src="${a}" alt="${t} - ${c}" /></div>
        <div class="pets-list-wrapper">
          <p class="pets-category">${c}</p>
          <h3 class="pets-name">${t}</h3>
          <ul class="pets-category-list">${k}</ul>
          <div class="descriprion-wrapper">
            <ul class="descriprion-list">
              <li class="descriprion-item">${o}</li>
              <li class="descriprion-item">${r}</li>
            </ul>
            <p class="pets-descriprion">${I}</p>
            <button class="pets-button" type="button">Дізнатись більше</button>
          </div>
        </div>
      </li>`}function w(e){return e.map(D).join("")}function g(e){const t=w(e);i.petsList.innerHTML=t}function f(){const e=M();if(e<=1)return;let t="";if(t+=`<li>
      <button class="pagination-btn-arrow" data-action="prev" aria-label="Попередня сторінка" ${s===1?"disabled":""}>
        <svg class="arrow-icon" aria-hidden="true" width="24" height="24">
          <use href="${T}#icon-arrow-back"></use>
        </svg>
      </button>
    </li>`,s===1){for(let a=1;a<=Math.min(3,e);a+=1)t+=d(a);e>3&&(t+='<li class="dots">…</li>',t+=d(e))}else{t+=d(1),s>3&&(t+='<li class="dots">…</li>');for(let a=s-1;a<=s+1;a+=1)a>1&&a<e&&(t+=d(a));s<e-2&&(t+='<li class="dots">…</li>'),e>1&&(t+=d(e))}t+=`<li>
      <button class="pagination-btn-arrow" data-action="next" aria-label="Наступна сторінка" ${s===e?"disabled":""}>
        <svg class="arrow-icon" aria-hidden="true" width="24" height="24">
          <use href="${T}#icon-arrow-forward"></use>
        </svg>
      </button>
    </li>`,i.petsListPagination.innerHTML=t}function d(e){return`
    <li>
      <button
        class="pagination-btn ${s===e?"current":""}"
        aria-label="Сторінка ${e}"
        data-page="${e}">
        ${e}
      </button>
    </li>
  `}function L(){i.loader.classList.remove("loader-hidden")}function b(){i.loader.classList.add("loader-hidden")}function F(){i.petsLoadMoreBtn.classList.remove("pets-load-more-btn-hidden")}function J(){i.petsLoadMoreBtn.classList.add("pets-load-more-btn-hidden")}function u(){const e=M();s>=e?J():F()}
//# sourceMappingURL=index.js.map
