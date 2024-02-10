import m, {ClassComponent, Vnode, VnodeDOM} from "mithril";

interface ModalAttrs {
    id: string,
}

export class Modal implements ClassComponent<ModalAttrs> {

    private closeModal = (id: string) => {
        const dialog = document?.querySelector(`dialog#${id}`) as HTMLDialogElement;
        dialog.close();
    };

    oncreate({dom}: VnodeDOM<ModalAttrs>) {
        // add event listener to close modal by clicking backdrop
        const dialog = dom as HTMLDialogElement;
        dialog.addEventListener("click", (e: any) => {
                if (e.target === dialog) dialog.close();
            }
        );
    }

    view({children, attrs}: Vnode<ModalAttrs>) {
        return m(`dialog#${attrs.id}.modal.fixed.inset-0.m-auto.overflow-scroll.w-5/6.h-3/4.min-w-min.max-w-xs.min-h-80.bg-black.border.border-gray-700.rounded-md.shadow-lg.backdrop:bg-black.backdrop:bg-opacity-30.backdrop:backdrop-blur-sm`,
            // prevent to close by clicking inside modal by having full width and height
            m("div.w-full.h-full", [
                m("button.border.text-white", {onclick: () => this.closeModal(attrs.id)}, "Close"),
                children
            ])
        );
    }
}