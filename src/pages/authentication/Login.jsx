import { login } from "./../../features/authenticationSlice";
import { useEffect } from "react";
import { useFormik } from "formik";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { MailIcon, LockClosedIcon } from "@heroicons/react/solid"
import toast, { Toaster } from "react-hot-toast";
import * as Yup from "yup";

const Login = () => {
	const dispatch = useDispatch();
	const navigate = useNavigate();

	const { error, isSubmitting, status } = useSelector(state => state.authentication);

	useEffect(() => {
		if (error) {
			toast.error(error);
		}

		if (status === "succeeded") {
			toast.success("Bienvenido!");
			navigate("/units");
		}
	}, [error, status]);

	const formik = useFormik({
		initialValues: {
			username: "",
			password: "",
		},
		validationSchema: Yup.object({
			username: Yup.string().required("El nombre de usuario es obligatorio"),
			password: Yup.string()
				.required("La contraseña es obligatoria")
				.min(6, "La contraseña debe tener al menos 6 caracteres"),
		}),
		onSubmit: formData => {
			dispatch(login(formData));
		},
	});

	return (
		<section className="flex flex-col md:flex-row h-screen items-center">
			<div className="hidden lg:block w-full md:w-1/2 xl:w-2/3 h-screen">
				<img
					src="/images/solgas-background.jpeg"
					alt="solgas-image"
					className="w-full h-full object-cover"
				/>
			</div>
			<div
				className="bg-white w-full md:max-w-md lg:max-w-full md:mx-auto md:w-1/2 xl:w-1/3 h-screen px-6 lg:px-16 xl:px-12
          flex items-center justify-center"
			>
				<div className="w-full h-100">
					<img
						src="/images/logo-solgas.png"
						alt="logo-solgas"
						className="w-3/4 h-3/4 mx-auto"
					/>
					<h1 className="text-xl md:text-xl font-semibold leading-tight my-6">
						Que bueno verte de nuevo! 😃
					</h1>
					<form onSubmit={formik.handleSubmit}>
						<div class="pt-6">
							<label for="email" class="font-normal">Correo electronico o Usuario</label>
							<div
								class="flex border-2 overflow-hidden items-center mt-2 w-full rounded-xl border-gray-400 transition-all focus-within:shadow-lg focus-within:border-solgas-primary"
							>
								<div class="flex justify-center items-center pl-6">
									<MailIcon class="w-6 h-6 pointer-events-none" />
								</div>
								<input
									type="text"
									id="username"
									name="username"
									autoComplete="false"
									onChange={formik.handleChange}
									onBlur={formik.handleBlur}
									value={formik.values.username}
									placeholder="Ingrese su correo electronico o usuario"
									class="px-4 py-5 w-full focus:outline-none font-normal text-gray-900 border-0 focus:ring-0"
								/>
							</div>
							{formik.touched.username && formik.errors.username ? (
								<div className="pt-2 text-red-500 text-sm font-medium">
									{formik.errors.username}
								</div>
							) : null}
						</div>
						<div class="pt-6">
							<label for="password" class="font-normal">Contraseña</label>
							<div
								class="flex overflow-hidden items-center mt-2 w-full rounded-xl border-2 border-gray-400 transition-all focus-within:shadow-lg focus-within:border-solgas-primary"
							>
								<div class="flex justify-center items-center pl-6">
									<LockClosedIcon class="w-6 h-6 pointer-events-none" />
								</div>
								<input
									type="password"
									name="password"
									id="password"
									placeholder="Ingrese su contraseña"
									autoComplete="false"
									onChange={formik.handleChange}
									onBlur={formik.handleBlur}
									value={formik.values.password}
									class="px-4 py-5 w-full focus:outline-none font-light border-0 focus:ring-0"
								/>
							</div>
							{formik.touched.password && formik.errors.password ? (
								<div className="pt-2 text-red-500 text-sm font-medium">
									{formik.errors.password}
								</div>
							) : null}
						</div>
						<button
							type="submit"
							className={
								"w-full block bg-solgas-primary hover:bg-solgas-primary-dark text-white font-semibold rounded-xl px-4 py-5 mt-6 transition duration-500 ease select-none focus:outline-none focus:shadow-outline" +
								(isSubmitting
									? " flex justify-center items-center opacity-50 cursor-not-allowed"
									: " hover:bg-solgas-primary-dark")
							}
							disabled={
								isSubmitting
									? true
									: false
							}
						>
							{isSubmitting ? (
								<svg
									className="animate-spin -ml-1 mr-3 h-4 w-4 text-white"
									xmlns="http://www.w3.org/2000/svg"
									fill="none"
									viewBox="0 0 24 24"
								>
									<circle
										className="opacity-25"
										cx="12"
										cy="12"
										r="10"
										stroke="currentColor"
										strokeWidth="4"
									></circle>
									<path
										className="opacity-75"
										fill="currentColor"
										d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
									></path>
								</svg>
							) : (
								"Iniciar sesión"
							)}
						</button>
					</form>
					<hr className="my-6 border-gray-300 w-full" />
					<p className="text-sm text-gray-500 mt-12">
						&copy; {new Date().getFullYear()} Segursat - Todos los derechos
						reservados.
					</p>
				</div>
			</div>
			<Toaster />
		</section>
	);
};

export default Login;
