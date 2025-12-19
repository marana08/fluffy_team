import{a as j,i as w,S as _,N as Y,P as Z,A as ee,R as te,b as R}from"./assets/vendor-BMg9SRtg.js";(function(){const t=document.createElement("link").relList;if(t&&t.supports&&t.supports("modulepreload"))return;for(const o of document.querySelectorAll('link[rel="modulepreload"]'))r(o);new MutationObserver(o=>{for(const a of o)if(a.type==="childList")for(const c of a.addedNodes)c.tagName==="LINK"&&c.rel==="modulepreload"&&r(c)}).observe(document,{childList:!0,subtree:!0});function n(o){const a={};return o.integrity&&(a.integrity=o.integrity),o.referrerPolicy&&(a.referrerPolicy=o.referrerPolicy),o.crossOrigin==="use-credentials"?a.credentials="include":o.crossOrigin==="anonymous"?a.credentials="omit":a.credentials="same-origin",a}function r(o){if(o.ep)return;o.ep=!0;const a=n(o);fetch(o.href,a)}})();const ne=document.querySelector(".header-burger-menu"),U=document.querySelector(".header-modal"),oe=document.querySelector(".modal-close-button");document.querySelector(".modal-navigation-item");const ae=document.querySelector(".modal-navigation-list"),re=document.querySelector(".modal-button");function E(e){U.classList.remove("is-open"),document.body.classList.remove("is-modal-open"),document.removeEventListener("keydown",V)}function V(e){e.key==="Escape"&&E()}re.addEventListener("click",E);ne.addEventListener("click",e=>{e.preventDefault(),U.classList.add("is-open"),document.body.classList.add("is-modal-open"),document.addEventListener("keydown",V)});oe.addEventListener("click",E);ae.addEventListener("click",e=>{e.target.classList.contains("modal-navigation-link")&&E()});const s={categoryList:document.querySelector(".js-category-list"),petsList:document.querySelector(".js-pets-list"),loader:document.querySelector(".js-loader"),petsLoadMoreBtn:document.querySelector(".js-pets-load-more-btn"),petsListPagination:document.querySelector(".pagination"),animalDetailsBackdrop:document.querySelector(".animal-details-backdrop")},v={page:1,limit:6},se="https://paw-hut.b.goit.study/api",S={animals:"/animals",categories:"/categories",orders:"/orders",feedbacks:"/feedbacks"},k=j.create({baseURL:se});async function ie(e=v.page){try{const t=typeof v.limit=="number"&&v.limit>0?v.limit:6,n=typeof e=="number"&&e>=1?e:1;return(await k.get(`${S.feedbacks}`,{params:{limit:t,page:n}})).data.feedbacks}catch{return null}}function m(e,t){try{localStorage.setItem(e,JSON.stringify(t))}catch(n){console.error("Error saving to LocalStorage:",n)}}function W(e){try{const t=localStorage.getItem(e);return t?JSON.parse(t):null}catch(t){return console.error("Error loading from LocalStorage:",t),null}}const C="/fluffy_team/assets/sprite-C5gMIK71.svg";s.animalDetailsBackdrop.addEventListener("click",ce);function z(e,t){if(e.target.nodeName!=="BUTTON")return;const r=e.target.closest("li").dataset.id,o=t.find(p=>p._id===r);if(!o)return;le(o),s.animalDetailsBackdrop.classList.add("is-open"),document.body.style.overflow="hidden",window.addEventListener("keydown",F),document.querySelector(".details-modal-close-btn").addEventListener("click",I);const c=document.querySelector(".modal-adopt-btn");o._id,c&&c.addEventListener("click",()=>{window.dispatchEvent(new CustomEvent("open-order-modal",{detail:{animalId:o._id}}))})}function le({_id:e,name:t,image:n,species:r,age:o,gender:a,description:c,healthStatus:p,behavior:f}){const g=`
    <div class="animal-modal" data-id="${e}">
    <button
      class="details-modal-close-btn"
      type="button"
      aria-label="Закрити модальне вікно"
    >
      <svg class="details-modal-close-btn-icon" width="24" height="24">
        <use href="${C}#icon-close"></use>
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
          <p class="animal-age">${o}</p>
          <p class="animal-gender">${a}</p>
        </div>
        <div class="description-section">
          <h3 class="descriprion-title">Опис:</h3>
          <p class="descriprion-text">${c}</p>
        </div>
        <div class="description-section">
          <h3 class="descriprion-title">Здоров"я:</h3>
          <p class="descriprion-text">${p}</p>
        </div>
        <div class="description-section last">
          <h3 class="descriprion-title">Поведінка:</h3>
          <p class="descriprion-text">${f}</p>
        </div>
        <button class="modal-adopt-btn" type="button">Взяти додому</button>
      </div>
    </div>
  </div>
  `;s.animalDetailsBackdrop.innerHTML=g}function I(){s.animalDetailsBackdrop.classList.remove("is-open"),document.body.style.overflow="",window.removeEventListener("keydown",F)}function F(e){e.code==="Escape"&&I()}function ce(e){e.currentTarget===e.target&&I()}let P=de(),i=W("page"),O,d=W("categoryId")??null;document.addEventListener("DOMContentLoaded",pe);s.petsLoadMoreBtn.addEventListener("click",me);s.categoryList.addEventListener("click",ue);s.petsListPagination.addEventListener("click",fe);function de(){return window.innerWidth>=1440?9:8}function A(){return Math.ceil(O/P)}async function pe(e){$(),i=1,d=null,m("page",1),m("categoryId",null);try{const t=await ge(),n=await B();he(t),H(n),N(),b(),s.petsList.addEventListener("click",r=>z(r,n))}catch{w.error({title:"Помилка",message:"Щось пішло не так",position:"topRight"})}finally{q()}}async function ue(e){if(e.target.nodeName!=="BUTTON")return;const t=e.target.textContent;d=e.target.closest("li").dataset.id,i=1;let r;$(),s.categoryList.querySelectorAll(".category-btn").forEach(a=>{a.classList.remove("current")}),e.target.classList.add("current");try{t!=="Всі"?r=await D(d,i):r=await B(),H(r),b(),N(),s.petsList.addEventListener("click",a=>z(a,r))}catch{w.error({title:"Помилка",message:"Щось пішло не так",position:"topRight"})}finally{q(),m("categoryId",d),m("page",i)}}async function me(){i+=1,s.loader.classList.add("loader-center"),$();try{if(d){b();const t=await D(d,i),n=T(t);s.petsList.insertAdjacentHTML("beforeend",n)}else{b();const t=await B(i),n=T(t);s.petsList.insertAdjacentHTML("beforeend",n)}const e=s.petsList.querySelector("li");if(e){const t=e.getBoundingClientRect();window.scrollBy({top:t.height,behavior:"smooth"})}}catch{w.error({title:"Помилка",message:"Щось пішло не так",position:"topRight"})}finally{q(),m("page",i),s.loader.classList.remove("loader-center")}}async function fe(e){const t=e.target.closest("button");if(!t)return;let n;const r=A();t.dataset.action==="prev"&&i>1&&(i-=1),t.dataset.action==="next"&&i<r&&(i+=1),t.dataset.page&&(i=Number(t.dataset.page)),$();try{d?n=await D(d,i):n=await B(i),H(n),N(),window.scrollTo({top:s.petsList.offsetTop-80,behavior:"smooth"})}catch{w.error({title:"Помилка",message:"Щось пішло не так",position:"topRight"})}finally{q(),m("page",i)}}async function ge(e){return(await k.get(`${S.categories}`)).data}async function B(e){const t=await k.get(`${S.animals}`,{params:{limit:P,page:e}});return O=t.data.totalItems,t.data.animals}async function D(e,t){const n=await k.get(`${S.animals}?categoryId=${e}`,{params:{limit:P,page:t}});return O=n.data.totalItems,n.data.animals}function ye(e){return`
     <li class="category-item" data-id="${e._id}">
        <button class="category-btn" type="button">${e.name}</button>
      </li>`}function we(e){return e.reverse().map(ye).join("")}function he(e){const t=` <li class="category-item">
        <button class="category-btn current" type="button">Всі</button>
      </li>${we(e)}`;s.categoryList.innerHTML=t}function ve({_id:e,name:t,image:n,species:r,age:o,gender:a,categories:c,description:p}){const f=c.map(g=>`<li class="pets-category-item">${g.name}</li>`).join("");return`
     <li class="pets-item" data-id="${e}">
     <div class="pets-img-wrapper"><img class="pets-img" src="${n}" alt="${t} - ${r}" /></div>
        <div class="pets-list-wrapper">
          <p class="pets-category">${r}</p>
          <h3 class="pets-name">${t}</h3>
          <ul class="pets-category-list">${f}</ul>
          <div class="descriprion-wrapper">
            <ul class="descriprion-list">
              <li class="descriprion-item">${o}</li>
              <li class="descriprion-item">${a}</li>
            </ul>
            <p class="pets-descriprion">${p}</p>
            <button class="pets-button" type="button">Дізнатись більше</button>
          </div>
        </div>
      </li>`}function T(e){return e.map(ve).join("")}function H(e){const t=T(e);s.petsList.innerHTML=t}function N(){const e=A();if(e<=1)return;let t="";if(t+=`<li>
      <button class="pagination-btn-arrow" data-action="prev" aria-label="Попередня сторінка" ${i===1?"disabled":""}>
        <svg class="arrow-icon" aria-hidden="true" width="24" height="24">
          <use href="${C}#icon-arrow-back"></use>
        </svg>
      </button>
    </li>`,i===1){for(let n=1;n<=Math.min(3,e);n+=1)t+=y(n);e>3&&(t+='<li class="dots">…</li>',t+=y(e))}else{t+=y(1),i>3&&(t+='<li class="dots">…</li>');for(let n=i-1;n<=i+1;n+=1)n>1&&n<e&&(t+=y(n));i<e-2&&(t+='<li class="dots">…</li>'),e>1&&(t+=y(e))}t+=`<li>
      <button class="pagination-btn-arrow" data-action="next" aria-label="Наступна сторінка" ${i===e?"disabled":""}>
        <svg class="arrow-icon" aria-hidden="true" width="24" height="24">
          <use href="${C}#icon-arrow-forward"></use>
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
  `}function $(){s.loader.classList.remove("loader-hidden")}function q(){s.loader.classList.add("loader-hidden")}function Le(){s.petsLoadMoreBtn.classList.remove("pets-load-more-btn-hidden")}function be(){s.petsLoadMoreBtn.classList.add("pets-load-more-btn-hidden")}function b(){const e=A();i>=e?be():Le()}new _(".mySwiper",{modules:[Y,Z],slidesPerView:1,wrapperClass:"about-swiper-wrapper",slideClass:"about-swiper-slide",navigation:{nextEl:".about-swiper-button-next",prevEl:".about-swiper-button-prev"},pagination:{el:".about-swiper-pagination",clickable:!0},spaceBetween:0,loop:!1,breakpoints:{0:{slidesPerView:1}}});new ee(".accordion-container",{showMultiple:!1,collapse:!0,duration:300,onOpen(e){const t=e.querySelector(".ac-panel");if(!t)return;const n=t.getBoundingClientRect();if(n.bottom>window.innerHeight){const r=n.bottom-window.innerHeight+20;window.scrollBy({top:r,behavior:"smooth"})}}});const Ee=document.querySelectorAll(".faq-question-btn");Ee.forEach(e=>{e.addEventListener("click",()=>{const t=e.getAttribute("aria-expanded")==="true";e.setAttribute("aria-label",t?"Закрити відповідь":"Відкрити відповідь")})});function Se(e){const t=document.querySelector(".swiper-wrapper"),n=e.map(({description:r,rate:o,author:a})=>`
        <div class="swiper-slide">
          <div class="star-rating" data-score="${o}"></div>     
            <p class="storie-text">${r}</p>
            <p class="storie-names">${a}</p>  
        </div>`).join("");t.insertAdjacentHTML("beforeend",n),document.querySelectorAll(".star-rating").forEach(r=>{new te(r,{starType:"svg",readOnly:!0}).init()})}const J=document.querySelector(".stories-loader"),ke=document.querySelector(".swiper-controls");function x(e){w.info({message:e,position:"topRight",color:"#f2aaaaff",icon:!1,progressBar:!1,messageColor:"black"})}function L(){J.classList.remove("loader")}function Be(){J.classList.add("loader")}function $e(){ke.classList.remove("visually-hidden")}window.addEventListener("DOMContentLoaded",async()=>{Be();try{let e=await ie();if(e===null){x("Не вдалося завантажити історії. Спробуйте пізніше"),L();const n=document.querySelector(".swiper-wrapper");n&&(n.innerHTML='<p class="error-swiper">Не вдалося завантажити історії</p>');return}if(e.length===0){x("Нажаль, історії зараз недоступні"),L();const n=document.querySelector(".swiper-wrapper");n&&(n.innerHTML='<p class="error-swiper">Нажаль, історії зараз недоступні</p>');return}Se(e);const t=new _(".swiper",{direction:"horizontal",loop:!1,speed:400,spaceBetween:32,pagination:{el:".swiper-pagination",clickable:!0,dynamicBullets:!1},navigation:{nextEl:".swiper-button-next",prevEl:".swiper-button-prev"},breakpoints:{768:{slidesPerView:2}}});$e(),L()}catch{x("Cталась помилка. Спробуйте пізніше");const t=document.querySelector(".swiper-wrapper");t&&(t.innerHTML='<p class="error-swiper">Нажаль, історії зараз недоступні</p>'),L()}});let K;const u=document.getElementById("order-form"),h=document.getElementById("modal-order"),qe=h.querySelector(".modal-close-btn");window.addEventListener("open-order-modal",e=>{var n;const t=(n=e==null?void 0:e.detail)==null?void 0:n.animalId;t&&(K=t,s&&s.animalDetailsBackdrop&&s.animalDetailsBackdrop.classList.remove("is-open"),document.body.style.overflow="",h.classList.remove("visually-hidden"),document.body.classList.add("modal-open"),window.addEventListener("keydown",G))});function M(){h.classList.add("visually-hidden"),document.body.classList.remove("modal-open"),window.removeEventListener("keydown",G)}function G(e){e.key==="Escape"&&M()}function Me(e){e.target===h&&M()}qe.addEventListener("click",M);h.addEventListener("click",Me);u.addEventListener("submit",async e=>{e.preventDefault();const{name:t,phone:n,comments:r}=e.target.elements,o=t.value.trim();let a=n.value.trim();const c=r.value.trim(),p=u.querySelectorAll(".input-error"),f=u.querySelectorAll(".error-text");if(p.forEach(l=>l.classList.remove("input-error")),f.forEach(l=>l.textContent=""),o.length>32){const l=u.querySelector('.modal-form-input[type="text"]');l.classList.add("input-error"),l.nextElementSibling.textContent="Ім'я не повинно перевищувати 32 символи.";return}const g=/^[0-9]{12}$/;if(a[0]==="+"&&(a=a.slice(1)),a.length!==12){const l=u.querySelector('.modal-form-input[type="tel"]');l.classList.add("input-error"),l.nextElementSibling.textContent="Телефон повинен містити 12 цифр.";return}if(!g.test(a)){const l=u.querySelector('.modal-form-input[type="tel"]');l.classList.add("input-error"),l.nextElementSibling.textContent="Телефон повинен містити лише цифри.";return}if(c.length>255){const l=u.querySelector(".modal-form-textarea");l.classList.add("input-error"),l.nextElementSibling.textContent="Коментар не повинен перевищувати 255 символів.";return}const Q={name:o,phone:a,animalId:K,comment:c.length>0?c:"Без коментарів"};try{const X=(await j.post("https://paw-hut.b.goit.study/api/orders",Q)).data;return R.fire({title:"Дякуємо за вашу заявку!",icon:"success",confirmButtonText:"Закрити"}),e.target.reset(),M(),X}catch(l){R.fire({title:"Помилка!",text:"Сталася помилка при надсиланні заявки. Спробуйте ще раз пізніше.",icon:"error",confirmButtonText:"Закрити"}),console.error("Error submitting order:",l)}});
//# sourceMappingURL=index.js.map
