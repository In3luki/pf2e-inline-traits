const domParser = new DOMParser();

const preCreateHook = (
    chatMessage: ChatMessage,
    messageData: ChatMessageData,
    _options: Record<string, unknown>,
    _userId: string
) => {
    const context = messageData.flags.pf2e?.context;
    if (context?.options) {
        const flavorString = messageData.flavor;
        if (flavorString) {
            const flavor = domParser.parseFromString(flavorString, "text/html");
            const tags = flavor.querySelector("hr")?.previousSibling;
            if (tags?.childNodes.length === 0) {
                const traits = context.options.filter((option) => !option.includes(":"));
                for (const trait of traits) {
                    const name = CONFIG.PF2E.actionTraits[trait];
                    const description = CONFIG.PF2E.traitsDescriptions[trait];
                    if (name) {
                        const newTag = document.createElement("span");
                        newTag.classList.add("tag", "tooltipstered");
                        newTag.setAttribute("data-slug", trait);
                        if (description) {
                            newTag.setAttribute("data-description", description);
                        }
                        newTag.innerHTML = game.i18n.localize(name);
                        tags.appendChild(newTag);
                    }
                }
                chatMessage.data.update({ flavor: flavor.body.innerHTML });
            }
        }
    }
};

Hooks.on("preCreateChatMessage", preCreateHook);
