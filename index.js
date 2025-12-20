import{a as W,i as h,S as z,N as te,P as ne,A as oe,R as ae,b as _}from"./assets/vendor-DfcDIlvk.js";(function(){const t=document.createElement("link").relList;if(t&&t.supports&&t.supports("modulepreload"))return;for(const a of document.querySelectorAll('link[rel="modulepreload"]'))r(a);new MutationObserver(a=>{for(const o of a)if(o.type==="childList")for(const c of o.addedNodes)c.tagName==="LINK"&&c.rel==="modulepreload"&&r(c)}).observe(document,{childList:!0,subtree:!0});function n(a){const o={};return a.integrity&&(o.integrity=a.integrity),a.referrerPolicy&&(o.referrerPolicy=a.referrerPolicy),a.crossOrigin==="use-credentials"?o.credentials="include":a.crossOrigin==="anonymous"?o.credentials="omit":o.credentials="same-origin",o}function r(a){if(a.ep)return;a.ep=!0;const o=n(a);fetch(a.href,o)}})();const re=document.querySelector(".header-burger-menu"),F=document.querySelector(".header-modal"),se=document.querySelector(".modal-close-button");document.querySelector(".modal-navigation-item");const ie=document.querySelector(".modal-navigation-list"),le=document.querySelector(".modal-button");function B(e){F.classList.remove("is-open"),document.body.classList.remove("is-modal-open"),document.removeEventListener("keydown",J)}function J(e){e.key==="Escape"&&B()}le.addEventListener("click",B);re.addEventListener("click",e=>{e.preventDefault(),F.classList.add("is-open"),document.body.classList.add("is-modal-open"),document.addEventListener("keydown",J)});se.addEventListener("click",B);ie.addEventListener("click",e=>{e.target.classList.contains("modal-navigation-link")&&B()});const s={categoryList:document.querySelector(".js-category-list"),petsList:document.querySelector(".js-pets-list"),loader:document.querySelector(".js-loader"),petsLoadMoreBtn:document.querySelector(".js-pets-load-more-btn"),petsListPagination:document.querySelector(".pagination"),animalDetailsBackdrop:document.querySelector(".animal-details-backdrop")},w={page:1,limit:6},ce="https://paw-hut.b.goit.study/api",$={animals:"/animals",categories:"/categories",orders:"/orders",feedbacks:"/feedbacks"},q=W.create({baseURL:ce});async function de(e=w.page){try{const t=typeof w.limit=="number"&&w.limit>0?w.limit:6,n=typeof e=="number"&&e>=1?e:1;return(await q.get(`${$.feedbacks}`,{params:{limit:t,page:n}})).data.feedbacks}catch{return null}}function g(e,t){try{localStorage.setItem(e,JSON.stringify(t))}catch(n){console.error("Error saving to LocalStorage:",n)}}function K(e){try{const t=localStorage.getItem(e);return t?JSON.parse(t):null}catch(t){return console.error("Error loading from LocalStorage:",t),null}}const I="/fluffy_team/assets/sprite-C5gMIK71.svg";s.animalDetailsBackdrop.addEventListener("click",pe);function Y(e,t){if(e.target.nodeName!=="BUTTON")return;const r=e.target.closest("li").dataset.id,a=t.find(l=>l._id===r);if(!a)return;ue(a),s.animalDetailsBackdrop.classList.add("is-open"),document.body.style.overflow="hidden",window.addEventListener("keydown",G),document.querySelector(".details-modal-close-btn").addEventListener("click",O);const c=document.querySelector(".modal-adopt-btn");a._id,c&&c.addEventListener("click",()=>{window.dispatchEvent(new CustomEvent("open-order-modal",{detail:{animalId:a._id}}))})}function ue({_id:e,name:t,image:n,species:r,age:a,gender:o,description:c,healthStatus:l,behavior:d}){const p=`
    <div class="animal-modal" data-id="${e}">
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
        <img class="animal-modal-img" src="${n}" alt="${t}-${r}" />
      </div>
      <div class="animal-modal-info">
        <p class="animal-species">${r}</p>
        <h2 class="animal-name">${t}</h2>
        <div class="age-gender-wrapper">
          <p class="animal-age">${a}</p>
          <p class="animal-gender">${o}</p>
        </div>
        <div class="description-section">
          <h3 class="descriprion-title">Опис:</h3>
          <p class="descriprion-text">${c}</p>
        </div>
        <div class="description-section">
          <h3 class="descriprion-title">Здоров"я:</h3>
          <p class="descriprion-text">${l}</p>
        </div>
        <div class="description-section last">
          <h3 class="descriprion-title">Поведінка:</h3>
          <p class="descriprion-text">${d}</p>
        </div>
        <button class="modal-adopt-btn" type="button">Взяти додому</button>
      </div>
    </div>
  </div>
  `;s.animalDetailsBackdrop.innerHTML=p}function O(){s.animalDetailsBackdrop.classList.remove("is-open"),document.body.style.overflow="",window.removeEventListener("keydown",G)}function G(e){e.code==="Escape"&&O()}function pe(e){e.currentTarget===e.target&&O()}let D=me(),i=K("page"),H,m=K("categoryId")??null;document.addEventListener("DOMContentLoaded",fe);s.petsLoadMoreBtn.addEventListener("click",ye);s.categoryList.addEventListener("click",ge);s.petsListPagination.addEventListener("click",ve);function me(){return window.innerWidth>=1440?9:8}function N(){return Math.ceil(H/D)}async function fe(e){M(),i=1,m=null,g("page",1),g("categoryId",null);try{const t=await he(),n=await x();we(t),j(n),U(),k(),s.petsList.addEventListener("click",r=>Y(r,n))}catch{h.error({title:"Помилка",message:"Щось пішло не так",position:"topRight"})}finally{T()}}async function ge(e){if(e.target.nodeName!=="BUTTON")return;const t=e.target.textContent;m=e.target.closest("li").dataset.id,i=1;let r;M(),s.categoryList.querySelectorAll(".category-btn").forEach(o=>{o.classList.remove("current")}),e.target.classList.add("current");try{t!=="Всі"?r=await R(m,i):r=await x(),j(r),k(),U(),s.petsList.addEventListener("click",o=>Y(o,r))}catch{h.error({title:"Помилка",message:"Щось пішло не так",position:"topRight"})}finally{T(),g("categoryId",m),g("page",i)}}async function ye(){i+=1,s.loader.classList.add("loader-center"),M();try{if(m){k();const t=await R(m,i),n=A(t);s.petsList.insertAdjacentHTML("beforeend",n)}else{k();const t=await x(i),n=A(t);s.petsList.insertAdjacentHTML("beforeend",n)}const e=s.petsList.querySelector("li");if(e){const t=e.getBoundingClientRect();window.scrollBy({top:t.height,behavior:"smooth"})}}catch{h.error({title:"Помилка",message:"Щось пішло не так",position:"topRight"})}finally{T(),g("page",i),s.loader.classList.remove("loader-center")}}async function ve(e){const t=e.target.closest("button");if(!t)return;let n;s.loader.classList.add("loader-center"),M();const r=N();t.dataset.action==="prev"&&i>1&&(i-=1),t.dataset.action==="next"&&i<r&&(i+=1),t.dataset.page&&(i=Number(t.dataset.page));try{m?n=await R(m,i):n=await x(i),j(n),U(),window.scrollTo({top:s.petsList.offsetTop-80,behavior:"smooth"})}catch{h.error({title:"Помилка",message:"Щось пішло не так",position:"topRight"})}finally{T(),s.loader.classList.remove("loader-center"),g("page",i)}}async function he(e){return(await q.get(`${$.categories}`)).data}async function x(e){const t=await q.get(`${$.animals}`,{params:{limit:D,page:e}});return H=t.data.totalItems,t.data.animals}async function R(e,t){const n=await q.get(`${$.animals}?categoryId=${e}`,{params:{limit:D,page:t}});return H=n.data.totalItems,n.data.animals}function Le(e){return`
     <li class="category-item" data-id="${e._id}">
        <button class="category-btn" data-text="${e.name}" type="button">${e.name}</button>
      </li>`}function be(e){return e.reverse().map(Le).join("")}function we(e){const t=` <li class="category-item">
        <button class="category-btn current" type="button">Всі</button>
      </li>${be(e)}`;s.categoryList.innerHTML=t}function Se({_id:e,name:t,image:n,species:r,age:a,gender:o,categories:c,description:l}){const d=c.map(p=>`<li class="pets-category-item">${p.name}</li>`).join("");return`
     <li class="pets-item" data-id="${e}">
     <div class="pets-img-wrapper"><img class="pets-img" src="${n}" alt="${t} - ${r}" /></div>
        <div class="pets-list-wrapper">
          <p class="pets-category">${r}</p>
          <h3 class="pets-name">${t}</h3>
          <ul class="pets-category-list">${d}</ul>
          <div class="descriprion-wrapper">
            <ul class="descriprion-list">
              <li class="descriprion-item">${a}</li>
              <li class="descriprion-item">${o}</li>
            </ul>
            <p class="pets-descriprion">${l}</p>
            <button class="pets-button" type="button">Дізнатись більше</button>
          </div>
        </div>
      </li>`}function A(e){return e.map(Se).join("")}function j(e){const t=A(e);s.petsList.innerHTML=t}function U(){const e=N();if(e<=1)return;let t="";if(t+=`<li>
      <button class="pagination-btn-arrow" data-action="prev" aria-label="Попередня сторінка" ${i===1?"disabled":""}>
        <svg class="arrow-icon" aria-hidden="true" width="24" height="24">
          <use href="${I}#icon-arrow-back"></use>
        </svg>
      </button>
    </li>`,i===1){for(let n=1;n<=Math.min(3,e);n+=1)t+=y(n);e>3&&(t+='<li class="dots">…</li>',t+=y(e))}else{t+=y(1),i>3&&(t+='<li class="dots">…</li>');for(let n=i-1;n<=i+1;n+=1)n>1&&n<e&&(t+=y(n));i<e-2&&(t+='<li class="dots">…</li>'),e>1&&(t+=y(e))}t+=`<li>
      <button class="pagination-btn-arrow" data-action="next" aria-label="Наступна сторінка" ${i===e?"disabled":""}>
        <svg class="arrow-icon" aria-hidden="true" width="24" height="24">
          <use href="${I}#icon-arrow-forward"></use>
        </svg>
      </button>
    </li>`,s.petsListPagination.innerHTML=t}function y(e){return`
    <li>
      <button
        class="pagination-btn ${i===e?"current":""}"
        aria-label="Сторінка ${e}"
        data-page="${e}">
        ${e}
      </button>
    </li>
  `}function M(){s.loader.classList.remove("loader-hidden")}function T(){s.loader.classList.add("loader-hidden")}function Ee(){s.petsLoadMoreBtn.classList.remove("pets-load-more-btn-hidden")}function ke(){s.petsLoadMoreBtn.classList.add("pets-load-more-btn-hidden")}function k(){const e=N();i>=e?ke():Ee()}let S=null;function v(e){var c,l;let t=null,n=null;const r=(c=e==null?void 0:e.navigation)==null?void 0:c.prevEl,a=(l=e==null?void 0:e.navigation)==null?void 0:l.nextEl;r&&(t=Array.isArray(r)?r[0]:r),a&&(n=Array.isArray(a)?a[0]:a);const o=(e==null?void 0:e.el)||(e==null?void 0:e.$el)||null;if(o){const d=o.closest(".about-swiper-parent");d&&(t=t||d.querySelector(".about-swiper-button-prev"),n=n||d.querySelector(".about-swiper-button-next"))}if(t){const d=!!(e!=null&&e.isBeginning);t.disabled=d,t.classList.toggle("swiper-button-disabled",d),t.setAttribute("aria-disabled",d?"true":"false")}if(n){const d=!!(e!=null&&e.isEnd);n.disabled=d,n.classList.toggle("swiper-button-disabled",d),n.setAttribute("aria-disabled",d?"true":"false")}}function Be(){const e=document.querySelector(".mySwiper");if(!e)return null;if(e.swiper)try{e.swiper.destroy(!0,!0)}catch{}const t=e.closest(".about-swiper-parent");if(!t)return null;const n=t.querySelector(".about-swiper-button-next"),r=t.querySelector(".about-swiper-button-prev"),a=e.querySelector(".about-swiper-pagination"),o=new z(e,{modules:[te,ne],loop:!1,wrapperClass:"about-swiper-wrapper",slideClass:"about-swiper-slide",pagination:{el:a,clickable:!0},slidesPerView:1,spaceBetween:0,breakpoints:{768:{slidesPerView:1}},on:{init(l){v(l)},slideChange(){v(o)}}}),c=(l,d,p)=>{if(!l)return;const b=l[d];if(b)try{l.removeEventListener("click",b)}catch{}l[d]=p,l.addEventListener("click",p)};return c(n,"_aboutUsNext",l=>{l.preventDefault(),o.slideNext(),v(o)}),c(r,"_aboutUsPrev",l=>{l.preventDefault(),o.slidePrev(),v(o)}),v(o),o}function V(){if(S){try{S.destroy(!0,!0)}catch{}S=null}S=Be()}document.readyState==="loading"?document.addEventListener("DOMContentLoaded",V):V();new oe(".accordion-container",{showMultiple:!1,collapse:!0,duration:300,onOpen(e){const t=e.querySelector(".ac-panel");if(!t)return;const n=t.getBoundingClientRect();if(n.bottom>window.innerHeight){const r=n.bottom-window.innerHeight+20;window.scrollBy({top:r,behavior:"smooth"})}}});const $e=document.querySelectorAll(".faq-question-btn");$e.forEach(e=>{e.addEventListener("click",()=>{const t=e.getAttribute("aria-expanded")==="true";e.setAttribute("aria-label",t?"Закрити відповідь":"Відкрити відповідь")})});function qe(e){const t=document.querySelector(".swiper-wrapper"),n=e.map(({description:r,rate:a,author:o})=>`
        <div class="swiper-slide">
          <div class="star-rating" data-score="${a}"></div>     
            <p class="storie-text">${r}</p>
            <p class="storie-names">${o}</p>  
        </div>`).join("");t.insertAdjacentHTML("beforeend",n),document.querySelectorAll(".star-rating").forEach(r=>{new ae(r,{starType:"svg",readOnly:!0}).init()})}const Q=document.querySelector(".stories-loader"),xe=document.querySelector(".swiper-controls");function P(e){h.info({message:e,position:"topRight",color:"#f2aaaaff",icon:!1,progressBar:!1,messageColor:"black"})}function E(){Q.classList.remove("loader")}function Me(){Q.classList.add("loader")}function Te(){xe.classList.remove("visually-hidden")}window.addEventListener("DOMContentLoaded",async()=>{Me();try{let e=await de();if(e===null){P("Не вдалося завантажити історії. Спробуйте пізніше"),E();const n=document.querySelector(".swiper-wrapper");n&&(n.innerHTML='<p class="error-swiper">Не вдалося завантажити історії</p>');return}if(e.length===0){P("Нажаль, історії зараз недоступні"),E();const n=document.querySelector(".swiper-wrapper");n&&(n.innerHTML='<p class="error-swiper">Нажаль, історії зараз недоступні</p>');return}qe(e);const t=new z(".swiper",{direction:"horizontal",loop:!1,speed:400,spaceBetween:32,pagination:{el:".swiper-pagination",clickable:!0,dynamicBullets:!1},navigation:{nextEl:".swiper-button-next",prevEl:".swiper-button-prev"},breakpoints:{768:{slidesPerView:2}}});Te(),E()}catch{P("Cталась помилка. Спробуйте пізніше");const t=document.querySelector(".swiper-wrapper");t&&(t.innerHTML='<p class="error-swiper">Нажаль, історії зараз недоступні</p>'),E()}});let X;const f=document.getElementById("order-form"),L=document.getElementById("modal-order"),Ce=L.querySelector(".modal-close-btn");window.addEventListener("open-order-modal",e=>{var n;const t=(n=e==null?void 0:e.detail)==null?void 0:n.animalId;t&&(X=t,s&&s.animalDetailsBackdrop&&s.animalDetailsBackdrop.classList.remove("is-open"),document.body.style.overflow="",L.classList.remove("visually-hidden"),document.body.classList.add("modal-open"),window.addEventListener("keydown",Z))});function C(){L.classList.add("visually-hidden"),document.body.classList.remove("modal-open"),window.removeEventListener("keydown",Z)}function Z(e){e.key==="Escape"&&C()}function Pe(e){e.target===L&&C()}Ce.addEventListener("click",C);L.addEventListener("click",Pe);f.addEventListener("submit",async e=>{e.preventDefault();const{name:t,phone:n,comments:r}=e.target.elements,a=t.value.trim();let o=n.value.trim();const c=r.value.trim(),l=f.querySelectorAll(".input-error"),d=f.querySelectorAll(".error-text");if(l.forEach(u=>u.classList.remove("input-error")),d.forEach(u=>u.textContent=""),a.length>32){const u=f.querySelector('.modal-form-input[type="text"]');u.classList.add("input-error"),u.nextElementSibling.textContent="Ім'я не повинно перевищувати 32 символи.";return}const p=/^[0-9]{12}$/;if(o[0]==="+"&&(o=o.slice(1)),o.length!==12){const u=f.querySelector('.modal-form-input[type="tel"]');u.classList.add("input-error"),u.nextElementSibling.textContent="Телефон повинен містити 12 цифр.";return}if(!p.test(o)){const u=f.querySelector('.modal-form-input[type="tel"]');u.classList.add("input-error"),u.nextElementSibling.textContent="Телефон повинен містити лише цифри.";return}if(c.length>255){const u=f.querySelector(".modal-form-textarea");u.classList.add("input-error"),u.nextElementSibling.textContent="Коментар не повинен перевищувати 255 символів.";return}const b={name:a,phone:o,animalId:X,comment:c.length>0?c:"Без коментарів"};try{const ee=(await W.post("https://paw-hut.b.goit.study/api/orders",b)).data;return _.fire({title:"Дякуємо за вашу заявку!",icon:"success",confirmButtonText:"Закрити"}),e.target.reset(),C(),ee}catch(u){_.fire({title:"Помилка!",text:"Сталася помилка при надсиланні заявки. Спробуйте ще раз пізніше.",icon:"error",confirmButtonText:"Закрити"}),console.error("Error submitting order:",u)}});function Ie(){const e=document.getElementById("scrollTopBtn"),t=document.querySelector("#hero");if(!e||!t)return;const n=t.offsetHeight;window.addEventListener("scroll",()=>{window.scrollY>n?e.classList.add("show"):e.classList.remove("show")}),e.addEventListener("click",()=>{window.scrollTo({top:0,behavior:"smooth"})})}window.addEventListener("load",Ie);
//# sourceMappingURL=index.js.map
