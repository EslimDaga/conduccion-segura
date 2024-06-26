import * as Yup from "yup";

import {
  ChartBarIcon,
  ChevronDownIcon,
  LogoutIcon,
  MenuIcon,
  UserCircleIcon,
  UserIcon,
  XIcon,
} from "@heroicons/react/solid";
import { Dialog, Menu, Popover, Transition } from "@headlessui/react";
import { Fragment, useState } from "react";
import { Link, Outlet } from "react-router-dom";
import toast, { Toaster } from "react-hot-toast";

import { host } from "../constants";
import { useFormik } from "formik";

const solutions = [
  {
    name: "Analytics",
    description:
      "Get a better understanding of where your traffic is coming from.",
    href: "#",
    icon: ChartBarIcon,
  },
];

const Layout = () => {
  let [isOpen, setIsOpen] = useState(false);

  function closeModal() {
    setIsOpen(false);
  }

  function openModal() {
    setIsOpen(true);
    fetch(`${host}/web/api/mails/get-mail-config/`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `JWT ${JSON.parse(localStorage.getItem("user")).access}`,
      },
    })
      .then((response) => response.json())
      .then((data) => {
        formikCreateDriver.setFieldValue("firstname", data.mails.join(","));
        formikCreateDriver.setFieldValue(
          "mail_notification",
          data.mail_notification
        );
      });
  }

  const formikCreateDriver = useFormik({
    initialValues: {
      firstname: "",
      mail_notification: false,
    },
    validationSchema: Yup.object({
      firstname: Yup.string().required("Los correos son requerido"),
    }),
    onSubmit: (values) => {
      //Separar los correos por coma y eliminar los espacios
      const mails = values.firstname.split(",").map((mail) => mail.trim());
      console.log(mails);
      fetch(`${host}/web/api/mails/update-mail-config/`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `JWT ${
            JSON.parse(localStorage.getItem("user")).access
          }`,
        },
        body: JSON.stringify({
          mail_notification: values.mail_notification,
          mails: mails,
        }),
      }).then((response) => {
        if (response.status === 200) {
          closeModal();
          toast.success("Configuración de correos actualizada");
        }
      });
    },
  });

  const error = false;
  const is_saving = false;

  return (
    <main className="flex flex-col h-screen">
      <Transition appear show={isOpen} as={Fragment}>
        <Dialog as="div" className="relative z-10" onClose={closeModal}>
          <Transition.Child
            as={Fragment}
            enter="ease-out duration-300"
            enterFrom="opacity-0"
            enterTo="opacity-100"
            leave="ease-in duration-200"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
          >
            <div className="fixed inset-0 bg-black/25" />
          </Transition.Child>

          <div className="fixed inset-0 overflow-y-auto">
            <div className="flex min-h-full items-center justify-center p-4 text-center">
              <Transition.Child
                as={Fragment}
                enter="ease-out duration-300"
                enterFrom="opacity-0 scale-95"
                enterTo="opacity-100 scale-100"
                leave="ease-in duration-200"
                leaveFrom="opacity-100 scale-100"
                leaveTo="opacity-0 scale-95"
              >
                <Dialog.Panel className="w-full max-w-md transform overflow-hidden rounded-2xl bg-white p-6 text-left align-middle shadow-xl transition-all">
                  <Dialog.Title
                    as="h3"
                    className="text-lg font-medium leading-6 text-gray-900 pb-5"
                  >
                    Notificaciones
                  </Dialog.Title>
                  <form onSubmit={formikCreateDriver.handleSubmit}>
                    <div className="space-y-6">
                      <div>
                        <label
                          htmlFor="firstname"
                          className="block text-gray-700 dark:text-white font-medium mb-2"
                        >
                          Correos{" "}
                          <span className="text-md font-normal text-red-500">
                            *
                          </span>
                        </label>
                        <textarea
                          className={
                            "w-full font-normal px-4 py-4 bg-gray-100 rounded-xl transition duration-150 ease-out " +
                            ((formikCreateDriver.touched.firstname &&
                              formikCreateDriver.errors.firstname) ||
                            error?.errors?.name
                              ? " border-2 border-red-500"
                              : is_saving
                              ? "opacity-50 cursor-not-allowed"
                              : " border-2 border-white hover:border-gray-900 focus:border-gray-900")
                          }
                          rows={4}
                          type="text"
                          name="firstname"
                          value={formikCreateDriver.values.firstname}
                          id="firstname"
                          autoComplete="off"
                          onChange={(e) => {
                            formikCreateDriver.handleChange(e);
                            if (error?.errors?.firstname) {
                              dispatch(resetErrors());
                            }
                          }}
                          disabled={is_saving}
                        />
                        {(formikCreateDriver.touched.firstname &&
                          formikCreateDriver.errors.firstname) ||
                        error?.errors?.firstname ? (
                          <span className="text-sm font-medium text-red-500">
                            {formikCreateDriver.errors.firstname ||
                              error?.errors?.firstname[0]}
                          </span>
                        ) : null}
                      </div>
                      <div className="flex items-center">
                        <input
                          id="mail_notification"
                          name="mail_notification"
                          onChange={formikCreateDriver.handleChange}
                          checked={formikCreateDriver.values.mail_notification}
                          type="checkbox"
                          className="h-4 w-4 bg-gray-100 rounded transition duration-150 ease-out"
                        />
                        <label
                          htmlFor="mail_notification"
                          className="ml-2 block text-sm text-gray-900"
                        >
                          Enviar notificación
                        </label>
                      </div>
                      <button
                        className="bg-solgas-primary text-white active:bg-solgas-secondary text-base font-semibold px-4 py-4 rounded-xl hover:shadow-lg outline-none focus:outline-none w-full"
                        style={{ transition: "all .15s ease" }}
                        type="submit"
                      >
                        Crear
                      </button>
                    </div>
                  </form>
                </Dialog.Panel>
              </Transition.Child>
            </div>
          </div>
        </Dialog>
      </Transition>
      <Popover className="flex-1 fixed w-full shadow-lg z-10">
        <div className="mx-auto px-6">
          <div className="flex items-center justify-between border-gray-100 py-6 lg:py-5">
            <div className="flex justify-start lg:w-0 lg:flex-1">
              <a href="#">
                <span className="sr-only">Solgas Logo</span>
                <img
                  className="h-8 w-auto sm:h-10"
                  src="/images/logo-solgas.png"
                  alt="logo-solgas-in-header"
                />
              </a>
            </div>
            <div className="flex md:hidden">
              <Popover.Button className="inline-flex items-center justify-center rounded-md bg-white text-gray-400 hover:bg-gray-100 hover:text-gray-500 focus:outline-none focus:ring-inset">
                <span className="sr-only">Open menu</span>
                <MenuIcon className="h-8 w-8" aria-hidden="true" />
              </Popover.Button>
            </div>
            <div className="hidden items-center justify-end md:flex md:flex-1 lg:w-0">
              <Popover.Group as="nav" className="hidden md:flex gap-4">
                <Link
                  to="/dashboard"
                  className="text-base font-medium text-gray-600 hover:text-gray-900"
                >
                  Dashboard
                </Link>
                <Link
                  to="/units"
                  className="text-base font-medium text-gray-600 hover:text-gray-900"
                >
                  Unidades
                </Link>
                <Link
                  to="/drivers"
                  className="text-base font-medium text-gray-600 hover:text-gray-900"
                >
                  Conductores
                </Link>
                <Menu as="div" className="relative inline-block text-left">
                  <div>
                    <Menu.Button className="inline-flex w-full justify-center rounded-xl text-base font-medium text-gray-600 hover:bg-opacity-30 focus:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-opacity-75 items-center">
                      Reportes
                      <ChevronDownIcon
                        className="ml-2 -mr-1 h-5 w-5 text-solgas-secondary hover:text-solgas-primary"
                        aria-hidden="true"
                      />
                    </Menu.Button>
                  </div>
                  <Transition
                    as={Fragment}
                    enter="transition ease-out duration-100"
                    enterFrom="transform opacity-0 scale-95"
                    enterTo="transform opacity-100 scale-100"
                    leave="transition ease-in duration-75"
                    leaveFrom="transform opacity-100 scale-100"
                    leaveTo="transform opacity-0 scale-95"
                  >
                    <Menu.Items className="absolute right-0 mt-2 w-56 origin-top-right divide-y divide-gray-100 rounded-xl bg-white shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
                      <div className="px-1 py-1 ">
                        <Menu.Item>
                          <Link
                            to="/initial-inspections"
                            className="text-gray-900 group flex w-full items-center rounded-md px-2 py-2 text-sm hover:bg-gray-100"
                          >
                            Inspecciones iniciales
                          </Link>
                        </Menu.Item>
                        <Menu.Item>
                          <Link
                            to="/search-inspections"
                            className="text-gray-900 group flex w-full items-center rounded-md px-2 py-2 text-sm hover:bg-gray-100"
                          >
                            Buscar inspecciones
                          </Link>
                        </Menu.Item>
                        <Menu.Item>
                          <Link
                            to="/search-incidents"
                            className="text-gray-900 group flex w-full items-center rounded-md px-2 py-2 text-sm hover:bg-gray-100"
                          >
                            Buscar incidencias
                          </Link>
                        </Menu.Item>
                        <Menu.Item>
                          <Link
                            to="/maintenance"
                            className="text-gray-900 group flex w-full items-center rounded-md px-2 py-2 text-sm hover:bg-gray-100"
                          >
                            Mantenimientos
                          </Link>
                        </Menu.Item>
                        <Menu.Item>
                          <Link
                            to="/routes"
                            className="text-gray-900 group flex w-full items-center rounded-md px-2 py-2 text-sm hover:bg-gray-100"
                          >
                            Rutas
                          </Link>
                        </Menu.Item>
                        <Menu.Item>
                          <button
                            type="button"
                            onClick={openModal}
                            className="text-gray-900 group flex w-full items-center rounded-md px-2 py-2 text-sm hover:bg-gray-100"
                          >
                            Emails
                          </button>
                        </Menu.Item>
                      </div>
                    </Menu.Items>
                  </Transition>
                </Menu>
              </Popover.Group>
              <a
                href="#"
                className="ml-8 inline-flex items-center justify-center whitespace-nowrap border-transparent text-base font-medium text-black"
              >
                <Popover className="flex">
                  <Popover.Button className="inline-flex items-center justify-center rounded-md text-gray-400 hover:text-gray-500 focus:outline-none focus:ring-inse mt-0 pt-0">
                    <span className="sr-only">Open menu</span>
                    <UserCircleIcon className="h-10 w-10" aria-hidden="true" />
                  </Popover.Button>
                  <Transition
                    as={Fragment}
                    enter="transition ease-out duration-200"
                    enterFrom="opacity-0 translate-y-1"
                    enterTo="opacity-100 translate-y-0"
                    leave="transition ease-in duration-150"
                    leaveFrom="opacity-100 translate-y-0"
                    leaveTo="opacity-0 translate-y-1"
                  >
                    <Popover.Panel
                      focus
                      className="absolute z-10 right-4 top-16 w-56 origin-top-right bg-gray-50 divide-y divide-gray-100 rounded-xl shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none"
                    >
                      <div className="px-4 py-3 hover:bg-gray-200 rounded-tl-xl rounded-tr-xl">
                        <p className="flex gap-2 items-center text-base font-medium text-gray-700">
                          <UserIcon className="w-6 h-6" /> Mi cuenta
                        </p>
                        <p className="text-sm text-gray-700 truncate"></p>
                      </div>
                      <div
                        onClick={() => {
                          localStorage.removeItem("user");
                          window.location.href = "/login";
                        }}
                        className="px-4 py-3 hover:bg-gray-200 rounded-bl-xl rounded-br-xl"
                      >
                        <p className="flex gap-2 items-center text-base font-medium text-gray-700">
                          <LogoutIcon className="w-6 h-6" /> Cerrar sesión
                        </p>
                        <p className="text-sm text-gray-700 truncate"></p>
                      </div>
                    </Popover.Panel>
                  </Transition>
                </Popover>
              </a>
            </div>
          </div>
        </div>

        <Transition
          as={Fragment}
          enter="duration-200 ease-out"
          enterFrom="opacity-0 scale-95"
          enterTo="opacity-100 scale-100"
          leave="duration-100 ease-in"
          leaveFrom="opacity-100 scale-100"
          leaveTo="opacity-0 scale-95"
        >
          <Popover.Panel
            focus
            className="absolute inset-x-0 top-0 origin-top-right transform p-2 transition md:hidden"
          >
            <div className="divide-y-2 divide-gray-50 rounded-lg bg-white shadow-lg ring-1 ring-black ring-opacity-5">
              <div className="px-5 pt-5 pb-6">
                <div className="flex items-center justify-between">
                  <div>
                    <img
                      className="h-8 w-auto"
                      src="/images/logo-solgas.png"
                      alt="logo-solgas-in-header"
                    />
                  </div>
                  <div className="-mr-2">
                    <Popover.Button className="inline-flex items-center justify-center rounded-md bg-white p-2 text-gray-400 hover:bg-gray-100 hover:text-gray-500 focus:outline-none focus:ring-inset">
                      <span className="sr-only">Close menu</span>
                      <XIcon className="h-6 w-6" aria-hidden="true" />
                    </Popover.Button>
                  </div>
                </div>
                <div className="mt-6">
                  <nav className="grid gap-y-8">
                    {solutions.map((item) => (
                      <a
                        key={item.name}
                        href={item.href}
                        className="-m-3 flex items-center rounded-md p-3 hover:bg-gray-50"
                      >
                        <item.icon
                          className="h-6 w-6 flex-shrink-0 text-indigo-600"
                          aria-hidden="true"
                        />
                        <span className="ml-3 text-base font-medium text-gray-900">
                          {item.name}
                        </span>
                      </a>
                    ))}
                  </nav>
                </div>
              </div>
              <div className="space-y-6 pb-6 px-5">
                <div>
                  <a
                    href="#"
                    className="flex w-full items-center justify-center rounded-md border border-transparent bg-solgas-primary px-4 py-2 text-base font-medium text-white shadow-sm hover:bg-indigo-700"
                  >
                    Cerrar sesión
                  </a>
                </div>
              </div>
            </div>
          </Popover.Panel>
        </Transition>
      </Popover>
      <Outlet />
      <Toaster position="top-center" reverseOrder={false} />
    </main>
  );
};

export default Layout;
