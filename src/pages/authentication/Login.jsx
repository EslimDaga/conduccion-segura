import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useFormik } from "formik";
import toast, { Toaster } from "react-hot-toast";
import * as Yup from "yup";
import { login } from "./../../features/authenticationSlice";

const Login = () => {
	const dispatch = useDispatch();

	const { error, isSubmitting } = useSelector(state => state.authentication);

	useEffect(() => {
		if (error) {
			toast.error(error);
		}
	}, [error]);

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
					<h1 className="text-xl md:text-2xl font-bold leading-tight my-6">
						Que bueno verte de nuevo! 😃
					</h1>
					<form onSubmit={formik.handleSubmit}>
						<div>
							<label
								htmlFor="email"
								className="block text-gray-700 font-medium"
							>
								Nombre de usuario
							</label>
							<input
								id="username"
								type="username"
								placeholder="Ingrese su usuario"
								className={
									"w-full px-4 py-5 rounded-xl bg-gray-200 mt-2 border-2 focus:bg-white focus:outline-none" +
									(formik.touched.username && formik.errors.username
										? " border-red-500 focus:border-red-500"
										: " focus:border-solgas-primary")
								}
								autoComplete="false"
								onChange={formik.handleChange}
								onBlur={formik.handleBlur}
								value={formik.values.username}
							/>
							{formik.touched.username && formik.errors.username ? (
								<div className="pt-2 text-red-500 text-sm font-medium">
									{formik.errors.username}
								</div>
							) : null}
						</div>
						<div className="mt-4">
							<label
								htmlFor="password"
								className="block text-gray-700 font-medium"
							>
								Contraseña
							</label>
							<input
								id="password"
								type="password"
								placeholder="Ingrese su contraseña"
								className={
									"w-full px-4 py-5 rounded-xl bg-gray-200 mt-2 border-2 focus:bg-white focus:outline-none" +
									(formik.touched.password && formik.errors.password
										? " border-red-500 focus:border-red-500"
										: " focus:border-solgas-primary")
								}
								autoComplete="false"
								onChange={formik.handleChange}
								onBlur={formik.handleBlur}
								value={formik.values.password}
							/>
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
								(isSubmitting ||
								formik.values.username === "" ||
								formik.values.password === ""
									? " flex justify-center items-center opacity-50 cursor-not-allowed"
									: " hover:bg-solgas-primary-dark")
							}
							disabled={
								isSubmitting ||
								formik.values.username === "" ||
								formik.values.password === ""
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
