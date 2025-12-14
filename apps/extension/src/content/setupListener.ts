const setupListeners = (listeners: Record<string, () => void>, containerQuery = '#container') => {
    const observer = new MutationObserver((mutations) => {
        for (const mutation of mutations) {
            mutation.addedNodes.forEach((node) => {
                if (node instanceof HTMLElement && listeners[node.id]) listeners[node.id]();
            });
        }
    });

    const container = document.querySelector(containerQuery);

    if (container)
        observer.observe(container, {
            childList: true,
        });
};

export default setupListeners;
