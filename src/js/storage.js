export function saveToLS(key, value) {
    try {
        localStorage.setItem(key, JSON.stringify(value));
    } catch (error) {
        console.error('Error saving to LocalStorage:', error)
    }
}

export function loadFromLS(key) {
    try {
         const data = localStorage.getItem(key);
        return data?  JSON.parse(data):null;
    } catch (error) {
        console.error('Error loading from LocalStorage:', error);
        return null;
    }
}

export function saveCurrentSection(sectionId) {
    try {
        localStorage.setItem('currentSection', sectionId);
    } catch (error) {
        console.error('Error saving current section:', error);
    }
}

export function loadCurrentSection() {
    try {
        return localStorage.getItem('currentSection');
    } catch (error) {
        console.error('Error loading current section:', error);
        return null;
    }
}

export function clearCurrentSection() {
    try {
        localStorage.removeItem('currentSection');
    } catch (error) {
        console.error('Error clearing current section:', error);
    }
}