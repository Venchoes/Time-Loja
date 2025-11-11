import React, { createContext, useContext, useEffect, useMemo, useState } from "react";

const TOKEN_KEY = "token";
const BASEURL = import.meta.env.VITE_BASE_URL ?? (typeof window !== "undefined" ? window.location.origin : "http://localhost");
const AUTH_VALIDATE_PATH = "/protected";

type AuthContextValue = {
    token: string | null;
    isAuthenticated: boolean;
    checking: boolean;
    login: (token: string) => void;
    logout: () => void;
    validateToken: () => Promise<boolean>;
};

const AuthContext = createContext<AuthContextValue | undefined>(undefined);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {

    const [token, setToken] = useState<string | null>(() => {
        try {
            return localStorage.getItem(TOKEN_KEY);
        } catch {
            return null;
        }
    });

    const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);
    const [checking, setChecking] = useState<boolean>(!!token); // se há token, vamos validar

    const validateToken = async (): Promise<boolean> => {
        if (!token) {
            setIsAuthenticated(false);
            setChecking(false);
            return false;
        }

        setChecking(true);
        const controller = new AbortController();
        try {
            const res = await fetch(`${BASEURL}${AUTH_VALIDATE_PATH}`, {
                method: "GET",
                headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${token}`,
                },
                signal: controller.signal,
            });

            if (!res.ok) {
                setIsAuthenticated(false);
                setChecking(false);
                return false;
            }


            setIsAuthenticated(true);
            setChecking(false);
            return true;
        } catch (err: any) {
            if (err?.name === "AbortError") {

            } else {

            }
            setIsAuthenticated(false);
            setChecking(false);
            return false;

        } finally {

        }
    };

    useEffect(() => {

        let mounted = true;
        if (!token) {
            setIsAuthenticated(false);
            setChecking(false);
            return;
        }

        (async () => {
            if (!mounted) return;
            await validateToken();
        })();

        return () => {
            mounted = false;
        };

    }, []);


    useEffect(() => {
        const onStorage = (e: StorageEvent) => {
            if (e.key === TOKEN_KEY) {

                const newToken = e.newValue;
                setToken(newToken);

                if (!newToken) {
                    setIsAuthenticated(false);
                } else {

                (async () => {

                    setChecking(true);
                    const ok = await validateToken();
                    setChecking(false);

                    if (!ok) {
                        setToken(null);
                    }
                })();
                }
            }
        };
        window.addEventListener("storage", onStorage);
        return () => window.removeEventListener("storage", onStorage);

    }, []);

    const login = (newToken: string) => {
        try {
            localStorage.setItem(TOKEN_KEY, newToken);

        } catch {

        }
        setToken(newToken);
        setIsAuthenticated(true);
    };

    const logout = () => {
        try {
            localStorage.removeItem(TOKEN_KEY);
        } catch {

        }
        setToken(null);
        setIsAuthenticated(false);
    };

    const value = useMemo(
        () => ({ token, isAuthenticated, checking, login, logout, validateToken }),
        [token, isAuthenticated, checking]
    );

    return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
    };

    export function useAuth() {
    const ctx = useContext(AuthContext);
    if (!ctx) {
        throw new Error("useAuth must be used within an AuthProvider");
    }
    return ctx;
}