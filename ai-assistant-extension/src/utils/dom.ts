export function createElement(tag: string, attributes: Record<string, any> = {}, ...children: (HTMLElement | string)[]): HTMLElement {
    const element = document.createElement(tag);
    Object.entries(attributes).forEach(([key, value]) => {
        if (key.startsWith('on')) {
            element.addEventListener(key.substring(2).toLowerCase(), value);
        } else {
            element.setAttribute(key, value);
        }
    });
    children.forEach(child => {
        if (typeof child === 'string') {
            element.appendChild(document.createTextNode(child));
        } else {
            element.appendChild(child);
        }
    });
    return element;
}

export function appendToBody(element: HTMLElement): void {
    document.body.appendChild(element);
}

export function removeElement(element: HTMLElement): void {
    if (element.parentNode) {
        element.parentNode.removeChild(element);
    }
}

export function setElementText(element: HTMLElement, text: string): void {
    element.textContent = text;
}