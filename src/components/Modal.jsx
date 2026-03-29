import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faXmark } from "@fortawesome/free-solid-svg-icons";
import { useEffect }  from "react";
import { createPortal } from "react-dom";

export default function Modal({ children, onClose }) {
    useEffect(() => {
        document.body.classList.add("overflow-hidden");
        return() => {
            document.body.classList.remove("overflow-hidden");
        };
    }, []);

    return createPortal(
        <section className="flex justify-center items-center fixed inset-0 bg-black/25 overflow-hidden">
            <div className="flex w-1/3  bg-white p-15 relative">
                <button className="absolute top-5 right-5 cursor-pointer" onClick={ onClose }>
                    <FontAwesomeIcon icon={ faXmark } size="xl" />
                </button>
                {children}
            </div>
        </section>,
        document.getElementById("modal-root")
    );
}
