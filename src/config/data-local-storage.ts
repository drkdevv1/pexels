import CryptoJS from "crypto-js";
import { Session } from "../context/auth-context";


export class DataLocalStorage {
    static removeSession() {
        localStorage.removeItem('session');
    }

    static hasSession(): boolean {
        return localStorage.getItem('session') !== null;
    }

    static setSessionInLocalStorage(valor: Session) {
        const json = JSON.stringify(valor)
        const encriptacion = CryptoJS.AES.encrypt(json, import.meta.env.VITE_CLAVE_CRIPTOJS).toString()
        localStorage.setItem('session', encriptacion)
    }

    static getSessionInLocalStorage(): Session | null {
        try {
            const session = localStorage.getItem('session');
            if (!session) return null;

            const desencriptacion = CryptoJS.AES.decrypt(session, import.meta.env.VITE_CLAVE_CRIPTOJS).toString(CryptoJS.enc.Utf8);
            const objeto: Session = JSON.parse(desencriptacion);
            return objeto;
        } catch (error) {
            localStorage.removeItem('session');
            return null;
        }
    }

}