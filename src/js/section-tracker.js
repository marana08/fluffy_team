import { saveCurrentSection, loadCurrentSection, clearCurrentSection } from "./storage";

const sections = ['hero', 'pets', 'about', 'faq', 'success-stories'];
let currentSection = 'hero';
let isRestoring = false;

function getCurrentSection() {
    const scrollY = window.scrollY || window.pageYOffset;
    const headerOffset = 100;

    for (let i = sections.length - 1; i >= 0; i--) {
        const section = document.querySelector(`#${sections[i]}`);
        if (!section) continue;

        const rect = section.getBoundingClientRect();
        const sectionTop = rect.top + scrollY;
        
        if (scrollY + headerOffset >= sectionTop - 200) {
            return sections[i];
        }
    }
    
    return 'hero';
}

function saveSection() {
    if (isRestoring) return;
    
    const newSection = getCurrentSection();
    if (newSection !== currentSection) {
        currentSection = newSection;
        saveCurrentSection(currentSection);
    }
}

function restoreSection() {
    const savedSection = loadCurrentSection();
    if (!savedSection) return false;

    const section = document.querySelector(`#${savedSection}`);
    if (!section) return false;

    isRestoring = true;
    currentSection = savedSection;

    setTimeout(() => {
        const targetPosition = section.offsetTop - 80;
        window.scrollTo({
            top: Math.max(0, targetPosition),
            behavior: 'smooth'
        });
        
        setTimeout(() => {
            isRestoring = false;
        }, 1000);
    }, 300);

    return true;
}

function handleScroll() {
    if (isRestoring) return;
    
    const newSection = getCurrentSection();
    if (newSection !== currentSection) {
        currentSection = newSection;
        saveCurrentSection(currentSection);
    }
}

function handleBeforeUnload() {
    saveSection();
}

function initSectionTracker() {
    const savedSection = loadCurrentSection();
    if (savedSection) {
        currentSection = savedSection;
    }
    
    let scrollTimeout;
    window.addEventListener('scroll', () => {
        clearTimeout(scrollTimeout);
        scrollTimeout = setTimeout(handleScroll, 200);
    }, { passive: true });
    
    window.addEventListener('beforeunload', handleBeforeUnload);
    
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', () => {
            setTimeout(restoreSection, 500);
        });
    } else {
        setTimeout(restoreSection, 500);
    }
}

export function resetSection() {
    clearCurrentSection();
    currentSection = 'hero';
}

if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initSectionTracker);
} else {
    initSectionTracker();
}
