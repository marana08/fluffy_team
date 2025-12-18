import{a as j,i as u,A as x,R as N,S as D}from"./assets/vendor-CwR7vHLq.js";(function(){const t=document.createElement("link").relList;if(t&&t.supports&&t.supports("modulepreload"))return;for(const a of document.querySelectorAll('link[rel="modulepreload"]'))s(a);new MutationObserver(a=>{for(const n of a)if(n.type==="childList")for(const l of n.addedNodes)l.tagName==="LINK"&&l.rel==="modulepreload"&&s(l)}).observe(document,{childList:!0,subtree:!0});function r(a){const n={};return a.integrity&&(n.integrity=a.integrity),a.referrerPolicy&&(n.referrerPolicy=a.referrerPolicy),a.crossOrigin==="use-credentials"?n.credentials="include":a.crossOrigin==="anonymous"?n.credentials="omit":n.credentials="same-origin",n}function s(a){if(a.ep)return;a.ep=!0;const n=r(a);fetch(a.href,n)}})();const U=document.querySelector(".header-burger-menu"),f=document.querySelector(".header-modal"),_=document.querySelector(".modal-close-button");document.querySelector(".modal-navigation-item");const z=document.querySelector(".modal-navigation-list"),F=document.querySelector(".modal-button");function B(e){f.classList.remove("is-open")}document.addEventListener("keydown",e=>{const t=e.key==="Escape",r=f.classList.contains("is-open");t&&r&&f.classList.remove("is-open")});F.addEventListener("click",B);U.addEventListener("click",e=>{e.preventDefault(),f.classList.add("is-open")});_.addEventListener("click",B);z.addEventListener("click",B);const i={categoryList:document.querySelector(".js-category-list"),petsList:document.querySelector(".js-pets-list"),loader:document.querySelector(".js-loader"),petsLoadMoreBtn:document.querySelector(".js-pets-load-more-btn"),petsListPagination:document.querySelector(".pagination")},p={page:1,limit:6},J="https://paw-hut.b.goit.study/api",h={animals:"/animals",categories:"/categories",orders:"/orders",feedbacks:"/feedbacks"},L=j.create({baseURL:J});async function K(e=p.page){try{const t=typeof p.limit=="number"&&p.limit>0?p.limit:6,r=typeof e=="number"&&e>=1?e:1;return(await L.get(`${h.feedbacks}`,{params:{limit:t,page:r}})).data.feedbacks}catch{return null}}function g(e,t){try{localStorage.setItem(e,JSON.stringify(t))}catch(r){console.error("Error saving to LocalStorage:",r)}}function A(e){try{const t=localStorage.getItem(e);return t?JSON.parse(t):null}catch(t){return console.error("Error loading from LocalStorage:",t),null}}const P="/fluffy_team/assets/sprite-C5gMIK71.svg";let q=W(),o=A("page")||1,k,c=A("categoryId")??null;document.addEventListener("DOMContentLoaded",V);i.petsLoadMoreBtn.addEventListener("click",Q);i.categoryList.addEventListener("click",G);i.petsListPagination.addEventListener("click",X);function W(){return window.innerWidth>=1440?9:8}function M(){return Math.ceil(k/q)}async function V(e){b(),o=1;try{const t=await Y(),r=await w();te(t),T(r),C(),y()}catch{u.error({title:"Помилка",message:"Щось пішло не так",position:"topRight"})}finally{v()}}async function G(e){if(e.target.nodeName!=="BUTTON")return;const t=e.target.textContent;c=e.target.closest("li").dataset.id,o=1;let s;b(),i.categoryList.querySelectorAll(".category-btn").forEach(n=>{n.classList.remove("current")}),e.target.classList.add("current");try{t!=="Всі"?s=await E(c,o):(c=null,s=await w()),T(s),y(),C()}catch{u.error({title:"Помилка",message:"Щось пішло не так",position:"topRight"})}finally{v(),g("categoryId",c),g("page",o)}}async function Q(){o+=1,i.loader.classList.add("loader-center"),b();try{if(c){y();const t=await E(c,o),r=$(t);i.petsList.insertAdjacentHTML("beforeend",r)}else{y();const t=await w(o),r=$(t);i.petsList.insertAdjacentHTML("beforeend",r)}const e=i.petsList.querySelector("li");if(e){const t=e.getBoundingClientRect();window.scrollBy({top:t.height,behavior:"smooth"})}}catch{u.error({title:"Помилка",message:"Щось пішло не так",position:"topRight"})}finally{v(),g("page",o),i.loader.classList.remove("loader-center")}}async function X(e){const t=e.target.closest("button");if(!t)return;let r;const s=M();t.dataset.action==="prev"&&o>1&&(o-=1),t.dataset.action==="next"&&o<s&&(o+=1),t.dataset.page&&(o=Number(t.dataset.page)),b();try{c?r=await E(c,o):r=await w(o),T(r),C(),window.scrollTo({top:i.petsList.offsetTop-80,behavior:"smooth"})}catch{u.error({title:"Помилка",message:"Щось пішло не так",position:"topRight"})}finally{v(),g("page",o)}}async function Y(e){return(await L.get(`${h.categories}`)).data}async function w(e){const t=await L.get(`${h.animals}`,{params:{limit:q,page:e}});return k=t.data.totalItems,t.data.animals}async function E(e,t){const r=await L.get(`${h.animals}?categoryId=${e}`,{params:{limit:q,page:t}});return k=r.data.totalItems,r.data.animals}function Z(e){return`
     <li class="category-item" data-id="${e._id}">
        <button class="category-btn" type="button">${e.name}</button>
      </li>`}function ee(e){return e.map(Z).join("")}function te(e){const t=` <li class="category-item">
        <button class="category-btn current" type="button">Всі</button>
      </li>${ee(e)}`;i.categoryList.innerHTML=t}function re({_id:e,name:t,image:r,species:s,age:a,gender:n,categories:l,description:I}){const H=l.map(R=>`<li class="pets-category-item">${R.name}</li>`).join("");return`
     <li class="pets-item" data-id="${e}">
     <div class="pets-img-wrapper"><img class="pets-img" src="${r}" alt="${t} - ${s}" /></div>
        <div class="pets-list-wrapper">
          <p class="pets-category">${s}</p>
          <h3 class="pets-name">${t}</h3>
          <ul class="pets-category-list">${H}</ul>
          <div class="descriprion-wrapper">
            <ul class="descriprion-list">
              <li class="descriprion-item">${a}</li>
              <li class="descriprion-item">${n}</li>
            </ul>
            <p class="pets-descriprion">${I}</p>
            <button class="pets-button" type="button">Дізнатись більше</button>
          </div>
        </div>
      </li>`}function $(e){return e.map(re).join("")}function T(e){const t=$(e);i.petsList.innerHTML=t}function C(){const e=M();if(e<=1)return;let t="";if(t+=`<li>
      <button class="pagination-btn-arrow" data-action="prev" aria-label="Попередня сторінка" ${o===1?"disabled":""}>
        <svg class="arrow-icon" aria-hidden="true" width="24" height="24">
          <use href="${P}#icon-arrow-back"></use>
        </svg>
      </button>
    </li>`,o===1){for(let r=1;r<=Math.min(3,e);r+=1)t+=d(r);e>3&&(t+='<li class="dots">…</li>',t+=d(e))}else{t+=d(1),o>3&&(t+='<li class="dots">…</li>');for(let r=o-1;r<=o+1;r+=1)r>1&&r<e&&(t+=d(r));o<e-2&&(t+='<li class="dots">…</li>'),e>1&&(t+=d(e))}t+=`<li>
      <button class="pagination-btn-arrow" data-action="next" aria-label="Наступна сторінка" ${o===e?"disabled":""}>
        <svg class="arrow-icon" aria-hidden="true" width="24" height="24">
          <use href="${P}#icon-arrow-forward"></use>
        </svg>
      </button>
    </li>`,i.petsListPagination.innerHTML=t}function d(e){return`
    <li>
      <button
        class="pagination-btn ${o===e?"current":""}"
        aria-label="Сторінка ${e}"
        data-page="${e}">
        ${e}
      </button>
    </li>
  `}function b(){i.loader.classList.remove("loader-hidden")}function v(){i.loader.classList.add("loader-hidden")}function oe(){i.petsLoadMoreBtn.classList.remove("pets-load-more-btn-hidden")}function ae(){i.petsLoadMoreBtn.classList.add("pets-load-more-btn-hidden")}function y(){const e=M();o>=e?ae():oe()}new x(".accordion-container",{showMultiple:!1,collapse:!0,duration:300,onOpen(e){const t=e.querySelector(".ac-panel");if(!t)return;const r=t.getBoundingClientRect();if(r.bottom>window.innerHeight){const s=r.bottom-window.innerHeight+20;window.scrollBy({top:s,behavior:"smooth"})}}});const se=document.querySelectorAll(".faq-question-btn");se.forEach(e=>{e.addEventListener("click",()=>{const t=e.getAttribute("aria-expanded")==="true";e.setAttribute("aria-label",t?"Закрити відповідь":"Відкрити відповідь")})});function ne(e){const t=document.querySelector(".swiper-wrapper"),r=e.map(({description:s,rate:a,author:n})=>`
        <div class="swiper-slide">
          <div class="star-rating" data-score="${a}"></div>     
            <p class="storie-text">${s}</p>
            <p class="storie-names">${n}</p>  
        </div>`).join("");t.insertAdjacentHTML("beforeend",r),document.querySelectorAll(".star-rating").forEach(s=>{new N(s,{starType:"svg",readOnly:!0}).init()})}const O=document.querySelector(".stories-loader"),ie=document.querySelector(".swiper-controls");function S(e){u.info({message:e,position:"topRight",color:"#f2aaaaff",icon:!1,progressBar:!1,messageColor:"black"})}function m(){O.classList.remove("loader")}function ce(){O.classList.add("loader")}function le(){ie.classList.remove("visually-hidden")}window.addEventListener("DOMContentLoaded",async()=>{ce();try{let e=await K();if(e===null){S("Не вдалося завантажити історії. Спробуйте пізніше"),m();const r=document.querySelector(".swiper-wrapper");r&&(r.innerHTML='<p class="error-swiper">Не вдалося завантажити історії</p>');return}if(e.length===0){S("Нажаль, історії зараз недоступні"),m();const r=document.querySelector(".swiper-wrapper");r&&(r.innerHTML='<p class="error-swiper">Нажаль, історії зараз недоступні</p>');return}ne(e);const t=new D(".swiper",{direction:"horizontal",loop:!1,speed:400,spaceBetween:32,pagination:{el:".swiper-pagination",clickable:!0,dynamicBullets:!1},navigation:{nextEl:".swiper-button-next",prevEl:".swiper-button-prev"},breakpoints:{768:{slidesPerView:2}}});le(),m()}catch{S("Cталась помилка. Спробуйте пізніше");const t=document.querySelector(".swiper-wrapper");t&&(t.innerHTML='<p class="error-swiper">Нажаль, історії зараз недоступні</p>'),m()}});
//# sourceMappingURL=index.js.map
