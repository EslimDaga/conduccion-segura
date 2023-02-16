const Login = () => {
	return (
		<section className="flex flex-col md:flex-row h-screen items-center">
			<div className="bg-blue-600 hidden lg:block w-full md:w-1/2 xl:w-2/3 h-screen">
				<img
					src="https://www.solgas.com.pe/wp-content/uploads/2018/01/solgasprohome-min.jpg"
					alt="solgas-image"
					className="w-full h-full object-cover"
				/>
			</div>
			<div
				className="bg-white w-full md:max-w-md lg:max-w-full md:mx-auto md:w-1/2 xl:w-1/3 h-screen px-6 lg:px-16 xl:px-12
          flex items-center justify-center"
			>
				<div className="w-full h-100">
					<h1 className="text-xl md:text-2xl font-bold leading-tight mt-12">
						Que bueno verte de nuevo! 😃
					</h1>
					<form className="mt-6" action="#" method="POST">
						<div>
							<label className="block text-gray-700">Correo Electronico</label>
							<input
								type="email"
								placeholder="Ingrese su correo electronico"
								className="w-full px-4 py-3 rounded-lg bg-gray-200 mt-2 border focus:border-blue-500 focus:bg-white focus:outline-none"
								autoFocus
								autoComplete="false"
								required
							/>
						</div>
						<div className="mt-4">
							<label className="block text-gray-700">Contraseña</label>
							<input
								type="password"
								placeholder="Ingrese su contraseña"
								className="w-full px-4 py-3 rounded-lg bg-gray-200 mt-2 border focus:border-blue-500
                  focus:bg-white focus:outline-none"
								required
							/>
						</div>
						<button
							type="submit"
							className="w-full block bg-blue-500 hover:bg-blue-400 focus:bg-blue-400 text-white font-semibold rounded-lg
                px-4 py-3 mt-6"
						>
							Iniciar Sesión
						</button>
					</form>
					<hr className="my-6 border-gray-300 w-full" />
					<p className="text-sm text-gray-500 mt-12">
						&copy; 2023 Segursat - Todos los derechos reservados.
					</p>
				</div>
			</div>
		</section>
	);
};

export default Login;
