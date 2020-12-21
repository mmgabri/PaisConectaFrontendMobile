import React, { createContext, useState, useEffect, useContext } from 'react';
import { Alert } from 'react-native'
import auth from '@react-native-firebase/auth';
import apiUsuario from '../services/apiUsuario';


const AuthContext = createContext({
    isAuthenticated: false,
    loading: false,
    token: "",
    user: {}
});

const AuthProvider = ({ children, navigation }) => {
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);
    const [isAuthenticated, setIsAuthenticated] = useState(false);

    useEffect(() => {
        console.log('---- Entrou no useEffect ----')
        apiUsuario.defaults.timeout = 5000;
        const subscriber = auth().onAuthStateChanged(onAuthStateChanged);
        return subscriber;
    }, [])

    function onAuthStateChanged(user) {
        console.log('---- onAuthStateChanged ---- ')
        if (user) {
            user.getIdToken().then(function (idToken) {
                //console.log('Token:', idToken);
                apiUsuario.defaults.headers.Authorization = `Baerer ${idToken}`;
            });
            console.log('Usuário atenticado:')
            setUser(user);
            setIsAuthenticated(true);
        } else {
            console.log('Usuário não autenticado')
            setUser(null);
            setIsAuthenticated(false);
            setLoading(false);
        }
    }

    const emiteAlerta = (code) => {
        console.log("emiteAlerta:", code)
        var message = '';

        switch (code) {
            case "auth/invalid-email": message = "Email invalido."; break;
            case "auth/weak-password": message = "Sua senha esta fora de padrão."; break;
            case "auth/email-already-exists": message = "Email já existente."; break;
            case "auth/email-already-in-use": message = "Email já existente."; break;
            case "auth/user-not-found": message = "Email não cadastrado."; break;
            case "auth/wrong-password": message = "Senha invalida."; break;
            default: message = `Algo deu -errado: ` + code
        }

        Alert.alert(
            "Ooops!",
            message,
            [
                {
                    text: "OK", style: "cancel"
                }
            ],
            { cancelable: false }
        );
    }

    async function signUp(email, password, displayName) {
        console.log('---- Entrou no signUp ----')

        auth().createUserWithEmailAndPassword(email, password)
            .then((user) => {
                var user = auth().currentUser;
                if (user) {
                    console.log("currentUser ok")
                    user.updateProfile({
                        displayName: displayName
                    }).then(function () {
                        console.log("updateProfile ok")
                        const dbUser = {
                            email: email,
                            nome: displayName,
                            id: user.uid
                        }
                        apiUsuario.post('/usuarios', dbUser)
                            .then((response) => {
                                console.log('Chamada da apiUsuario com sucesso', response)
                                auth().onAuthStateChanged(onAuthStateChanged);
                            })
                            .catch((error) => {
                                user.delete().then(function () {
                                    console.log('Usuario deletado com sucesso')
                                    emiteAlerta(error);
                                }).catch(function (error) {
                                    console.log('Erro no delete do usuário:', error)
                                    emiteAlerta(error);
                                });
                            });
                    }).catch(function (error) {
                        console.log("Erro updateProfile", error)
                        user.delete().then(function () {
                            console.log('Usuario deletado com sucesso')
                        }).catch(function (error) {
                            console.log('Erro no delete do usuário:', error)
                        });
                        emiteAlerta(error.code);
                    });
                }
            }).catch(function (error) {
                console.log("Erro createUserWithEmailAndPassword:", error.code)
                emiteAlerta(error.code);
            })
    }

    async function signIn(email, password) {
        console.log('---- Entrou no signIn ----')

        try {
            const user = await auth().signInWithEmailAndPassword(email, password);
            console.log("Usuário autenticado ok", user)
            setIsAuthenticated(true);
            setUser(user);
        } catch (error) {
            console.log("Erro no SignIn:", error.code)
            emiteAlerta(error.code);
        }
    }

    async function signOut() {
        console.log('---- Entrou no signOut ----')

        try {
            const user = await auth().signOut();
            setIsAuthenticated(false);
            setUser(null);
            console.log("Funcionou:", user)
        } catch (error) {
            console.log("Deu ruim:", error)
        }
    }

    return (

        <AuthContext.Provider
            value={{ isAuthenticated, user, loading, signIn, signUp, signOut }}>
            {children}
        </AuthContext.Provider>

    );
};

function useAuth() {
    const context = useContext(AuthContext);

    if (!context) {
        throw new Error('useAuth must be used within an AuthProvider.');
    }

    return context;
}

export { AuthProvider, useAuth };