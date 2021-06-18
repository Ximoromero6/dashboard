class localStorage {
    setAttribute(attribute, value) {
        if (!localStorage.getItem(attribute)) {
            return localStorage.setItem(attribute, value);
        }
    }
    getAttribute(attribute) {
        return localStorage.getItem(atob(attribute));
    }
}