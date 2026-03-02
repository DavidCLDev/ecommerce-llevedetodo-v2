export default function TextInput({ className = "", ...props }) {
    return(
        <input
        {...props}
        className={ `${className} p-4 border-1 border-stone-400 rounded-md focus:border-transparent focus:outline-none focus:ring-2 focus:ring-amber-400` }
        />
    );
}