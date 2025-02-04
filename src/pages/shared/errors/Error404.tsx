
import errorImg from '../../../assets/img/404error.webp'; 

export function Error404() {

    return (
        <div className="flex flex-col items-center justify-center h-screen">
            <img src={errorImg} alt="Error 404" className="w-40 h-40" />
            <div className="text-center">
                <h1 className="text-4xl font-bold text-[#0c0c2d] mt-4 mb-4">Error | 404</h1>
                <p className="text-lg text-gray-600 mb-6">No se encontró la página solicitada.</p>
                {/* <SubmitButton text="Ir al inicio" onClick={() => navigate('/')} />*/}
            </div>
        </div>
    );
}