import { useState, useEffect } from "react";
import "./App.css";
import { auth } from "./firebase";
import {
	createUserWithEmailAndPassword,
	signInWithEmailAndPassword,
	onAuthStateChanged,
} from "firebase/auth";

export const Login = ({ setShowLogin }) => {
	const [userLogin, setUserLogin] = useState();
	const [email, setEmail] = useState();
	const [password, setPassword] = useState();

	async function HandleLogin(e) {
		e.preventDefault();
		await signInWithEmailAndPassword(auth, email, password)
			.then((userCredential) => {
				// Signed in
				const user = userCredential.user;
				console.log("retrieve userCredential!!1", user);
			})
			.catch((error) => {
				const errorCode = error.code;
				const errorMessage = error.message;
				console.error(errorCode, errorMessage);
			});
	}

	async function HandleRegister(e) {
		e.preventDefault();
		await createUserWithEmailAndPassword(auth, email, password)
			.then((userCredential) => {
				// Signed in
				const user = userCredential.user;
				console.log("register userL", user);
				// ...
			})
			.catch((error) => {
				console.error(error);
				// ..
			});
	}

	useEffect(() => {
		onAuthStateChanged(auth, (user) => {
			if (user) {
				setUserLogin(user);
				console.log("user Login");
				setShowLogin(false);
			} else {
				console.log("sign Out!!!");
			}
		});
	}, [userLogin]);
	// console.log("email", email);
	return (
		<div className="login">
			<form onSubmit={(e) => HandleLogin(e)}>
				<div className="div">
					<h1>Login</h1>
					<p>Email</p>
					<input
						onChange={(e) => setEmail(e.target.value)}
						type="text"
						className="email"
						// value={email}
					/>
					<p>Password</p>
					<input
						onChange={(e) => setPassword(e.target.value)}
						type="text"
						className="password"
					/>
				</div>
				<button onSubmit={(e) => HandleLogin(e)}>Login</button>
			</form>
			<form onSubmit={(e) => HandleRegister(e)}>
				<div className="div">
					<h1>Registry</h1>
					<p>Email</p>
					<input
						onChange={(e) => setEmail(e.target.value)}
						type="text"
						className="email"
					/>
					<p>Password</p>
					<input
						onChange={(e) => setPassword(e.target.value)}
						type="text"
						className="password"
					/>
				</div>
				<button onSubmit={(e) => HandleRegister(e)}>Registry</button>
			</form>
		</div>
	);
};
