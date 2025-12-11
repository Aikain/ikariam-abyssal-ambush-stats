const setupListener = (targetId: string, callback: () => void) => {
    const observer = new MutationObserver((mutations) => {
        for (const mutation of mutations) {
            mutation.addedNodes.forEach((node) => {
                if (node instanceof HTMLElement && node.id === targetId) callback();
            });
        }
    });

    const container = document.getElementById('container');

    if (container)
        observer.observe(container, {
            childList: true,
        });
};

export default setupListener;
