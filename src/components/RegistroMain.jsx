import RegisterForm from "./RegisterForm";

export default function RegistroMain() {
    return(
        <main className="py-20 bg-amber-500">
            <div className="w-1/3 p-12 m-auto bg-white rounded-md">
                <RegisterForm />
            </div>
        </main>
    );
}