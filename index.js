import{a as Y,i as h,S as G,N as se,P as re,A as ie,R as le,b as z}from"./assets/vendor-DfcDIlvk.js";(function(){const t=document.createElement("link").relList;if(t&&t.supports&&t.supports("modulepreload"))return;for(const a of document.querySelectorAll('link[rel="modulepreload"]'))s(a);new MutationObserver(a=>{for(const o of a)if(o.type==="childList")for(const d of o.addedNodes)d.tagName==="LINK"&&d.rel==="modulepreload"&&s(d)}).observe(document,{childList:!0,subtree:!0});function n(a){const o={};return a.integrity&&(o.integrity=a.integrity),a.referrerPolicy&&(o.referrerPolicy=a.referrerPolicy),a.crossOrigin==="use-credentials"?o.credentials="include":a.crossOrigin==="anonymous"?o.credentials="omit":o.credentials="same-origin",o}function s(a){if(a.ep)return;a.ep=!0;const o=n(a);fetch(a.href,o)}})();const i={categoryList:document.querySelector(".js-category-list"),petsList:document.querySelector(".js-pets-list"),loader:document.querySelector(".js-loader"),petsLoadMoreBtn:document.querySelector(".js-pets-load-more-btn"),petsListPagination:document.querySelector(".pagination"),animalDetailsBackdrop:document.querySelector(".animal-details-backdrop")},w={page:3,limit:6},I="/fluffy_team/assets/sprite-C5gMIK71.svg";function f(e,t){try{localStorage.setItem(e,JSON.stringify(t))}catch(n){console.error("Error saving to LocalStorage:",n)}}function B(e){try{const t=localStorage.getItem(e);return t?JSON.parse(t):null}catch(t){return console.error("Error loading from LocalStorage:",t),null}}let Q=null;function ce(e){Q=e}function O(){return Q}i.animalDetailsBackdrop.addEventListener("click",pe);function de(e){const n=B("animals").find(d=>d._id===e);if(!n)return;ue(n),i.animalDetailsBackdrop.classList.add("is-open"),document.body.style.overflow="hidden";const s=document.querySelector(".animal-modal");window.innerWidth>=768&&R(s);const a=document.querySelector(".details-modal-close-btn");window.addEventListener("keydown",N),a.addEventListener("click",H);const o=document.querySelector(".modal-adopt-btn");o&&o.addEventListener("click",()=>{window.dispatchEvent(new CustomEvent("open-order-modal",{detail:{animalId:n._id}}))})}function ue({_id:e,name:t,image:n,species:s,age:a,gender:o,description:d,healthStatus:l,behavior:c}){const p=`
    <div class="animal-modal" data-id="${e}" tabindex="-1" role="dialog">
    <button
      class="details-modal-close-btn"
      type="button"
      aria-label="Закрити модальне вікно"
    >
      <svg class="details-modal-close-btn-icon" width="24" height="24">
        <use href="${I}#icon-close"></use>
      </svg>
    </button>
    <div class="animal-modal-content">
      <div class="animal-modal-img-wrapper">
        <img class="animal-modal-img" src="${n}" alt="${t}-${s}" />
      </div>
      <div class="animal-modal-info">
        <p class="animal-species">${s}</p>
        <h2 class="animal-name">${t}</h2>
        <div class="age-gender-wrapper">
          <p class="animal-age">${a}</p>
          <p class="animal-gender">${o}</p>
        </div>
        <div class="desc-wrapper">
        <div class="description-section">
          <h3 class="descriprion-title">Опис:</h3>
          <p class="descriprion-text">${d}</p>
        </div>
        <div class="description-section">
          <h3 class="descriprion-title">Здоров'я:</h3>
          <p class="descriprion-text">${l}</p>
        </div>
        <div class="description-section last">
          <h3 class="descriprion-title">Поведінка:</h3>
          <p class="descriprion-text">${c}</p>
        </div>
        <button class="modal-adopt-btn" type="button">Взяти додому</button>
      </div>
        </div>
    </div>
  </div>
  `;i.animalDetailsBackdrop.innerHTML=p}function H(){i.animalDetailsBackdrop.classList.remove("is-open"),document.body.style.overflow="",window.removeEventListener("keydown",N);const e=O();e&&e.focus()}function N(e){e.key==="Escape"&&H()}function pe(e){e.currentTarget===e.target&&H()}function R(e){e.focus();const n=e.querySelectorAll(`
    a[href],
    button:not([disabled]),
    textarea,
    input,
    select,
    [tabindex]:not([tabindex="-1"])
  `),s=n[0],a=n[n.length-1];e.addEventListener("keydown",o=>{o.key==="Tab"&&(o.shiftKey&&document.activeElement===s&&(o.preventDefault(),a.focus()),!o.shiftKey&&document.activeElement===a&&(o.preventDefault(),s.focus()))})}const X=document.querySelector(".header-burger-menu"),D=document.querySelector(".header-modal"),me=document.querySelector(".modal-close-button");document.querySelector(".modal-navigation-item");const fe=document.querySelector(".modal-navigation-list"),ge=document.querySelector(".modal-button");function q(e){D.classList.remove("is-open"),document.body.classList.remove("is-modal-open"),document.removeEventListener("keydown",Z),X.blur()}function Z(e){e.key==="Escape"&&q()}ge.addEventListener("click",q);X.addEventListener("click",e=>{e.preventDefault(),D.classList.add("is-open"),document.body.classList.add("is-modal-open"),document.addEventListener("keydown",Z),R(D)});me.addEventListener("click",q);fe.addEventListener("click",e=>{e.target.classList.contains("modal-navigation-link")&&q()});const ye="https://paw-hut.b.goit.study/api",$={animals:"/animals",categories:"/categories",orders:"/orders",feedbacks:"/feedbacks"},x=Y.create({baseURL:ye});async function ve(e=w.page){try{const t=typeof w.limit=="number"&&w.limit>0?w.limit:6,n=typeof e=="number"&&e>=1?e:1;return(await x.get(`${$.feedbacks}`,{params:{limit:t,page:n}})).data.feedbacks}catch{return null}}let j=he(),r=B("page"),F,m=B("categoryId")??null;document.addEventListener("DOMContentLoaded",be);i.petsLoadMoreBtn.addEventListener("click",we);i.categoryList.addEventListener("click",Le);i.petsListPagination.addEventListener("click",Se);i.petsList.addEventListener("click",Ee);function he(){return window.innerWidth>=1440?9:8}function U(){return Math.ceil(F/j)}async function be(e){M(),r=1,m=null,f("page",1),f("categoryId",null);try{const t=await ke(),n=await C();$e(t),K(n),V(),k()}catch{h.error({title:"Помилка",message:"Щось пішло не так",position:"topRight"})}finally{T()}}async function Le(e){if(e.target.nodeName!=="BUTTON")return;const t=e.target.textContent;m=e.target.closest("li").dataset.id,r=1;let s;M(),i.categoryList.querySelectorAll(".category-btn").forEach(o=>{o.classList.remove("current")}),e.target.classList.add("current");try{t!=="Всі"?s=await _(m,r):s=await C(),K(s),k(),V(),i.petsList.querySelector("li").focus()}catch{h.error({title:"Помилка",message:"Щось пішло не так",position:"topRight"})}finally{T(),f("categoryId",m),f("page",r)}}async function we(){r+=1,M();let e;try{m?(k(),e=await _(m,r)):(k(),e=await C(r));const t=ee(e);i.petsList.insertAdjacentHTML("beforeend",t);const n=B("animals")??[];f("animals",[...n,...e]);const s=i.petsList.querySelector("li");if(s){const a=s.getBoundingClientRect();window.scrollBy({top:a.height,behavior:"smooth"})}}catch{h.error({title:"Помилка",message:"Щось пішло не так",position:"topRight"})}finally{T(),f("page",r)}}async function Se(e){const t=e.target.closest("button");if(!t)return;let n;M();const s=U();t.dataset.action==="prev"&&r>1&&(r-=1),t.dataset.action==="next"&&r<s&&(r+=1),t.dataset.page&&(r=Number(t.dataset.page));try{m?n=await _(m,r):n=await C(r),K(n),V(),window.scrollTo({top:i.petsList.offsetTop-80,behavior:"smooth"});const a=i.petsList.querySelector("li");a&&a.focus()}catch{h.error({title:"Помилка",message:"Щось пішло не так",position:"topRight"})}finally{T(),f("page",r)}}function Ee(e){const t=e.target.closest(".pets-button");if(!t)return;const n=t.closest("li");if(!n)return;const s=n.dataset.id;ce(t),de(s)}async function ke(e){return(await x.get(`${$.categories}`)).data}async function C(e){const t=await x.get(`${$.animals}`,{params:{limit:j,page:e}});return F=t.data.totalItems,t.data.animals}async function _(e,t){const n=await x.get(`${$.animals}?categoryId=${e}`,{params:{limit:j,page:t}});return F=n.data.totalItems,n.data.animals}function Be(e){return`
     <li class="category-item" data-id="${e._id}">
        <button class="category-btn" data-text="${e.name}" type="button">${e.name}</button>
      </li>`}function qe(e){return e.reverse().map(Be).join("")}function $e(e){const t=` <li class="category-item">
        <button class="category-btn current" type="button">Всі</button>
      </li>${qe(e)}`;i.categoryList.innerHTML=t}function xe({_id:e,name:t,image:n,species:s,age:a,gender:o,categories:d,description:l}){const c=d.map(p=>`<li class="pets-category-item">${p.name}</li>`).join("");return`
     <li class="pets-item" data-id="${e}" tabindex="0">
     <div class="pets-img-wrapper"><img class="pets-img" loading="lazy" src="${n}" alt="${t} - ${s}" /></div>
        <div class="pets-list-wrapper">
          <p class="pets-category">${s}</p>
          <h3 class="pets-name">${t}</h3>
          <ul class="pets-category-list">${c}</ul>
          <div class="descriprion-wrapper">
            <ul class="descriprion-list">
              <li class="descriprion-item">${a}</li>
              <li class="descriprion-item">${o}</li>
            </ul>
            <p class="pets-descriprion">${l}</p>
            <button class="pets-button" type="button">Дізнатись більше</button>
          </div>
        </div>
      </li>`}function ee(e){return e.map(xe).join("")}function K(e){const t=ee(e);i.petsList.innerHTML=t,f("animals",e)}function V(){const e=U();if(e<=1)return;let t="";if(t+=`<li>
      <button class="pagination-btn-arrow" data-action="prev" aria-label="Попередня сторінка" ${r===1?"disabled":""}>
        <svg class="arrow-icon" aria-hidden="true" width="24" height="24">
          <use href="${I}#icon-arrow-back"></use>
        </svg>
      </button>
    </li>`,r===1){for(let n=1;n<=Math.min(3,e);n+=1)t+=y(n);e>3&&(t+='<li class="dots">…</li>',t+=y(e))}else{t+=y(1),r>3&&(t+='<li class="dots">…</li>');for(let n=r-1;n<=r+1;n+=1)n>1&&n<e&&(t+=y(n));r<e-2&&(t+='<li class="dots">…</li>'),e>1&&(t+=y(e))}t+=`<li>
      <button class="pagination-btn-arrow" data-action="next" aria-label="Наступна сторінка" ${r===e?"disabled":""}>
        <svg class="arrow-icon" aria-hidden="true" width="24" height="24">
          <use href="${I}#icon-arrow-forward"></use>
        </svg>
      </button>
    </li>`,i.petsListPagination.innerHTML=t}function y(e){return`
    <li>
      <button
        class="pagination-btn ${r===e?"current":""}"
        aria-label="Сторінка ${e}"
        data-page="${e}">
        ${e}
      </button>
    </li>
  `}function M(){i.loader.classList.remove("loader-hidden")}function T(){i.loader.classList.add("loader-hidden")}function Ce(){i.petsLoadMoreBtn.classList.remove("pets-load-more-btn-hidden")}function Me(){i.petsLoadMoreBtn.classList.add("pets-load-more-btn-hidden")}function k(){const e=U();r>=e?Me():Ce()}let S=null;function v(e){var d,l;let t=null,n=null;const s=(d=e==null?void 0:e.navigation)==null?void 0:d.prevEl,a=(l=e==null?void 0:e.navigation)==null?void 0:l.nextEl;s&&(t=Array.isArray(s)?s[0]:s),a&&(n=Array.isArray(a)?a[0]:a);const o=(e==null?void 0:e.el)||(e==null?void 0:e.$el)||null;if(o){const c=o.closest(".about-swiper-parent");c&&(t=t||c.querySelector(".about-swiper-button-prev"),n=n||c.querySelector(".about-swiper-button-next"))}if(t){const c=!!(e!=null&&e.isBeginning);t.disabled=c,t.classList.toggle("swiper-button-disabled",c),t.setAttribute("aria-disabled",c?"true":"false")}if(n){const c=!!(e!=null&&e.isEnd);n.disabled=c,n.classList.toggle("swiper-button-disabled",c),n.setAttribute("aria-disabled",c?"true":"false")}}function Te(){const e=document.querySelector(".mySwiper");if(!e)return null;if(e.swiper)try{e.swiper.destroy(!0,!0)}catch{}const t=e.closest(".about-swiper-parent");if(!t)return null;const n=t.querySelector(".about-swiper-button-next"),s=t.querySelector(".about-swiper-button-prev"),a=t.querySelector(".about-swiper-pagination"),o=new G(e,{modules:[se,re],loop:!1,wrapperClass:"about-swiper-wrapper",slideClass:"about-swiper-slide",pagination:{el:a,clickable:!0},slidesPerView:1,spaceBetween:0,breakpoints:{768:{slidesPerView:1}},on:{init(l){v(l)},slideChange(){v(o)}}}),d=(l,c,p)=>{if(!l)return;const L=l[c];if(L)try{l.removeEventListener("click",L)}catch{}l[c]=p,l.addEventListener("click",p)};return d(n,"_aboutUsNext",l=>{l.preventDefault(),o.slideNext(),v(o)}),d(s,"_aboutUsPrev",l=>{l.preventDefault(),o.slidePrev(),v(o)}),v(o),o}function J(){if(S){try{S.destroy(!0,!0)}catch{}S=null}S=Te()}document.readyState==="loading"?document.addEventListener("DOMContentLoaded",J):J();new ie(".accordion-container",{showMultiple:!1,collapse:!0,duration:300,onOpen(e){const t=e.querySelector(".ac-panel");if(!t)return;const n=t.getBoundingClientRect();if(n.bottom>window.innerHeight){const s=n.bottom-window.innerHeight+20;window.scrollBy({top:s,behavior:"smooth"})}}});const Ae=document.querySelectorAll(".faq-question-btn");Ae.forEach(e=>{e.addEventListener("click",()=>{const t=e.getAttribute("aria-expanded")==="true";e.setAttribute("aria-label",t?"Закрити відповідь":"Відкрити відповідь")})});function Pe(e){const t=document.querySelector(".swiper-wrapper"),n=e.map(({description:s,rate:a,author:o})=>`
        <div class="swiper-slide">
          <div class="star-rating" data-score="${a}"></div>     
            <p class="storie-text">${s}</p>
            <p class="storie-names">${o}</p>  
        </div>`).join("");t.insertAdjacentHTML("beforeend",n),document.querySelectorAll(".star-rating").forEach(s=>{new le(s,{starType:"svg",readOnly:!0,half:!0,halfShow:!0}).init()})}const te=document.querySelector(".stories-loader"),Ie=document.querySelector(".swiper-controls");function P(e){h.info({message:e,position:"topRight",color:"#f2aaaaff",icon:!1,progressBar:!1,messageColor:"black"})}function E(){te.classList.remove("loader")}function De(){te.classList.add("loader")}function Oe(){Ie.classList.remove("visually-hidden")}window.addEventListener("DOMContentLoaded",async()=>{De();try{let e=await ve();if(e===null){P("Не вдалося завантажити історії. Спробуйте пізніше"),E();const n=document.querySelector(".swiper-wrapper");n&&(n.innerHTML='<p class="error-swiper">Не вдалося завантажити історії</p>');return}if(e.length===0){P("Нажаль, історії зараз недоступні"),E();const n=document.querySelector(".swiper-wrapper");n&&(n.innerHTML='<p class="error-swiper">Нажаль, історії зараз недоступні</p>');return}Pe(e);const t=new G(".swiper",{direction:"horizontal",grabCursor:!0,keyboard:{enabled:!0,onlyInViewport:!0},loop:!1,speed:400,spaceBetween:32,pagination:{el:".swiper-pagination",clickable:!0,dynamicBullets:!0},navigation:{nextEl:".swiper-button-next",prevEl:".swiper-button-prev"},breakpoints:{768:{slidesPerView:2}}});Oe(),E()}catch{P("Cталась помилка. Спробуйте пізніше");const t=document.querySelector(".swiper-wrapper");t&&(t.innerHTML='<p class="error-swiper">Нажаль, історії зараз недоступні</p>'),E()}});let ne;const g=document.getElementById("order-form"),b=document.getElementById("modal-order"),He=b.querySelector(".modal-close-btn");window.addEventListener("open-order-modal",e=>{var s;const t=(s=e==null?void 0:e.detail)==null?void 0:s.animalId;if(!t)return;ne=t,i&&i.animalDetailsBackdrop&&(i.animalDetailsBackdrop.classList.remove("is-open"),window.removeEventListener("keydown",N)),document.body.style.overflow="",b.classList.remove("visually-hidden"),document.body.classList.add("modal-open"),window.addEventListener("keydown",oe);const n=document.querySelector(".modal-order");R(n)});function A(){b.classList.add("visually-hidden"),document.body.classList.remove("modal-open"),window.removeEventListener("keydown",oe);const e=O();e&&e.focus()}function oe(e){e.key==="Escape"&&A()}function Ne(e){e.target===b&&A()}He.addEventListener("click",A);b.addEventListener("click",Ne);g.addEventListener("submit",async e=>{e.preventDefault();const{name:t,phone:n,comments:s}=e.target.elements,a=t.value.trim();let o=n.value.trim();const d=s.value.trim(),l=g.querySelectorAll(".input-error"),c=g.querySelectorAll(".error-text");if(l.forEach(u=>u.classList.remove("input-error")),c.forEach(u=>u.textContent=""),a.length>32){const u=g.querySelector('.modal-form-input[type="text"]');u.classList.add("input-error"),u.nextElementSibling.textContent="Ім'я не повинно перевищувати 32 символи.";return}const p=/^[0-9]{12}$/;if(o[0]==="+"&&(o=o.slice(1)),o.length!==12){const u=g.querySelector('.modal-form-input[type="tel"]');u.classList.add("input-error"),u.nextElementSibling.textContent="Телефон повинен містити 12 цифр.";return}if(!p.test(o)){const u=g.querySelector('.modal-form-input[type="tel"]');u.classList.add("input-error"),u.nextElementSibling.textContent="Телефон повинен містити лише цифри.";return}if(d.length>255){const u=g.querySelector(".modal-form-textarea");u.classList.add("input-error"),u.nextElementSibling.textContent="Коментар не повинен перевищувати 255 символів.";return}const L={name:a,phone:o,animalId:ne,comment:d.length>0?d:"Без коментарів"};try{const ae=(await Y.post("https://paw-hut.b.goit.study/api/orders",L)).data;return A(),z.fire({title:"Дякуємо за вашу заявку!",icon:"success",confirmButtonText:"Закрити"}).then(()=>{const W=O();W&&W.focus()}),e.target.reset(),ae}catch(u){z.fire({title:"Помилка!",text:"Сталася помилка при надсиланні заявки. Спробуйте ще раз пізніше.",icon:"error",confirmButtonText:"Закрити"}),console.error("Error submitting order:",u)}});function Re(){const e=document.getElementById("scrollTopBtn"),t=document.querySelector("#hero");if(!e||!t)return;const n=t.offsetHeight;window.addEventListener("scroll",()=>{window.scrollY>n?e.classList.add("show"):e.classList.remove("show")}),e.addEventListener("click",()=>{window.scrollTo({top:0,behavior:"smooth"})})}window.addEventListener("load",Re);
//# sourceMappingURL=index.js.map
