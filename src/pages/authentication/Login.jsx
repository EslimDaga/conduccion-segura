const Login = () => {
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
					<h1 className="text-xl md:text-2xl font-bold leading-tight mt-12">
						Que bueno verte de nuevo! 😃
					</h1>
					<form className="mt-6" action="#" method="POST">
						<div>
							<label
								htmlFor="email"
								className="block text-gray-700 font-medium"
							>
								Correo Electronico
							</label>
							<input
								id="email"
								type="email"
								placeholder="Ingrese su correo electronico"
								className="w-full px-4 py-4 rounded-xl bg-gray-200 mt-2 border-2 focus:border-solgas-primary focus:bg-white focus:outline-none"
								autoFocus
								autoComplete="false"
								required
							/>
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
								className="w-full px-4 py-4 rounded-xl bg-gray-200 mt-2 border-2 focus:border-solgas-primary
                  focus:bg-white focus:outline-none"
								required
							/>
						</div>
						<button
							type="submit"
							className="w-full block bg-solgas-primary hover:bg-solgas-secondary focus:bg-blue-400 text-white font-semibold rounded-xl
                px-4 py-4 mt-6"
						>
							Iniciar Sesión
						</button>
					</form>
					<hr className="my-6 border-gray-300 w-full" />
					<p className="text-sm text-gray-500 mt-12">
						&copy; {new Date().getFullYear()} Segursat - Todos los derechos
						reservados.
					</p>
				</div>
			</div>
		</section>
	);
};

export default Login;
